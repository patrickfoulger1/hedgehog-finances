"use client";

import { Inbox, Bell, Preferences, Notifications } from "@novu/react";

import { useRouter } from "next/navigation";

export function NovuInbox() {
    const router = useRouter();
    const tabs = [
        // dummy for now
        {
            label: "All Notifications",
            filter: { tags: [] },
        },
        {
            label: "AAPL",
            filter: { tags: ["AAPL"] },
        },
        {
            label: "ORCL",
            filter: { tags: ["ORCL"] },
        },
    ];

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
            },
        },
    };

    return (
        <div className="bg-gray-300 rounded-lg w-full m-5 p-5">
            <Inbox
                applicationIdentifier={`${process.env.NOVU_APP_ID}`}
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
}
