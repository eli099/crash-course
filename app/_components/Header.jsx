import Link from "next/link";
import SearchBar from "./SearchBar";

// ! This is a server side component

export default function Header() {
  return (
    <header>
      <h3>Header</h3>
      <Link href="/">Homepage</Link>
      <Link href="/blog">Blog</Link>

      {/* Bring in SearchBar component (that is marked as a client component) */}
      {/* (Don't need anymore) */}
      {/* <SearchBar /> */} 
    </header>
  );
}