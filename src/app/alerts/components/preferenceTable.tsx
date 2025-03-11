"use client";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { updateContactPrefs, getUserContactPrefs } from "@/serverActions";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import Loader from "@/components/loader";

function PreferenceTable({ user, prefObject }) {
    const [contactPrefsObject, setContactPrefsObject] = useState([]);
    const handleSwitchChange = async (checked, id) => {
        const checkSplit = id.split("-");
        updateContactPrefs(user.id, checkSplit[0], checkSplit[1], checked);
        setContactPrefsObject((prevPrefs) =>
            prevPrefs.map((pref) =>
                pref.stockSymbol === checkSplit[0]
                    ? { ...pref, [checkSplit[1]]: checked }
                    : pref
            )
        );
    };
    useEffect(() => {
        getUserContactPrefs(user.id).then((prefs) => {
            setContactPrefsObject(prefs);
        });
    }, []);
    return contactPrefsObject.length > 0 ? (
        <div className="flex justify-center">
            <div className="flex flex-col w-full justify-center max-w-[700px] gap-3">
                <h2>Notification Preferences</h2>
                <p>Set which notifcations you would like to receieve on the items you want to get the updates on.</p>
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
                                        <Switch
                                            id={`${pref.stockSymbol}-push`}
                                            checked={pref.push}
                                            onCheckedChange={(checked) => handleSwitchChange(checked, `${pref.stockSymbol}-push`)}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id={`${pref.stockSymbol}-email`}
                                            checked={pref.email}
                                            onCheckedChange={(checked) => handleSwitchChange(checked, `${pref.stockSymbol}-email`)}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id={`${pref.stockSymbol}-inApp`}
                                            checked={pref.inApp}
                                            onCheckedChange={(checked) => handleSwitchChange(checked, `${pref.stockSymbol}-inApp`)}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter></TableFooter>
                </Table>
            </div>
        </div>
    ) : (
        <Loader />
    );
}

export default PreferenceTable;
