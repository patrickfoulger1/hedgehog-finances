"use client";
import Link from "next/link";
import MobileMenu from "./mobileMenu";
import SearchBar from "./searchbar";
import { useState } from "react";
import { Session } from "next-auth";
import { User } from "@prisma/client";

export default function Header({ user }: { user: User }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header>
      <button
        className="menu-controller"
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
          />
        </svg>
        {isMenuOpen ? <MobileMenu /> : null}
      </button>
      <nav>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/inbox">Inbox</Link>
      </nav>
      <div className="search-account-area">
        <SearchBar />
        <Link href="account" className="account">
          <img src={user.image ? user.image : "media/profile-image.png"} />
          <div className="fullname">{user.username}</div>
        </Link>
      </div>
    </header>
  );
}
