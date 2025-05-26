import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  BookText,
  UserCheck,
  FileText,
  Copyright,
  Shield,
  Ban,
  AlertOctagon,
  Gavel,
  DoorOpen,
} from "lucide-react";

const SectionHeader = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-2 mt-10 mb-4">
    {Icon && <Icon className="w-6 h-6 text-blue-600" />}
    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
  </div>
);

const SubHeader = ({ title }) => (
  <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-2">{title}</h3>
);

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <main className="flex-grow">
        <PageHeader
          title="Terms of Service"
          description="Please read these terms and conditions carefully before using ScamAway"
        />

        <div className="container mx-auto px-4 py-10">
          <div className="bg-white p-10 rounded-xl shadow-md">
            <div className="max-w-4xl mx-auto space-y-8 text-base leading-relaxed">
              <SectionHeader title="1. Introduction" icon={BookText} />
              <p>
                Welcome to <strong>ScamAway</strong> ("we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of the ScamAway website, applications, and all related services (collectively, the "Services").
              </p>
              <p>
                By accessing or using our Services, you agree to be bound by these Terms. If you do not agree, you may not use the Services.
              </p>

              <SectionHeader title="2. Using Our Services" icon={UserCheck} />
              <SubHeader title="2.1 Account Registration" />
              <p>
                Some features require registration. You agree to provide accurate, updated information and are responsible for your account's security.
              </p>

              <SubHeader title="2.2 Acceptable Use" />
              <p>When using our Services, you agree not to:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Violate applicable laws or regulations</li>
                <li>Transmit defamatory or offensive material</li>
                <li>Access restricted parts without authorization</li>
                <li>Harvest emails or personal data</li>
                <li>Impersonate individuals or misrepresent affiliations</li>
                <li>Disrupt services or networks</li>
                <li>Use bots, scrapers, or automated tools without permission</li>
              </ul>

              <SectionHeader title="3. Content and Information" icon={FileText} />
              <SubHeader title="3.1 User-Generated Content" />
              <p>
                You retain ownership of your content but grant us a license to use it for service delivery and promotion.
              </p>

              <SubHeader title="3.2 Content Accuracy" />
              <p>
                We strive for accuracy, but we rely on automation and user reports. Please verify information before acting.
              </p>

              <SectionHeader title="4. Privacy and Data Protection" icon={Shield} />
              <p>
                By using our Services, you agree to our data practices described in the <strong>Privacy Policy</strong>.
              </p>

              <SectionHeader title="5. Intellectual Property" icon={Copyright} />
              <p>
                All materials are owned by ScamAway or its licensors and protected by law. You may not copy or modify them without permission.
              </p>

              <SectionHeader title="6. Disclaimer of Warranties" icon={Ban} />
              <p>
                Services are provided “as is” without warranties of any kind. We do not guarantee error-free or uninterrupted access.
              </p>

              <SectionHeader title="7. Limitation of Liability" icon={AlertOctagon} />
              <p>
                ScamAway is not liable for indirect or consequential damages. Our liability is limited to any amount you paid in the last 12 months.
              </p>

              <SectionHeader title="8. Indemnification" icon={Gavel} />
              <p>
                You agree to indemnify ScamAway against claims related to your use of our Services or violation of these Terms.
              </p>

              <SectionHeader title="9. Termination" icon={DoorOpen} />
              <p>
                We may suspend or terminate your access at any time for violations. Certain clauses remain enforceable even after termination.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
