"use client";
import { Button } from "@/components/ui/button";
import { useEdgeStore } from "@/lib/edgestore";
import {
  checkUserWatchlist,
  revalidateDashboard,
  updateContactPrefs,
  updateWatchlist,
} from "@/serverActions";
import { useEffect, useState } from "react";

export default function AddToWatchlistBtn({
  userId,
  stockSymbol,
  isSymbolOnWatchlist,
}) {
  const [buttonState, setButtonState] = useState(isSymbolOnWatchlist);
  const [isAddingToWatchlist, setIsAddingToWatchlist] = useState(false)

  const handleClick = async () => {
    setIsAddingToWatchlist(true)
    try {
      await updateWatchlist(userId, stockSymbol, buttonState);
      setIsAddingToWatchlist(false)
      setButtonState((prev) => !prev);
      revalidateDashboard();
    } catch (error) {
      setIsAddingToWatchlist(false)
    }
  };
  return (
    <Button
      className={!buttonState ? `mb-1 sm:mb-0` : `mb-1 sm:mb-0 logoutButton`}
      onClick={handleClick}
      size="sm"
      disabled={isAddingToWatchlist}
    >

      {buttonState ? "Remove from Watchlist" : isAddingToWatchlist ? "Please wait..." : "Add to Watchlist"}
    </Button>
  );
}





