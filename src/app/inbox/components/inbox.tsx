"use client";
import { Inbox, Notifications } from "@novu/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { User, Watchlist } from "@prisma/client";

export function NovuInbox({ user, watchlist }: { user: User; watchlist: Watchlist[] }) {
    const router = useRouter();
    let tabs: { label: string; filter: { tags: string[] } }[] = [];

    tabs = [
        {
            label: "All Notifications",
            filter: { tags: [] },
        },
    ];

    watchlist.forEach((symbol: Watchlist) => {
        tabs.push({
            label: symbol.stockSymbol,
            filter: { tags: [symbol.stockSymbol] },
        });
    });

    if ("locks" in navigator) {
        return (
            <Inbox
                applicationIdentifier={"" + process.env.NEXT_PUBLIC_NOVU_APP_ID}
                subscriberId={user.id}
                routerPush={(path: string) => router.push(path)}
                tabs={tabs}
                preferencesFilter={{ tags: [] }}
                appearance={{
                    variables: {
                        colorBackground: "#ebebeb",
                        colorForeground: "#1a181f",
                        colorPrimary: "#0b71ca",
                        colorPrimaryForeground: "#ffffff",
                        colorSecondary: "#F3F3F3",
                        colorSecondaryForeground: "#1A1523",
                        colorCounter: "#E5484D",
                        colorCounterForeground: "white",
                        colorNeutral: "black",
                        fontSize: "inherit",
                        borderRadius: "0.375rem",
                    },
                    elements: {
                        inboxContent: {
                            backgroundColor: "#ccc",
                            borderRadius: "0.375rem",
                            margin: "3px",
                        },
                        preferencesContainer: {
                            backgroundColor: "#fff",
                            borderRadius: "0.375rem",
                            margin: "5px",
                        },
                    },
                }}>
                <Notifications />
            </Inbox>
        );
    } else {
        console.log("Weblocks API not supported in this broswer");
    }
}
