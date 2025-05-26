import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/PageHeader";

import {
  AlertTriangle,
  ShieldX,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Users,
  RefreshCcw,
  Building2,
  Scale,
  Contact
} from "lucide-react";

const SectionHeader = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-2 mt-10 mb-4">
    {Icon && <Icon className="w-6 h-6 text-blue-600" />}
    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
  </div>
);

const Disclaimer = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <main className="flex-grow">
        <PageHeader
          title="Disclaimer"
          description="Important information about the limitations of our service"
        />

        <div className="container mx-auto px-4 py-10">
          <div className="bg-white p-10 rounded-xl shadow-md">
            <div className="max-w-4xl mx-auto space-y-8 text-base leading-relaxed">

              <p className="text-sm text-gray-500">Last Updated: November 15, 2023</p>

              <SectionHeader title="1. Disclaimer" icon={AlertTriangle} />
              <p>
                The information provided on ScamAway is for general informational purposes only. All information on the site is provided in good faith. However, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, reliability, or completeness of any information.
              </p>

              <SectionHeader title="2. No Liability" icon={ShieldX} />
              <p>
                Under no circumstance shall we be liable for any loss or damage incurred as a result of using or relying on the site. Your use of the site is solely at your own risk.
              </p>

              <SectionHeader title="3. Accuracy of Information" icon={CheckCircle2} />
              <p>
                ScamAway utilizes various technologies and user reports to assess trustworthiness. These are probabilistic and not always accurate. A high trust score does not guarantee legitimacy, and a low score does not imply fraud.
              </p>

              <SectionHeader title="4. External Links" icon={ExternalLink} />
              <p>
                Our site may contain links to external websites. We do not guarantee the accuracy or reliability of any information on these third-party websites.
              </p>

              <SectionHeader title="5. Professional Advice" icon={BookOpen} />
              <p>
                The information on ScamAway is not professional advice. For legal or scam-related issues, contact your local authorities or legal advisors.
              </p>

              <SectionHeader title="6. User-Generated Content" icon={Users} />
              <p>
                Reports submitted by users are opinions and have not been verified. We do not take responsibility for the accuracy of user-generated content.
              </p>

              <SectionHeader title="7. Changes and Errors" icon={RefreshCcw} />
              <p>
                We may change the information on this site at any time. Despite efforts to provide accurate information, errors may occur. Contact us to report any inaccuracies.
              </p>

              <SectionHeader title="8. Business Listings" icon={Building2} />
              <p>
                Businesses can claim listings, and while we attempt to verify claims, we cannot guarantee accuracy or legitimacy of all business data provided.
              </p>

              <SectionHeader title="9. Use of Our Trust Scores" icon={Scale} />
              <p>
                Trust scores are proprietary to ScamAway. Reproduction, distribution, or commercial use without permission is prohibited.
              </p>

              <SectionHeader title="10. Limitation on Liability" icon={ShieldX} />
              <p>
                To the fullest extent permitted by law, ScamAway disclaims all liability for indirect, incidental, or consequential damages including:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Your use or inability to use the site.</li>
                <li>Unauthorized access to data.</li>
                <li>Service interruptions.</li>
                <li>Malicious software transmitted by third parties.</li>
                <li>Content errors and resulting damages.</li>
              </ul>

              <SectionHeader title="11. Contact Us" icon={Contact} />
              <p>
                If you have any questions about this Disclaimer, contact us:
              </p>
              <p className="font-medium">
                Email: <a href="mailto:legal@scamaway.com" className="text-blue-600 underline">legal@scamaway.com</a><br />
                Address: Lahore, Pakistan
              </p>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Disclaimer;
