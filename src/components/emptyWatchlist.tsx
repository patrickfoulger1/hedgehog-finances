"use client";
import SearchBar from "./searchbar";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export function EmptyWatchlist() {
  return (
    <>
      <div className="w-4/5">
        <Alert>
          <AlertTitle>You don't have any stocks on your watchlist</AlertTitle>
          <AlertDescription>
            <p>
              To receive alerts for the stocks you're interested in, you should
              add them to your watch list, and then you can update when and how
              we notify you about any changes.
            </p>
          </AlertDescription>
        </Alert>
        <div className="flex flex-col gap-3 items-center bg-white/10 p-5 rounded-lg">
          <div className="flex items-center gap-5 font-bold content-evenly">
            <h3>Search for your first stock below</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="#d80e0e"
              viewBox="0 0 256 256"
            >
              <path d="M224,160l-48,48-48-48Z" opacity="0.2"></path>
              <path d="M231.39,156.94A8,8,0,0,0,224,152H184V64a8,8,0,0,0-8-8H32a8,8,0,0,0,0,16H168v80H128a8,8,0,0,0-5.66,13.66l48,48a8,8,0,0,0,11.32,0l48-48A8,8,0,0,0,231.39,156.94ZM176,196.69,147.31,168h57.38Z"></path>
            </svg>
          </div>

          <SearchBar />
        </div>
      </div>
    </>
  );
}
