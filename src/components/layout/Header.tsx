import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, User } from "lucide-react";
import { MobileMenu } from "./MobileMenu";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="relative">
        <div className="absolute inset-0 bg-red-600 rotate-45 transform origin-center rounded-sm"></div>
        <div className="relative z-10 w-8 h-8 bg-black rounded-sm flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white rounded-full"></div>
        </div>
      </div>
      <span className="font-bold text-xl">
        <span className="text-red-600">SCAM</span>
        <span className="text-black">AWAY</span>
      </span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Logo />

          </div>

          <nav className="hidden md:flex items-center gap-4">
            <Link to="/report" className="text-gray-700 hover:text-gray-900">
              Report a Scam
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/help" className="text-gray-700 hover:text-gray-900">
              Help & Info
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link to="/login" className="w-full">
                    Login
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/register" className="w-full">
                    Register
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/account" className="w-full">
                    My Account
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
          
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
