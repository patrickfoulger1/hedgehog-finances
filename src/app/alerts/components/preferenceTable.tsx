import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";

function PreferenceTable({ contactprefs }) {
    console.log(contactprefs);

    return (
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
                        {contactprefs.map((pref) => (
                            <TableRow key={pref.id}>
                                <TableCell className="font-medium">
                                    <p>{pref.stockSymbol}</p>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <Switch checked={pref.push} />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <Switch checked={pref.email} />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <Switch checked={pref.inApp} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter></TableFooter>
                </Table>
            </div>
        </div>
    );
}

export default PreferenceTable;
