import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/PageHeader";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        <PageHeader
          title="Privacy Policy"
          description="How we collect, use, and protect your personal information"
        />

        <div className="container mx-auto px-4 py-8">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="prose max-w-none">
              <p>Last Updated: November 15, 2023</p>

              <h2>1. Introduction</h2>
              <p>
                At ScamAdviser, we respect your privacy and are committed to
                protecting your personal data. This Privacy Policy explains how
                we collect, use, disclose, and safeguard your information when
                you visit our website or use our services.
              </p>
              <p>
                Please read this Privacy Policy carefully. If you do not agree
                with the terms of this Privacy Policy, please do not access our
                website or use our services.
              </p>

              <h2>2. Information We Collect</h2>
              <h3>2.1 Personal Data</h3>
              <p>
                We may collect personal identification information from you in
                various ways, including:
              </p>
              <ul>
                <li>
                  <strong>Account Information:</strong> When you create an
                  account, we collect your name, email address, and password.
                </li>
                <li>
                  <strong>Profile Information:</strong> Information you provide
                  in your user profile, such as your photograph, location, or
                  biographical information.
                </li>
                <li>
                  <strong>Communication Data:</strong> Information you provide
                  when contacting us, such as through our contact form, email,
                  or customer support.
                </li>
                <li>
                  <strong>User Content:</strong> Information you provide when
                  submitting scam reports, reviews, or comments on our platform.
                </li>
              </ul>

              <h3>2.2 Usage Data</h3>
              <p>
                We also collect information about how you use our website and
                services, including:
              </p>
              <ul>
                <li>
                  <strong>Log and Usage Data:</strong> Information such as your
                  IP address, browser type, referring/exit pages, operating
                  system, date/time stamps, and clickstream data.
                </li>
                <li>
                  <strong>Device Information:</strong> Information about the
                  device you use to access our services, including device type,
                  model, and operating system.
                </li>
                <li>
                  <strong>Location Data:</strong> Approximate location
                  information derived from your IP address.
                </li>
                <li>
                  <strong>Cookies and Similar Technologies:</strong> Information
                  collected through cookies, web beacons, and similar
                  technologies. For more information, please see our Cookie
                  Policy.
                </li>
              </ul>

              <h2>3. How We Use Your Information</h2>
              <p>
                We use the information we collect for various purposes,
                including:
              </p>
              <ul>
                <li>Providing, maintaining, and improving our services</li>
                <li>Processing and fulfilling your requests</li>
                <li>
                  Communicating with you about our services, updates, and
                  promotions
                </li>
                <li>Personalizing your experience on our platform</li>
                <li>
                  Analyzing usage patterns and trends to improve our website and
                  services
                </li>
                <li>
                  Detecting, preventing, and addressing technical issues, fraud,
                  or illegal activity
                </li>
                <li>Complying with legal obligations</li>
              </ul>

              <h2>4. How We Share Your Information</h2>
              <p>
                We may share your information with third parties in the
                following circumstances:
              </p>
              <ul>
                <li>
                  <strong>Service Providers:</strong> We may share your
                  information with third-party vendors, service providers, and
                  contractors who perform services for us or on our behalf.
                </li>
                <li>
                  <strong>Business Transfers:</strong> If we are involved in a
                  merger, acquisition, or sale of all or a portion of our
                  assets, your information may be transferred as part of that
                  transaction.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose your
                  information if required to do so by law or in response to
                  valid requests by public authorities.
                </li>
                <li>
                  <strong>Protection of Rights:</strong> We may disclose your
                  information to protect our rights, privacy, safety, or
                  property, and that of our users or others.
                </li>
                <li>
                  <strong>With Your Consent:</strong> We may share your
                  information with your consent or at your direction.
                </li>
              </ul>

              <h2>5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures
                to protect the security, integrity, and confidentiality of your
                personal information. However, no electronic transmission or
                storage system is 100% secure, and we cannot guarantee absolute
                security.
              </p>

              <h2>6. Data Retention</h2>
              <p>
                We will retain your personal information only for as long as
                necessary to fulfill the purposes outlined in this Privacy
                Policy, unless a longer retention period is required or
                permitted by law.
              </p>

              <h2>7. Your Rights</h2>
              <p>
                Depending on your location, you may have certain rights
                regarding your personal information, including:
              </p>
              <ul>
                <li>The right to access your personal information</li>
                <li>
                  The right to correct inaccurate or incomplete information
                </li>
                <li>The right to delete your personal information</li>
                <li>
                  The right to restrict or object to the processing of your
                  personal information
                </li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the
                information provided in the "Contact Us" section below.
              </p>

              <h2>8. Children's Privacy</h2>
              <p>
                Our services are not intended for children under the age of 16,
                and we do not knowingly collect personal information from
                children under 16. If we learn that we have collected personal
                information from a child under 16, we will take steps to delete
                that information as quickly as possible.
              </p>

              <h2>9. International Data Transfers</h2>
              <p>
                Your information may be transferred to, and maintained on,
                computers located outside of your state, province, country, or
                governmental jurisdiction where data protection laws may differ
                from those in your jurisdiction. If you are located outside the
                Netherlands and choose to provide information to us, please note
                that we transfer the information to the Netherlands and process
                it there.
              </p>

              <h2>10. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. If we make
                material changes, we will notify you by posting the new Privacy
                Policy on our website or through other communications. Your
                continued use of our services after the effective date of the
                revised Privacy Policy constitutes your acceptance of the
                changes.
              </p>

              <h2>11. Contact Us</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy
                or our data practices, please contact us at:
              </p>
              <p>
                Email: privacy@scamadviser.com
                <br />
                Postal Address: 123 Anti-Scam Street, Amsterdam, 1000 AB,
                Netherlands
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
