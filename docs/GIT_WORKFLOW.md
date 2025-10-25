# 🌿 Git Workflow & Branching Strategy

## 📋 Overview
Dokumentasi ini menjelaskan workflow Git yang digunakan dalam proyek SSSS Komik untuk memastikan kolaborasi tim yang efisien dan kode yang terorganisir dengan baik.

## 🌳 Branching Strategy

### Branch Types

#### 1. `main` (Production Branch)
- **Purpose**: Branch utama yang berisi kode production-ready
- **Protection**: Dilindungi, tidak bisa push langsung
- **Access**: Hanya merge dari `develop` atau hotfix branches
- **Deployment**: Otomatis deploy ke production

#### 2. `develop` (Development Branch)
- **Purpose**: Branch utama untuk development
- **Protection**: Dilindungi, hanya merge dari feature branches
- **Access**: Semua developer bisa merge ke sini
- **Integration**: Tempat semua fitur diintegrasikan

#### 3. `feature/*` (Feature Branches)
- **Naming**: `feature/descriptive-name` (e.g., `feature/user-authentication`)
- **Purpose**: Development fitur baru
- **Source**: Dibuat dari `develop`
- **Target**: Merge kembali ke `develop`

#### 4. `bugfix/*` (Bug Fix Branches)
- **Naming**: `bugfix/issue-description` (e.g., `bugfix/login-validation-error`)
- **Purpose**: Perbaikan bug yang ditemukan di development
- **Source**: Dibuat dari `develop`
- **Target**: Merge kembali ke `develop`

#### 5. `hotfix/*` (Hotfix Branches)
- **Naming**: `hotfix/critical-issue` (e.g., `hotfix/security-vulnerability`)
- **Purpose**: Perbaikan urgent untuk production
- **Source**: Dibuat dari `main`
- **Target**: Merge ke `main` dan `develop`

#### 6. `release/*` (Release Branches)
- **Naming**: `release/version-number` (e.g., `release/v1.2.0`)
- **Purpose**: Persiapan release baru
- **Source**: Dibuat dari `develop`
- **Target**: Merge ke `main` dan `develop`

## 🔄 Git Workflow Process

### 1. Starting New Work

```bash
# 1. Update local develop branch
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/user-profile-page

# 3. Start development
# ... make changes ...
```

### 2. During Development

```bash
# Regular commits dengan conventional commits
git add .
git commit -m "feat: add user profile form component"

# Push feature branch
git push origin feature/user-profile-page
```

### 3. Completing Feature

```bash
# 1. Update feature branch dengan latest develop
git checkout develop
git pull origin develop
git checkout feature/user-profile-page
git merge develop

# 2. Resolve conflicts jika ada
# ... resolve conflicts ...

# 3. Push updated branch
git push origin feature/user-profile-page

# 4. Create Pull Request ke develop
```

## 📝 Commit Message Standards

### Conventional Commits Format
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Commit Types
- **feat**: Fitur baru
- **fix**: Perbaikan bug
- **docs**: Perubahan dokumentasi
- **style**: Formatting, missing semicolons, etc.
- **refactor**: Code refactoring
- **test**: Menambah atau memperbaiki tests
- **chore**: Maintenance tasks, dependencies

### Examples

```bash
# ✅ Good commit messages
git commit -m "feat(auth): add login form validation"
git commit -m "fix(api): resolve user data fetching error"
git commit -m "docs: update API documentation"
git commit -m "refactor(components): extract reusable button component"
git commit -m "test(auth): add unit tests for login flow"

# ❌ Bad commit messages
git commit -m "fix bug"
git commit -m "update"
git commit -m "changes"
git commit -m "WIP"
```

### Scope Guidelines
- Gunakan scope yang relevan dengan perubahan
- Scope umum: `auth`, `ui`, `api`, `db`, `config`
- Scope spesifik: `login`, `dashboard`, `profile`

## 🔀 Pull Request Process

### 1. Creating Pull Request

#### PR Title Format
```
<type>: <descriptive title>
```

Examples:
- `feat: add user authentication system`
- `fix: resolve responsive layout issues`
- `refactor: optimize database queries`

#### PR Description Template
```markdown
## 📋 Description
Brief description of changes

## 🎯 Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## 🧪 Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## 📸 Screenshots (if applicable)
[Add screenshots here]

## ✅ Checklist
- [ ] Code follows project standards
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console.log statements
- [ ] Responsive design tested
```

### 2. Review Process

