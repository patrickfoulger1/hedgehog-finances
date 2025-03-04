"use client";
import { Inbox, Bell, Preferences, Notifications } from "@novu/react";
import { WatchlistStock } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { firebaseConfig } from "../../../lib/firebase.config";
import { setCreds } from "./setCreds";

const app = initializeApp(firebaseConfig);

export function NovuInbox({ watchlist }: { watchlist: any }) {
    const router = useRouter();

    const tabs = [
        {
            label: "All Notifications",
            filter: { tags: [] },
        },
    ];

    useEffect(() => {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                getToken(getMessaging(), { vapidKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC }).then((tokenId) => {
                    setCreds(tokenId, "4a06f9ce-94f1-4b9d-b60f-c8b22d2810c9");
                });
            }
        });

        watchlist.forEach((symbol: WatchlistStock) => {
            tabs.push({ label: symbol.stockSymbol, filter: { tags: [symbol.stockSymbol: string] } });
        });
    }, []);

    const appearance = {
        elements: {
            bellIcon: {
                padding: "1rem",
                backgroundColor: "white",
                borderRadius: "50%",
            },
            notification: {
                backgroundColor: "white",
                borderRadius: "0.5rem",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            },
            preferencesContainer: {
                borderRadius: "0.5rem",
                margin: "10px",
            },
        },
    };
    if ("locks" in navigator) {
        return (
            <div className="bg-gray-300 rounded-lg w-full">
                <Inbox
                    applicationIdentifier={"" + process.env.NEXT_PUBLIC_NOVU_APP_ID}
                    subscriberId="4a06f9ce-94f1-4b9d-b60f-c8b22d2810c9" // needs to come from the user session
                    routerPush={(path: string) => router.push(path)}
                    tabs={tabs}
                    appearance={appearance}>
                    <Bell
                        renderBell={(unreadCount) => {
                            if (unreadCount > 0) {
                                return (
                                    <div className="flex justify-center align-center h-6 aspect-square rounded-full bg-red-500 p-1 text-white">
                                        <span className="relative -top-1">{unreadCount}</span>
                                    </div>
                                );
                            } else {
                                return null;
                            }
                        }}
                    />
                    <Notifications />
                    <Preferences />
                </Inbox>
            </div>
        );
    } else {
        console.log("Weblocks API not supported in this broswer");
    }
}
