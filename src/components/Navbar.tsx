import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import DasboardBtn from "./DashboardBtn";
import { ModeToggle } from "./ModeToggle";

function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex items-center justify-between h-16 px-4 container mx-auto">
        {/* LEFT SIDE - LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-2xl font-mono hover:opacity-80 transition-opacity"
        >
          <img src="/logo.png" alt="ProScreen Logo" className="h-8 w-10" />
          <span className="bg-gradient-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent">
            ProScreen
          </span>
        </Link>

        {/* RIGHT SIDE - ACTIONS */}
        <SignedIn>
          <div className="flex items-center space-x-4 ml-auto">
            <DasboardBtn />
            <ModeToggle />
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}

export default Navbar;
