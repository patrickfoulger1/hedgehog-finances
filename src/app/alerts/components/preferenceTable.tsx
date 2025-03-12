"use client";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { updateContactPrefs, getUserContactPrefs } from "@/serverActions";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Loader from "@/components/loader";
import SearchBar from "@/components/searchbar";

function PreferenceTable({ user, prefObject }) {
    const [contactPrefsObject, setContactPrefsObject] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const handleSwitchChange = async (checked, id) => {
        const checkSplit = id.split("-");
        updateContactPrefs(user.id, checkSplit[0], checkSplit[1], checked);
        setContactPrefsObject((prevPrefs) => prevPrefs.map((pref) => (pref.stockSymbol === checkSplit[0] ? { ...pref, [checkSplit[1]]: checked } : pref)));
    };
    useEffect(() => {
        getUserContactPrefs(user.id).then((prefs) => {
            setContactPrefsObject(prefs);
            setIsLoading(false);
        });
    }, []);
    return !isLoading ? (
        <div className="flex justify-center">
            <div className="flex flex-col w-full justify-center max-w-[700px] gap-3">
                <h2>Notification Preferences</h2>
                <p>Set which notifcations you would like to receieve on the items you want to get the updates on.</p>
                {contactPrefsObject.length > 0 ? (
                    <Table className="justify-self-center">
                        <TableCaption>Set your notification preferences.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Symbol</TableHead>
                                <TableHead>Push</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>In-App</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {contactPrefsObject.map((pref) => (
                                <TableRow key={pref.id}>
                                    <TableCell className="font-medium">
                                        <p>{pref.stockSymbol}</p>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <Switch id={`${pref.stockSymbol}-push`} checked={pref.push} onCheckedChange={(checked) => handleSwitchChange(checked, `${pref.stockSymbol}-push`)} />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <Switch id={`${pref.stockSymbol}-email`} checked={pref.email} onCheckedChange={(checked) => handleSwitchChange(checked, `${pref.stockSymbol}-email`)} />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <Switch id={`${pref.stockSymbol}-inApp`} checked={pref.inApp} onCheckedChange={(checked) => handleSwitchChange(checked, `${pref.stockSymbol}-inApp`)} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter></TableFooter>
                    </Table>
                ) : (
                    <>
                        <Alert>
                            <AlertTitle>You don't have any stocks on your watchlist</AlertTitle>
                            <AlertDescription>
                                <p>
                                    To receive alerts for the stocks you're interested in, you should add them to your watch list, and then you can update when and how we notify you about any changes.
                                </p>
                            </AlertDescription>
                        </Alert>
                        <div className="flex flex-col gap-3 items-center bg-white/10 p-5 rounded-lg">
                            <div className="flex items-center gap-5 font-bold content-evenly">
                                <h3>Search for your first stock below</h3>
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#d80e0e" viewBox="0 0 256 256">
                                    <path d="M224,160l-48,48-48-48Z" opacity="0.2"></path>
                                    <path d="M231.39,156.94A8,8,0,0,0,224,152H184V64a8,8,0,0,0-8-8H32a8,8,0,0,0,0,16H168v80H128a8,8,0,0,0-5.66,13.66l48,48a8,8,0,0,0,11.32,0l48-48A8,8,0,0,0,231.39,156.94ZM176,196.69,147.31,168h57.38Z"></path>
                                </svg>
                            </div>

                            <SearchBar />
                        </div>
                    </>
                )}
            </div>
        </div>
    ) : (
        <Loader />
    );
}

export default PreferenceTable;
