
import Link from "next/link"
export default function MobileMenu() {
    return (
        <div className="dropdown">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/stocks">All stocks</Link>
            <Link href="/notifications">Notifications</Link>
        </div>
    )
}