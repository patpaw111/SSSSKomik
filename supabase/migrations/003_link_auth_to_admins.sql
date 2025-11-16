-- ============================================
-- Link Supabase Auth dengan Tabel Admins
-- ============================================

-- Update tabel admins untuk allow NULL password_hash (karena pakai Supabase Auth)
ALTER TABLE admins ALTER COLUMN password_hash DROP NOT NULL;

-- Function untuk sync user dari auth.users ke tabel admins
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert ke tabel admins ketika user dibuat di auth.users
  INSERT INTO public.admins (
    id,
    email,
    username,
    password_hash, -- NULL karena pakai Supabase Auth
    role,
    is_active
  )
  VALUES (
    NEW.id, -- UUID dari auth.users
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)), -- Username dari metadata atau dari email
    NULL, -- Password hash tidak digunakan karena pakai Supabase Auth
    COALESCE(NEW.raw_user_meta_data->>'role', 'admin')::varchar, -- Role dari metadata, default 'admin'
    COALESCE((NEW.raw_user_meta_data->>'is_active')::boolean, true) -- is_active dari metadata, default true
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    username = COALESCE(EXCLUDED.username, admins.username),
    updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger untuk auto-insert ke admins ketika user dibuat di auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_admin_user();

-- Function untuk update admin ketika user di-update di auth.users
CREATE OR REPLACE FUNCTION public.handle_admin_user_update()
RETURNS TRIGGER AS $$
BEGIN
  -- Update tabel admins ketika user di-update di auth.users
  UPDATE public.admins
  SET
    email = NEW.email,
    username = COALESCE(NEW.raw_user_meta_data->>'username', admins.username),
    role = COALESCE(NEW.raw_user_meta_data->>'role', admins.role)::varchar,
    is_active = COALESCE((NEW.raw_user_meta_data->>'is_active')::boolean, admins.is_active),
    updated_at = NOW()
  WHERE id = NEW.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger untuk update admins ketika user di-update di auth.users
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_admin_user_update();

-- Function untuk sync user yang sudah ada (untuk user yang sudah dibuat sebelum trigger)
CREATE OR REPLACE FUNCTION public.sync_existing_auth_users()
RETURNS void AS $$
DECLARE
  auth_user RECORD;
BEGIN
  -- Loop semua user di auth.users dan insert ke admins jika belum ada
  FOR auth_user IN
    SELECT id, email, raw_user_meta_data
    FROM auth.users
  LOOP
    INSERT INTO public.admins (
      id,
      email,
      username,
      password_hash,
      role,
      is_active
    )
    VALUES (
      auth_user.id,
      auth_user.email,
      COALESCE(auth_user.raw_user_meta_data->>'username', split_part(auth_user.email, '@', 1)),
      NULL, -- NULL karena pakai Supabase Auth
      COALESCE(auth_user.raw_user_meta_data->>'role', 'admin')::varchar,
      COALESCE((auth_user.raw_user_meta_data->>'is_active')::boolean, true)
    )
    ON CONFLICT (id) DO UPDATE
    SET
      email = EXCLUDED.email,
      username = COALESCE(EXCLUDED.username, admins.username),
      role = COALESCE(EXCLUDED.role, admins.role),
      is_active = COALESCE(EXCLUDED.is_active, admins.is_active),
      updated_at = NOW();
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Jalankan sync untuk user yang sudah ada
SELECT public.sync_existing_auth_users();

