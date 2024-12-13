// ! Client component

// useState only works in a client component, so add the following to mark all as a client component (otherwise error shows):
"use client"

import { useState } from "react";

export default function SearchBar() {
  // useState to keep track of input data
  const [search, setSearch] = useState()
  return (
    <>
      <p>{search}</p>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </>
  );
}