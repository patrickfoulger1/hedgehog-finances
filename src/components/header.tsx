"use client";
import Link from "next/link";
import MobileMenu from "./mobileMenu";
import SearchBar from "./searchbar";
import { appendSubscriberToken, updateSubscriberToken } from "@/serverActions";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { firebaseConfig } from "@/lib/firebase.config";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState, useEffect, useMemo } from "react";
import { User } from "@/lib/types";
import { signOut } from "next-auth/react";
import { unreadCount } from "@/serverActions";

export default function Header({ user }: { user: User }) {
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState("");
    const [unreadItems, setUnreadItems] = useState(0);

    const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        signOut();
    };

    useEffect(() => {
        setCurrentPage(window.location.href);
        unreadCount(user.id).then((c) => {
            setUnreadItems(c);
        });
        getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC! }).then((currentToken) => {
            if (currentToken) {
                appendSubscriberToken(currentToken, user.id);
            } else {
                Notification.requestPermission().then((permission) => {
                    if (permission === "granted") {
                        updateSubscriberToken(currentToken, user.id);
                    }
                });
            }
        });
    }, []);

    const defaultProfilePicture = useMemo(() => (currentPage.includes("stocks") ? "../media/profile-image.png" : "media/profile-image.png"), [currentPage]);

    return (
        <header>
            <button
                className="menu-controller"
                onClick={() => {
                    setIsMenuOpen(!isMenuOpen);
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                    <path
                        fillRule="evenodd"
                        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                    />
                </svg>
                {isMenuOpen ? <MobileMenu /> : null}
            </button>
            <nav className="flex">
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/inbox" className="flex flex-nowrap gap-2">
                    Inbox
                    {unreadItems ? <p className="bg-red-500 rounded-full aspect-square w-5 h-5 align-middle text-center text-sm">{unreadItems}</p> : null}
                </Link>
            </nav>
            <div className="search-account-area pe-2 gap-4">
                <SearchBar />

                <DropdownMenu>
                    <DropdownMenuTrigger className="px-3 py-2 rounded-md border-1 border-white/30">
                        <div className="fullname">{user.username}</div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>
                            <Link href="/account">My Account</Link>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href="/alerts">Alerts</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Button
                                className={"logoutButton"}
                                onClick={(e) => {
                                    handleLogout(e);
                                }}>
                                Logout
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Link href="/account" className="account">
                    <img src={user.image ? user.image : defaultProfilePicture} alt="profile picture" />
                </Link>
            </div>
        </header>
    );
}
