import Header from "@/components/header";
import getSessionUser from "@/utils/getSessionUser";

export default async function StockPage({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const { symbol } = await params;
  const user = await getSessionUser();

  return (
    <>
      <Header user={user}></Header>
    </>
  );
}
