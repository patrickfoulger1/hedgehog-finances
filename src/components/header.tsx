"use client";
import Link from "next/link";
import MobileMenu from "./mobileMenu";
import SearchBar from "./searchbar";
import { appendSubscriberToken } from "@/serverActions";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { firebaseConfig } from "@/lib/firebase.config";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect, useMemo } from "react";
import { User } from "@/lib/types";
import { signOut } from "next-auth/react";
import { unreadCount } from "@/serverActions";
import { Toaster } from "@/components/ui/sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

export default function Header({ user }: { user: User }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("");
  const [unreadItems, setUnreadItems] = useState(0);
  const [canNotify, setCanNotify] = useState(false);
  const [permissionState, setPermissionState] = useState("default");

  // Only initialize Firebase app and messaging on the client side
  const app = useMemo(() => {
    if (typeof window !== "undefined") {
      return initializeApp(firebaseConfig);
    }
    return null;
  }, []);

  const messaging = useMemo(() => {
    if (app && typeof window !== "undefined") {
      try {
        return getMessaging(app);
      } catch (error) {
        console.error("Error initializing messaging:", error);
        return null;
      }
    }
    return null;
  }, [app]);

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signOut();
  };

  const requestPermission = () => {
    if (typeof window === "undefined" || !messaging) return;

    Notification.requestPermission()
      .then((permission) => {
        if (permission === "granted") {
          setCanNotify(true);
          getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC!,
          })
            .then((currentToken) => {
              appendSubscriberToken(currentToken, user.id);
            })
            .catch((error) => {
              console.error("Error getting token:", error);
            });
        } else if (permission === "denied" || permission === "default") {
          setCanNotify(false);
          setPermissionState(permission);
        }
      })
      .catch((error) => {
        console.error("Error requesting permission:", error);
      });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    setCurrentPage(window.location.href);
    requestPermission();
    unreadCount(user.id).then((c) => {
      setUnreadItems(c);
    });

    // Service worker registration
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then(() => {
          // do nothing
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });

      // Add event listener for push messages
      const messageHandler = (event) => {
        if (event.data && event.data.type === "PUSH") {
          toast(event.data.payload.notification.title, {
            description: event.data.payload.notification.body,
            action: {
              label: "Go to inbox",
              onClick: () => (window.location.href = "/inbox"),
            },
          });
          unreadCount(user.id).then((c) => {
            setUnreadItems(c);
          });
        }
      };

      navigator.serviceWorker.addEventListener("message", messageHandler);

      // Clean up event listener when component unmounts
      return () => {
        navigator.serviceWorker.removeEventListener("message", messageHandler);
      };
    }
  }, [user.id]);

  const defaultProfilePicture = useMemo(
    () =>
      currentPage.includes("stocks")
        ? "../media/profile-image.png"
        : "media/profile-image.png",
    [currentPage]
  );

  return (
    <>
      <Toaster theme="system" />
      <header>
        <DropdownMenu>
          <DropdownMenuTrigger className="navDropDown h-15 w-15 cursor-pointer select-none">
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
          </DropdownMenuTrigger>
          <DropdownMenuContent className="headerDropdown">
            <DropdownMenuItem>
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/inbox">Inbox</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <nav className="flex">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/inbox" className="flex flex-nowrap gap-2">
            Inbox
            {unreadItems ? (
              <p className="bg-red-500 rounded-full aspect-square w-5 h-5 align-middle text-center text-sm">
                {unreadItems}
              </p>
            ) : null}
          </Link>
          {!canNotify ? (
            <span className="" onClick={requestPermission}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <svg
                      className=""
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="#827d7d"
                      viewBox="0 0 256 256"
                    >
                      <path
                        d="M208,192H48a8,8,0,0,1-6.88-12C47.71,168.6,56,139.81,56,104a72,72,0,0,1,144,0c0,35.82,8.3,64.6,14.9,76A8,8,0,0,1,208,192Z"
                        opacity="0.2"
                      ></path>
                      <path d="M53.92,34.62A8,8,0,1,0,42.08,45.38L58.82,63.8A79.59,79.59,0,0,0,48,104c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H182.64l19.44,21.38a8,8,0,1,0,11.84-10.76ZM48,184c7.7-13.24,16-43.92,16-80a63.65,63.65,0,0,1,6.26-27.62L168.09,184Zm120,40a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,224Zm46-44.75a8.13,8.13,0,0,1-2.93.55,8,8,0,0,1-7.44-5.08C196.35,156.19,192,129.75,192,104A64,64,0,0,0,96.43,48.31a8,8,0,0,1-7.9-13.91A80,80,0,0,1,208,104c0,35.35,8.05,58.59,10.52,64.88A8,8,0,0,1,214,179.25Z"></path>
                    </svg>
                  </TooltipTrigger>
                  {permissionState === "default" ? (
                    <TooltipContent>
                      <p>Click to enable notifications in the browser</p>
                    </TooltipContent>
                  ) : (
                    <TooltipContent className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="#d80e0e"
                        viewBox="0 0 256 256"
                      >
                        <path
                          d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z"
                          opacity="0.2"
                        ></path>
                        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z"></path>
                      </svg>
                      <p className="text-red-500">
                        Browser Notifications have been blocked
                      </p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </span>
          ) : null}
        </nav>
        <div className="search-account-area pe-2 gap-4">
          <SearchBar />
          <DropdownMenu>
            <DropdownMenuTrigger className="h-15 w-15 cursor-pointer select-none">
              <img
                src={user.image ? user.image : defaultProfilePicture}
                alt="profile picture"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="headerDropdown">
              <DropdownMenuItem>
                <Link className="accountNav" href="/account">
                  My Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link className="accountNav" href="/alerts">
                  Stock Alerts
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex justify-center">
                <Button
                  className={"logoutButton"}
                  onClick={(e) => {
                    handleLogout(e);
                  }}
                >
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/account" className="account"></Link>
        </div>
      </header>
    </>
  );
}
