import { DividendInformation } from "@/lib/types"

export default function DividendInfoComponent({ dividendinfo }: { dividendinfo: Array<DividendInformation> }) {

  if (dividendinfo.length > 0) {
    return (
      <div className="border rounded-2xl shadow-lg py-4 px-6 w-fit mx-auto text-center">
        <h2><b>{dividendinfo[0]?.symbol}</b> dividend information</h2>
        <div>Next dividend payment: <span className="text-blue-700">{dividendinfo[0]?.date}</span></div>
        {/* <div>Amount per share: <span className="text-blue-700">{dividendinfo[0]?.dividend}$ </span></div> */}
        <div>Dividend frequency: <span className="text-blue-700"></span>{dividendinfo[0]?.frequency}</div>
        <div>You must hold shares before: <span className="text-blue-700">{dividendinfo[0]?.recordDate}</span></div>
      </div>
    )
  } else {
    <div className="border rounded-2xl shadow-lg py-4 px-6 w-fit mx-auto text-center">
      This company does not currently pay out dividends.
    </div>
  }

}