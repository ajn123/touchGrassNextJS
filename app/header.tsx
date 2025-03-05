import Link from "next/link";

export default function Header() {
    return (
        <div className="bg-white rounded-b-lg">
            <div className="flex flex-row">
                <Link href="/">
                    <h1 className="text-2xl hover:scale-x-95 transition-all duration-300 font-bold ml-4 py-4 text-black">Touch Grass DC</h1>
                </Link>
                <Link href="/signup">
                    <h1 className="text-2xl hover:scale-x-95 transition-all duration-300 font-bold ml-4 py-4 text-black">Sign Up</h1>
                </Link>
                <Link href="/dating">
                    <h1 className="text-2xl hover:scale-x-95 transition-all duration-300 font-bold ml-4 py-4 text-black">Speed Dating</h1>
                </Link>
            </div>
        </div>
    );
}