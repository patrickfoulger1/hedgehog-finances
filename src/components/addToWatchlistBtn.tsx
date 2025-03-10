"use client";
import { Button } from "@/components/ui/button";
import { useEdgeStore } from "@/lib/edgestore";
import {
  checkUserWatchlist,
  revalidateDashboard,
  updateWatchlist,
} from "@/serverActions";
import { useEffect, useState } from "react";

export default function AddToWatchlistBtn({
  userId,
  stockSymbol,
  isSymbolOnWatchlist,
}) {
  const [buttonState, setButtonState] = useState(isSymbolOnWatchlist);

  const handleClick = async () => {
    try {
      await updateWatchlist(userId, stockSymbol, buttonState);
      console.log(`watchlist updated`);
      setButtonState((prev) => !prev);
      revalidateDashboard();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      className={!buttonState ? `` : `logoutButton`}
      onClick={handleClick}
      size="sm"
    >
      {!buttonState ? `Add to Watchlist` : `Remove`}
    </Button>
  );
}
