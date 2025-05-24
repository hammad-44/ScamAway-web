import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/PageHeader";

const Cookies = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        <PageHeader
          title="Cookie Policy"
          description="How we use cookies and similar technologies on our website"
        />

        <div className="container mx-auto px-4 py-8">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="prose max-w-none">
              <p>Last Updated: November 15, 2023</p>

              <h2>1. Introduction</h2>
              <p>
                This Cookie Policy explains how ScamAdviser ("we", "us", or
                "our") uses cookies and similar technologies on our website. By
                using our website, you consent to the use of cookies as
                described in this policy.
              </p>

              <h2>2. What Are Cookies?</h2>
              <p>
                Cookies are small text files that are placed on your device when
                you visit a website. They are widely used to make websites work
                more efficiently and to provide information to the website
                owners. Cookies can be "persistent" or "session" cookies.
              </p>
              <p>
                Persistent cookies remain on your device even after you close
                your browser until they expire or you delete them. Session
                cookies are temporary and are deleted from your device when you
                close your browser.
              </p>

              <h2>3. Types of Cookies We Use</h2>
              <p>We use the following types of cookies on our website:</p>

              <h3>3.1 Essential Cookies</h3>
              <p>
                These cookies are necessary for the website to function
                properly. They enable basic functions like page navigation,
                access to secure areas, and remembering your preferences. The
                website cannot function properly without these cookies.
              </p>

              <h3>3.2 Performance Cookies</h3>
              <p>
                These cookies help us understand how visitors interact with our
                website by collecting and reporting information anonymously.
                They help us improve the functionality and user experience of
                our website.
              </p>

              <h3>3.3 Functionality Cookies</h3>
              <p>
                These cookies allow our website to remember choices you make
                (such as your username, language, or region) and provide
                enhanced, more personal features. They may also be used to
                provide services you have requested.
              </p>

              <h3>3.4 Targeting/Advertising Cookies</h3>
              <p>
                These cookies are used to deliver advertisements that are more
                relevant to you and your interests. They are also used to limit
                the number of times you see an advertisement and to help measure
                the effectiveness of advertising campaigns.
              </p>

              <h2>4. Third-Party Cookies</h2>
              <p>
                In addition to our own cookies, we may also use various
                third-party cookies to report usage statistics, deliver
                advertisements, and so on. These third-party cookies may
                include:
              </p>
              <ul>
                <li>
                  <strong>Analytics Cookies:</strong> We use Google Analytics to
                  help us understand how our website is being used. These
                  cookies may track things such as how long you spend on the
                  site and the pages you visit.
                </li>
                <li>
                  <strong>Social Media Cookies:</strong> We may use cookies set
                  by social media services (like Facebook, Twitter, and
                  LinkedIn) that enable you to share content from our website on
                  these services.
                </li>
                <li>
                  <strong>Advertising Cookies:</strong> We may use cookies set
                  by advertising networks to deliver ads that may be relevant to
                  you based on your browsing habits.
                </li>
              </ul>

              <h2>5. Specific Cookies We Use</h2>
              <p>
                Below is a detailed list of the cookies we use on our website:
              </p>

              <table className="border-collapse border border-gray-300 w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">Cookie Name</th>
                    <th className="border border-gray-300 p-2">Purpose</th>
                    <th className="border border-gray-300 p-2">Type</th>
                    <th className="border border-gray-300 p-2">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">_ga</td>
                    <td className="border border-gray-300 p-2">
                      Used by Google Analytics to distinguish users.
                    </td>
                    <td className="border border-gray-300 p-2">Performance</td>
                    <td className="border border-gray-300 p-2">2 years</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">_gid</td>
                    <td className="border border-gray-300 p-2">
                      Used by Google Analytics to distinguish users.
                    </td>
                    <td className="border border-gray-300 p-2">Performance</td>
                    <td className="border border-gray-300 p-2">24 hours</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">_gat</td>
                    <td className="border border-gray-300 p-2">
                      Used by Google Analytics to throttle request rate.
                    </td>
                    <td className="border border-gray-300 p-2">Performance</td>
                    <td className="border border-gray-300 p-2">1 minute</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">auth_token</td>
                    <td className="border border-gray-300 p-2">
                      Used to maintain login status.
                    </td>
                    <td className="border border-gray-300 p-2">Essential</td>
                    <td className="border border-gray-300 p-2">Session</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">preferences</td>
                    <td className="border border-gray-300 p-2">
                      Used to remember user preferences.
                    </td>
                    <td className="border border-gray-300 p-2">
                      Functionality
                    </td>
                    <td className="border border-gray-300 p-2">1 year</td>
                  </tr>
                </tbody>
              </table>

              <h2>6. How to Control Cookies</h2>
              <p>
                Most web browsers allow you to control cookies through their
                settings preferences. However, if you limit the ability of
                websites to set cookies, you may worsen your overall user
                experience, as it will no longer be personalized to you. It may
                also stop you from saving customized settings like login
                information.
              </p>
              <p>To manage cookies in your browser, you can:</p>
              <ul>
                <li>
                  <strong>Google Chrome:</strong> Settings &rarr; Privacy and
                  security &rarr; Cookies and other site data
                </li>
                <li>
                  <strong>Mozilla Firefox:</strong> Options &rarr; Privacy &amp;
                  Security &rarr; Cookies and Site Data
                </li>
                <li>
                  <strong>Safari:</strong> Preferences &rarr; Privacy &rarr;
                  Cookies and website data
                </li>
                <li>
                  <strong>Microsoft Edge:</strong> Settings &rarr; Site
                  permissions &rarr; Cookies and site data
                </li>
              </ul>

              <h2>7. Changes to This Cookie Policy</h2>
              <p>
                We may update this Cookie Policy from time to time to reflect
                changes in technology, regulation, or our business practices.
                Any changes will become effective when we post the revised
                Cookie Policy on our website. We encourage you to periodically
                review this page for the latest information on our cookie
                practices.
              </p>

              <h2>8. Contact Us</h2>
              <p>
                If you have any questions about our Cookie Policy, please
                contact us:
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

export default Cookies;
