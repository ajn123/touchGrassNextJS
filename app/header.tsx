import Link from "next/link";

export default function Header() {
    return (
        <div className="sticky bg-white rounded-b-lg">
            <Link href="/">
                <h1 className="text-2xl hover:scale-x-95 transition-all duration-300 font-bold ml-4 py-4 text-black">Events DC</h1>
            </Link>
        </div>
    );
}