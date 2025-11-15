import Link from "next/link";
import Image from "next/image";
import SearchBar from "./searchbar/searchbar";
export default function Navbar() {
  return (
    <header className="bg-base-bg/90 backdrop-blur border-b border-base-white/10">
      <nav className="md:px-12 px-2.5 md:py-8 py-2.5 lg:h-40 transition-all border-b flex">
        <div className="container mx-auto">
          <div className="flex items-center">
            <Link href="/" className="mr-auto">
              <Image className="object-contain" src="/logo/logo.png" alt="SSSSKomik Logo" width={150} height={51} />
            </Link>
            <SearchBar />
          </div>
        </div>
      </nav>
    </header>
  );
}
