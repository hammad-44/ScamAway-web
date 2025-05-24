import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { ReportForm } from "@/components/report/ReportForm";
import { AlertCircle, CheckCircle, FileText } from "lucide-react";

const ReportScam = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        <PageHeader
          title="Report a Scam"
          description="Help protect others by reporting fraudulent websites, emails, or other scams you've encountered"
        />

        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <ReportForm />
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                  <AlertCircle className="text-red-600 h-5 w-5" />
                  Why Report Scams?
                </h3>
                <p className="text-gray-600 mb-4">
                  By reporting scams, you help us:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-600 h-5 w-5 shrink-0 mt-0.5" />
                    <span>Warn other users before they become victims</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-600 h-5 w-5 shrink-0 mt-0.5" />
                    <span>Build a more comprehensive database of scams</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-600 h-5 w-5 shrink-0 mt-0.5" />
                    <span>
                      Identify and track new scam patterns as they emerge
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-600 h-5 w-5 shrink-0 mt-0.5" />
                    <span>
                      Collaborate with authorities to take down fraudulent sites
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                  <FileText className="text-blue-600 h-5 w-5" />
                  What Information to Include
                </h3>
                <p className="text-gray-600 mb-3">
                  The more details you provide, the more effective your report
                  will be:
                </p>
                <ul className="space-y-1 text-gray-600 list-disc pl-5">
                  <li>The exact website URL, email address, or phone number</li>
                  <li>How you were contacted or how you found the scam</li>
                  <li>What the scammer was offering or requesting</li>
                  <li>Any suspicious details you noticed</li>
                  <li>
                    Whether you lost money or personal information (optional)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReportScam;
