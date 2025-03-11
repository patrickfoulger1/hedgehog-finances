"use client";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { updateContactPrefs, getUserContactPrefs } from "@/serverActions";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import Loader from "@/components/loader";

function PreferenceTable({ user, prefObject }) {
    const [contactPrefsObject, setContactPrefsObject] = useState([]);
    const [switches, setSwitches] = useState(null);

    const handleSwitchChange = async (checked, id) => {
        setSwitches((prev) => ({
            ...prev,
            [id]: checked,
        }));
        const checkSplit = id.split("-");
        updateContactPrefs(user.id, checkSplit[0], checkSplit[1], checked);
    };

    useEffect(() => {
        getUserContactPrefs(user.id).then((prefs) => {
            setContactPrefsObject(prefs);
        });
    }, []);

    useEffect(() => {
        setSwitches(prefObject.value);
    }, [contactPrefsObject]);

    return contactPrefsObject.length > 0 ? (
        <div className="flex justify-center">
            <p>{JSON.stringify(switches)}</p>
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
                                            checked={switches[pref.stockSymbol]}
                                            onCheckedChange={(checked) => handleSwitchChange(checked, `${pref.stockSymbol}-push`)}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id={`${pref.stockSymbol}-email`}
                                            checked={switches[pref.stockSymbol]}
                                            onCheckedChange={(checked) => handleSwitchChange(checked, `${pref.stockSymbol}-email`)}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id={`${pref.stockSymbol}-inApp`}
                                            checked={switches[pref.stockSymbol]}
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
