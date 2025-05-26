import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";
import { auth } from "@/firebase"; // Adjust path if needed
import { onAuthStateChanged, signOut } from "firebase/auth";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to log out");
    }
  };

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
            {!user ? (
              <>
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
              </>
            ) : (
              <>
                <Link
                  to="/account"
                  className="block py-2 text-gray-700 hover:text-gray-900"
                  onClick={() => setOpen(false)}
                >
                  My Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-gray-700 hover:text-red-600"
                >
                  Logout
                </button>
              </>
            )}
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
              FAQs
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
