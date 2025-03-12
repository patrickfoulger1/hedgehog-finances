import Header from "../../components/header";
import Main from "./main";
import { User } from "@prisma/client";
import getSessionUser from "@/utils/getSessionUser";

export default async function AccountPage() {
  const user = (await getSessionUser()) as User;

  return (
    <>
      <Header user={user} />
      <Main user={user} />
    </>
  );
}
