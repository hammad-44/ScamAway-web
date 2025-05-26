import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/PageHeader";

import {
  Cookie,
  Settings2,
  TimerReset,
  Eye,
  CircleFadingArrowUp,
  Contact
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

const Cookies = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <main className="flex-grow">
        <PageHeader
          title="Cookie Policy"
          description="Understand how and why we use cookies on our platform."
        />

        <div className="container mx-auto px-4 py-10">
          <div className="bg-white p-10 rounded-xl shadow-md">
            <div className="max-w-4xl mx-auto space-y-8 text-base leading-relaxed">

              <SectionHeader title="1. What Are Cookies?" icon={Cookie} />
              <p>
                Cookies are small text files stored on your device to enhance your experience and gather information about your interactions with our services.
              </p>

              <SectionHeader title="2. How We Use Cookies" icon={Settings2} />
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>To remember your preferences and settings</li>
                <li>To authenticate and secure your session</li>
                <li>To understand user behavior and improve performance</li>
                <li>To deliver relevant content and advertising</li>
              </ul>

              <SectionHeader title="3. Types of Cookies We Use" icon={TimerReset} />
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for basic website functionality.</li>
                <li><strong>Analytics Cookies:</strong> Help us analyze user activity and improve usability.</li>
                <li><strong>Functional Cookies:</strong> Allow personalization and remembering user choices.</li>
                <li><strong>Advertising Cookies:</strong> Used for targeting ads based on your interests.</li>
              </ul>

              <SectionHeader title="4. Managing Cookies" icon={Eye} />
              <p>
                You can manage or disable cookies through your browser settings. Please note that disabling cookies may affect your user experience.
              </p>

              <SectionHeader title="5. Changes to This Policy" icon={CircleFadingArrowUp} />
              <p>
                We may update this Cookie Policy to reflect changes in our practices or for legal reasons. Please review it periodically.
              </p>

              <SectionHeader title="6. Contact Us" icon={Contact} />
              <p>
                For questions about this Cookie Policy, contact us:
              </p>
              <p className="font-medium">
                Email: <a href="mailto:privacy@scamaway.com" className="text-blue-600 underline">privacy@scamaway.com</a><br />
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


export default Cookies;
