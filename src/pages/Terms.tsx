import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/PageHeader";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        <PageHeader
          title="Terms of Service"
          description="Please read these terms and conditions carefully before using ScamAdviser"
        />

        <div className="container mx-auto px-4 py-8">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="prose max-w-none">
              <p>Last Updated: November 15, 2023</p>

              <h2>1. Introduction</h2>
              <p>
                Welcome to ScamAdviser ("we," "our," or "us"). These Terms of
                Service ("Terms") govern your access to and use of the
                ScamAdviser website, applications, and all related services
                (collectively, the "Services").
              </p>
              <p>
                By accessing or using our Services, you agree to be bound by
                these Terms. If you do not agree to these Terms, you may not
                access or use the Services.
              </p>

              <h2>2. Using Our Services</h2>
              <h3>2.1 Account Registration</h3>
              <p>
                Some features of our Services require you to register for an
                account. When you register, you agree to provide accurate and
                complete information and to keep this information updated. You
                are responsible for maintaining the confidentiality of your
                account credentials and for all activities that occur under your
                account.
              </p>

              <h3>2.2 Acceptable Use</h3>
              <p>When using our Services, you agree not to:</p>
              <ul>
                <li>
                  Use the Services in any way that violates applicable laws or
                  regulations
                </li>
                <li>
                  Use the Services to transmit any material that is defamatory,
                  offensive, or otherwise objectionable
                </li>
                <li>
                  Attempt to gain unauthorized access to any portion of the
                  Services or any other systems or networks connected to the
                  Services
                </li>
                <li>
                  Collect or harvest any information from the Services,
                  including email addresses or other personal information
                </li>
                <li>
                  Impersonate any person or entity, or falsely state or
                  otherwise misrepresent your affiliation with a person or
                  entity
                </li>
                <li>
                  Interfere with or disrupt the operation of the Services or
                  servers or networks connected to the Services
                </li>
                <li>
                  Use any robot, spider, or other automatic device to access the
                  Services for any purpose without our express written
                  permission
                </li>
              </ul>

              <h2>3. Content and Information</h2>
              <h3>3.1 User-Generated Content</h3>
              <p>
                Our Services may allow you to submit content, such as scam
                reports, reviews, and comments ("User Content"). You retain
                ownership of your User Content, but you grant us a worldwide,
                non-exclusive, royalty-free license to use, reproduce, modify,
                adapt, publish, translate, and distribute your User Content in
                connection with providing and promoting our Services.
              </p>

              <h3>3.2 Content Accuracy</h3>
              <p>
                We strive to provide accurate and reliable information about
                websites and potential scams, but we cannot guarantee the
                accuracy of all content. The information we provide is based on
                algorithms, user reports, and other data sources, which may not
                always be completely accurate or up-to-date.
              </p>
              <p>
                Our Services are provided for informational purposes only, and
                you should always exercise your own judgment when deciding
                whether to trust a website or service.
              </p>

              <h2>4. Privacy and Data Protection</h2>
              <p>
                Our Privacy Policy explains how we collect, use, and protect
                your personal information. By using our Services, you agree to
                our collection and use of information as described in our
                Privacy Policy.
              </p>

              <h2>5. Intellectual Property</h2>
              <p>
                All content and materials available through our Services,
                including but not limited to text, graphics, logos, icons,
                images, audio clips, and software, are the property of
                ScamAdviser or our licensors and are protected by copyright,
                trademark, and other intellectual property laws.
              </p>
              <p>
                You may not use, reproduce, distribute, modify, or create
                derivative works from any content or materials on our Services
                without our express written permission.
              </p>

              <h2>6. Disclaimer of Warranties</h2>
              <p>
                THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY
                WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT
                NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>
              <p>
                WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED OR
                ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT THE SERVICES
                OR THE SERVERS THAT MAKE THEM AVAILABLE ARE FREE OF VIRUSES OR
                OTHER HARMFUL COMPONENTS.
              </p>

              <h2>7. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, SCAMADVISER
                AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AND AFFILIATES
                SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO
                LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF OR IN
                CONNECTION WITH YOUR ACCESS TO OR USE OF THE SERVICES.
              </p>
              <p>
                IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS
                ARISING OUT OF OR RELATING TO THE SERVICES EXCEED THE AMOUNT
                PAID BY YOU, IF ANY, FOR ACCESSING THE SERVICES DURING THE
                TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE
                LIABILITY.
              </p>

              <h2>8. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless ScamAdviser
                and its officers, directors, employees, agents, and affiliates
                from and against any and all claims, liabilities, damages,
                losses, or expenses, including reasonable attorneys' fees and
                costs, arising out of or in any way connected with your access
                to or use of the Services or your violation of these Terms.
              </p>

              <h2>9. Termination</h2>
              <p>
                We may terminate or suspend your access to the Services
                immediately, without prior notice or liability, for any reason,
                including if you breach these Terms.
              </p>
              <p>
                Upon termination, your right to use the Services will
                immediately cease. All provisions of these Terms that by their
                nature should survive termination shall survive, including
                without limitation ownership provisions, warranty disclaimers,
                indemnity, and limitations of liability.
              </p>

              <h2>10. Changes to These Terms</h2>
              <p>
                We may update these Terms from time to time. If we make material
                changes, we will notify you by posting the new Terms on our
                website or through other communications. Your continued use of
                the Services after the effective date of the revised Terms
                constitutes your acceptance of the changes.
              </p>

              <h2>11. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance
                with the laws of the Netherlands, without regard to its conflict
                of law provisions.
              </p>

              <h2>12. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us
                at legal@scamadviser.com.
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
