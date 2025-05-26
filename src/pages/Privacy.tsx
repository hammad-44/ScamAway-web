import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { ShieldCheck, User, Globe, AlertCircle,LockKeyhole,ShieldBan,Scale, CircleFadingArrowUp,Contact,SquareChartGantt,Baby} from "lucide-react";

const SectionHeader = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-2 mt-10 mb-4">
    {Icon && <Icon className="w-6 h-6 text-blue-600" />}
    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
  </div>
);

const SubHeader = ({ title }) => (
  <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-2">{title}</h3>
);

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <main className="flex-grow">
        <PageHeader
          title="Privacy Policy"
          description="Learn how we collect, use, and protect your personal information."
        />

        <div className="container mx-auto px-4 py-10">
          <div className="bg-white p-10 rounded-xl shadow-md">
            <div className="max-w-4xl mx-auto space-y-8 text-base leading-relaxed">

              <SectionHeader title="1. Introduction" icon={ShieldCheck} />
              <p>
                At <strong>ScamAway</strong>, we respect your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when using our services.
              </p>
              <p>
                Please read this carefully. If you disagree with our policy, kindly refrain from using our platform.
              </p>

              <SectionHeader title="2. Information We Collect" icon={User} />
              <SubHeader title="2.1 Personal Data" />
              <p>We collect personal data in several ways:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Account Info:</strong> Name, email, and password.</li>
                <li><strong>Profile Info:</strong> Photograph, location, bio.</li>
                <li><strong>Communication:</strong> Messages via forms or emails.</li>
                <li><strong>User Content:</strong> Reviews, reports, or comments submitted by you.</li>
              </ul>

              <SubHeader title="2.2 Usage Data" />
              <p>We also gather behavioral and technical data:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Log Data:</strong> IP, browser, pages visited.</li>
                <li><strong>Device Info:</strong> Model, OS version, browser type.</li>
                <li><strong>Location:</strong> Derived from your IP address.</li>
                <li><strong>Cookies:</strong> For better user experience. See our Cookie Policy.</li>
              </ul>

              <SectionHeader title="3. How We Use Your Information" icon={Globe} />
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>To operate and maintain our services</li>
                <li>To communicate with you about updates or support</li>
                <li>To personalize your experience</li>
                <li>To prevent fraud or unauthorized access</li>
                <li>To comply with legal requirements</li>
              </ul>

              <SectionHeader title="4. How We Share Your Information" icon={AlertCircle} />
              <p>We share your data only when necessary:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Service Providers:</strong> Third-parties that help us operate.</li>
                <li><strong>Business Transfers:</strong> During mergers or acquisitions.</li>
                <li><strong>Legal Compliance:</strong> When required by law.</li>
                <li><strong>Security Reasons:</strong> To protect ScamAway or its users.</li>
                <li><strong>With Consent:</strong> When you allow it explicitly.</li>
              </ul>

              <SectionHeader title="5. Data Security" icon={LockKeyhole} />
              <p>
                We apply technical and organizational safeguards to protect your information. However, no system is perfectly secure, and we advise caution when sharing data online.
              </p>

              <SectionHeader title="6. Data Retention"icon={ShieldBan} />
              <p>
                We retain your information only as long as needed for legitimate purposes or as required by law.
              </p>

              <SectionHeader title="7. Your Rights" icon={Scale}/>
              <p>You may be entitled to the following rights:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Access your data</li>
                <li>Correct inaccurate data</li>
                <li>Request data deletion</li>
                <li>Restrict or object to processing</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>

              <SectionHeader title="8. Children's Privacy" icon={Baby}/>
              <p>
                We do not knowingly collect data from users under 16. If we discover such collection, we will remove the data immediately.
              </p>

              <SectionHeader title="9. International Transfers" icon={SquareChartGantt}/>
              <p>
                Your data may be transferred outside your country. By using our services, you consent to data transfer to the Netherlands and its applicable laws.
              </p>

              <SectionHeader title="10. Updates to Policy" icon={CircleFadingArrowUp} />
              <p>
                We may update this Privacy Policy periodically. Continued use after changes implies acceptance.
              </p>

              <SectionHeader title="11. Contact Us" icon={Contact} />
              <p>
                Have questions? Reach out to us:
              </p>
              <p className="font-medium">
                Email: <a href="mailto:privacy@ScamAway.com" className="text-blue-600 underline">privacy@scamaway.com</a>
                <br />
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

export default Privacy;
