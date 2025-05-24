import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Search, Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0">
                <AlertTriangle className="w-full h-full text-red-600 animate-pulse" />
              </div>
            </div>
          </div>

          <h1 className="text-6xl font-bold mb-6">404</h1>
          <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>

          <p className="text-xl text-gray-600 max-w-lg mx-auto mb-8">
            The page you're looking for doesn't exist or may have been moved.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-red-600 hover:bg-red-700">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>

            <Button asChild variant="outline">
              <Link to="/check">
                <Search className="mr-2 h-4 w-4" />
                Check a Website
              </Link>
            </Button>
          </div>

          <div className="mt-20 max-w-lg mx-auto">
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-100">
              <div className="flex gap-3">
                <div className="shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-yellow-800 mb-1">
                    Safety Tip
                  </h3>
                  <p className="text-yellow-700">
                    Always double-check URLs when accessing websites, especially
                    when personal or financial information is involved. Typos in
                    web addresses are a common way people accidentally visit
                    scam websites.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