#### For Reviewers
- Review dalam 24 jam jika memungkinkan
- Fokus pada:
  - Code quality dan standards
  - Logic correctness
  - Performance implications
  - Security considerations
  - Test coverage

#### Review Comments
- Gunakan constructive feedback
- Jelaskan "why" bukan hanya "what"
- Sediakan suggestions untuk improvement

```markdown
# ✅ Good review comment
The user validation logic looks good, but consider adding rate limiting 
to prevent brute force attacks. Here's an example implementation:

```typescript
// Suggested implementation
```

# ❌ Bad review comment
This is wrong.
```

### 3. Merge Process

#### Merge Requirements
- [ ] Minimum 1 approval dari team member
- [ ] All CI/CD checks passing
- [ ] No merge conflicts
- [ ] Up-to-date dengan target branch

#### Merge Methods
- **Squash and Merge**: Untuk feature branches (recommended)
- **Rebase and Merge**: Untuk bugfix branches
- **Merge Commit**: Untuk release branches

## 🚨 Emergency Procedures

### Hotfix Process
```bash
# 1. Create hotfix branch dari main
git checkout main
git pull origin main
git checkout -b hotfix/critical-security-fix

# 2. Make urgent changes
# ... fix critical issue ...

# 3. Commit dengan conventional commits
git commit -m "fix(security): patch authentication vulnerability"

# 4. Push dan create PR ke main
git push origin hotfix/critical-security-fix

# 5. After merge to main, merge back to develop
git checkout develop
git merge main
git push origin develop
```

### Rollback Process
```bash
# 1. Identify commit hash to rollback to
git log --oneline

# 2. Create rollback branch
git checkout -b hotfix/rollback-to-stable

# 3. Revert problematic commits
git revert <commit-hash>

# 4. Push dan merge ke main
git push origin hotfix/rollback-to-stable
```

## 🔧 Git Configuration

### Required Git Settings
```bash
# Set user information
git config --global user.name "Your Name"
git config --global user.email "your.email@company.com"

# Set default branch name
git config --global init.defaultBranch main

# Set pull strategy
git config --global pull.rebase false

# Set push strategy
git config --global push.default simple
```

### Recommended Git Aliases
```bash
# Add to ~/.gitconfig
[alias]
    st = status
    co = checkout
    br = branch
    ci = commit
    unstage = reset HEAD --
    last = log -1 HEAD
    visual = !gitk
    lg = log --oneline --graph --decorate --all
```

## 📊 Branch Protection Rules

### Main Branch Protection
- Require pull request reviews (minimum 1)
- Require status checks to pass
- Require branches to be up to date
- Restrict pushes to main branch
- Require linear history

### Develop Branch Protection
- Require pull request reviews (minimum 1)
- Require status checks to pass
- Allow force pushes (for emergency fixes)

## 🚀 CI/CD Integration

### Automated Checks
- ESLint validation
- TypeScript compilation
- Unit tests execution
- Build verification
- Security scanning

### Deployment Pipeline
1. **Feature Branch**: Run tests and linting
2. **Develop Branch**: Run full test suite + staging deployment
3. **Main Branch**: Run full test suite + production deployment

## 📚 Best Practices

### Do's ✅
- Keep branches small dan focused
- Commit frequently dengan meaningful messages
- Update feature branches regularly dengan develop
- Use descriptive branch names
- Clean up merged branches
- Use conventional commits
- Write good PR descriptions

### Don'ts ❌
- Don't commit directly to main atau develop
- Don't use generic commit messages
- Don't leave branches unmerged for too long
- Don't force push to shared branches
- Don't merge without proper review
- Don't ignore CI/CD failures

## 🔍 Troubleshooting

### Common Issues

#### Merge Conflicts
```bash
# 1. Update local branch
git checkout develop
git pull origin develop

# 2. Merge develop into feature branch
git checkout feature/your-branch
git merge develop

# 3. Resolve conflicts manually
# ... edit conflicted files ...

# 4. Add resolved files
git add .

# 5. Complete merge
git commit -m "resolve merge conflicts"
```

#### Accidentally Committed to Wrong Branch
```bash
# 1. Create new branch from current state
git checkout -b feature/correct-branch-name

# 2. Reset original branch
git checkout original-branch
git reset --hard HEAD~1

# 3. Switch to correct branch
git checkout feature/correct-branch-name
```

#### Lost Commits
```bash
# 1. Find lost commits
git reflog

# 2. Recover specific commit
git checkout <commit-hash>

# 3. Create new branch from recovered state
git checkout -b feature/recovered-work
```
