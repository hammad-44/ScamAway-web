import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="max-w-xs pt-12">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <User className="h-5 w-5" />
            <span className="font-medium">Account</span>
          </div>

          <div className="space-y-2">
            <Link
              to="/login"
              className="block py-2 text-gray-700 hover:text-gray-900"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block py-2 text-gray-700 hover:text-gray-900"
              onClick={() => setOpen(false)}
            >
              Register
            </Link>
            <Link
              to="/account"
              className="block py-2 text-gray-700 hover:text-gray-900"
              onClick={() => setOpen(false)}
            >
              My Account
            </Link>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-200">
            <Link
              to="/report"
              className="block py-2 text-gray-700 hover:text-gray-900 font-medium"
              onClick={() => setOpen(false)}
            >
              Report a Scam
            </Link>
            <Link
              to="/help"
              className="block py-2 text-gray-700 hover:text-gray-900 font-medium"
              onClick={() => setOpen(false)}
            >
              Help & Info
            </Link>
            <Link
              to="/check"
              className="block py-2 text-gray-700 hover:text-gray-900 font-medium"
              onClick={() => setOpen(false)}
            >
              Check Website
            </Link>
            <Link
              to="/tips"
              className="block py-2 text-gray-700 hover:text-gray-900 font-medium"
              onClick={() => setOpen(false)}
            >
              Safety Tips
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
