"use client"
import { Button } from "@/components/ui/button";
import { useEdgeStore } from "@/lib/edgestore";
import { checkUserWatchlist, updateWatchlist } from "@/serverActions";
import { useEffect, useState } from "react";

export default function AddToWatchlistBtn({ userId, stockSymbol, isSymbolOnWatchlist }) {
  const [buttonState, setButtonState] = useState(isSymbolOnWatchlist)

  const handleClick = async () => {
    try {
      //  if buttonState true click should remove stock from watchlist
      //  if buttonState false click should add stock from watchlist


      await updateWatchlist(userId, stockSymbol, buttonState)
      console.log(`watchlist updated`);
      setButtonState(prev => !prev)

    } catch (error) {
      console.log(error);

    }
  }

  return (<Button className={!buttonState ? `` : `logoutButton`} onClick={handleClick}>
    {!buttonState ? `Add to Wachlist` : `Remove from watchlist`}
  </Button>)

}