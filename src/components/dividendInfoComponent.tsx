import { DividendInformation } from "@/lib/types";

export default function DividendInfoComponent({
  dividendinfo,
}: {
  dividendinfo: Array<DividendInformation>;
}) {
  if (dividendinfo?.length > 0) {
    return (
      <div className="border rounded-2xl shadow-lg  px-6 pb-7 w-fit mx-auto my-4 text-center">
        <h2>
          <b>{dividendinfo[0]?.symbol}</b>
        </h2>
        <div className="flex flex-col sm:flex-row">
          Next dividend payment:{" "}
          <span className="text-blue-700 ml-2 dark:text-blue-200">{dividendinfo[0]?.date}</span>
        </div>
        <div className="flex flex-col sm:flex-row">
          Amount per share:{" "}
          <span className="text-blue-700 ml-2 dark:text-blue-200">
            {String(dividendinfo[0]?.dividend)}${" "}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row">
          Dividend frequency:{" "}
          <span className="text-blue-700 ml-2 dark:text-blue-200">{dividendinfo[0]?.frequency}</span>
        </div>
        <div className="flex flex-col sm:flex-row">
          You must hold shares before:{" "}
          <span className="text-blue-700 ml-2 dark:text-blue-200">{dividendinfo[0]?.recordDate}</span>
        </div>
      </div>
    );
  } else {
    return (
      null
    );
  }
}
