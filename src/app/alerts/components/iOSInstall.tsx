"use client";
import { useState, useEffect } from "react";
import { AppleIcon, Share, SquarePlus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function IosInstall() {
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream);

        setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
    }, []);

    return isIOS && !isStandalone ? (
        <Alert>
            <AppleIcon />
            <AlertTitle>iOS Users</AlertTitle>
            <AlertDescription>
                <p>
                    To receive notification on iOS, you must first install our application by using the share icon <Share className="inline-svg" /> and then tapping on Add to Home Screen{" "}
                    <SquarePlus className="inline-svg" />
                </p>
            </AlertDescription>
        </Alert>
    ) : null;
}
