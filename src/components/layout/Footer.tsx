import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">About ScamAway</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Contact Us
                </Link>
              </li>
              
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">For Consumers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/check" className="text-gray-600 hover:text-gray-900">
                  Check Websites
                </Link>
              </li>
              <li>
                <Link
                  to="/report"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Report Scams
                </Link>
              </li>
              <li>
                <Link to="/tips" className="text-gray-600 hover:text-gray-900">
                  Safety Tips
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-gray-900">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/disclaimer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} ScamAway. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
