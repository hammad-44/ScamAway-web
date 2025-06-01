import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ShoppingCart,
  Mail,
  CreditCard,
  Smartphone,
  Coins,
  Shield,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const SafetyTips = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        <PageHeader
          title="Online Safety Tips"
          description="Learn how to protect yourself from scams and stay safe online"
        />

        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="shopping" className="w-full mb-16">
            <TabsList className="w-full flex flex-wrap justify-center mb-8">
              <TabsTrigger value="shopping" className="gap-1">
                <ShoppingCart className="h-4 w-4" /> Shopping
              </TabsTrigger>
              <TabsTrigger value="email" className="gap-1">
                <Mail className="h-4 w-4" /> Email
              </TabsTrigger>
              <TabsTrigger value="payment" className="gap-1">
                <CreditCard className="h-4 w-4" /> Payment
              </TabsTrigger>
              <TabsTrigger value="mobile" className="gap-1">
                <Smartphone className="h-4 w-4" /> Mobile
              </TabsTrigger>
              <TabsTrigger value="crypto" className="gap-1">
                <Coins className="h-4 w-4" /> Cryptocurrency
              </TabsTrigger>
            </TabsList>

            {/* Shopping Safety Tab */}
            <TabsContent value="shopping">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Safe Online Shopping Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-700">
                    Shopping online offers convenience, but it's important to
                    protect yourself from scams and fraudulent websites. Follow
                    these tips to shop safely:
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        Before You Shop
                      </h3>

                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Research the website before buying
                            </p>
                            <p className="text-gray-600">
                              Check the website with ScamAway, look for
                              reviews, and verify the company's existence.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Look for secure website features
                            </p>
                            <p className="text-gray-600">
                              Check for "https://" and a padlock icon in the
                              address bar, indicating a secure connection.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Be wary of extremely low prices
                            </p>
                            <p className="text-gray-600">
                              If a deal seems too good to be true, it probably
                              is. Compare prices across multiple retailers.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Check the website's contact information
                            </p>
                            <p className="text-gray-600">
                              Legitimate stores will have clear contact details,
                              including a physical address and phone number.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        During & After Purchase
                      </h3>

                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Use secure payment methods
                            </p>
                            <p className="text-gray-600">
                              Credit cards and PayPal offer better protection
                              against fraud compared to wire transfers or
                              cryptocurrency.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Don't store payment information
                            </p>
                            <p className="text-gray-600">
                              Avoid saving your credit card details on websites
                              unless you frequently shop there and trust them.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Keep records of your purchases
                            </p>
                            <p className="text-gray-600">
                              Save order confirmations, receipts, and
                              correspondence in case there are any issues.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Monitor your statements
                            </p>
                            <p className="text-gray-600">
                              Regularly check your credit card and bank
                              statements for unauthorized charges.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 p-6 rounded-lg border border-red-100 mt-6">
                    <h3 className="text-xl font-semibold flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      Warning Signs of Shopping Scams
                    </h3>

                    <ul className="grid md:grid-cols-2 gap-x-8 gap-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        No customer reviews or only perfect 5-star reviews
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        Website is newly created (less than 6 months old)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        Poor spelling and grammar throughout the website
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        Only accepts payment via wire transfer or cryptocurrency
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        No secure payment processing (missing HTTPS)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        No return policy or unclear terms and conditions
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Email Safety Tab */}
            <TabsContent value="email">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Email & Phishing Protection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-700">
                    Email phishing attempts are among the most common online
                    scams. Learn how to identify suspicious emails and protect
                    your personal information:
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        Identifying Phishing Emails
                      </h3>

                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Check the sender's email address
                            </p>
                            <p className="text-gray-600">
                              Phishers often use domains that look similar to
                              legitimate companies but with slight misspellings.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Be suspicious of urgent requests
                            </p>
                            <p className="text-gray-600">
                              Scammers create a sense of urgency to pressure you
                              into acting quickly without thinking.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Look for poor grammar</p>
                            <p className="text-gray-600">
                              Legitimate companies proofread their emails.
                              Spelling and grammar errors are red flags.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Generic greetings are suspicious
                            </p>
                            <p className="text-gray-600">
                              "Dear User" or "Dear Customer" instead of your
                              name can indicate a mass-sent phishing attempt.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        Protecting Yourself
                      </h3>

                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Never click suspicious links
                            </p>
                            <p className="text-gray-600">
                              Hover over links to see the actual URL before
                              clicking. Better yet, access websites directly by
                              typing the address.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Don't download unexpected attachments
                            </p>
                            <p className="text-gray-600">
                              Even from known senders, be cautious about
                              unexpected attachments that could contain malware.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Use email filtering and protection
                            </p>
                            <p className="text-gray-600">
                              Most email providers offer spam filtering. Make
                              sure it's enabled and check your spam folder
                              occasionally.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Verify requests for sensitive information
                            </p>
                            <p className="text-gray-600">
                              Contact the company directly using their official
                              phone number or website if you receive a request
                              for personal information.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 p-6 rounded-lg border border-red-100 mt-6">
                    <h3 className="text-xl font-semibold flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      Common Phishing Scams
                    </h3>

                    <ul className="grid md:grid-cols-2 gap-x-8 gap-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        Fake password reset requests
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        Account suspension warnings
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        Package delivery notifications
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        Tax refund notifications
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        Tech support requests
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        Job offers that seem too good to be true
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment Safety Tab */}
            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Secure Payment Practices
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-700">
                    Protecting your financial information online is crucial.
                    This section provides guidance on secure payment methods and
                    practices to prevent financial fraud.
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        Safe Payment Methods
                      </h3>

                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Use Credit Cards or PayPal
                            </p>
                            <p className="text-gray-600">
                              These offer built-in fraud protection and dispute
                              resolution services.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Virtual Credit Cards</p>
                            <p className="text-gray-600">
                              Some banks offer temporary card numbers for
                              one-time online purchases, adding an extra layer
                              of security.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Avoid Wire Transfers</p>
                            <p className="text-gray-600">
                              Wire transfers are like sending cash; once sent,
                              it's almost impossible to recover.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Two-Factor Authentication (2FA)
                            </p>
                            <p className="text-gray-600">
                              Enable 2FA wherever possible for payment accounts
                              to add an extra layer of security.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        General Payment Security
                      </h3>

                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Use Strong, Unique Passwords
                            </p>
                            <p className="text-gray-600">
                              Especially for banking and payment accounts.
                              Consider using a password manager.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Regularly Monitor Bank Statements
                            </p>
                            <p className="text-gray-600">
                              Check for any suspicious or unauthorized
                              transactions promptly.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Be Cautious with Public Wi-Fi
                            </p>
                            <p className="text-gray-600">
                              Avoid making payments or accessing sensitive
                              financial information on unsecured public Wi-Fi networks.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Keep Software Updated
                            </p>
                            <p className="text-gray-600">
                              Ensure your operating system, browser, and antivirus
                              software are always up-to-date to protect against vulnerabilities.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 p-6 rounded-lg border border-red-100 mt-6">
                    <h3 className="text-xl font-semibold flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      Red Flags in Payment Scams
                    </h3>

                    <ul className="grid md:grid-cols-2 gap-x-8 gap-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        Requests for payment via gift cards or unusual methods
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        Pressure to pay immediately or face consequences
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        Unsolicited invoices or payment requests
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        Offers that seem too good to be true, requiring upfront payment
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        Links to suspicious payment portals
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        Requests for personal financial details via unsecured channels
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Mobile Safety Tab */}
            <TabsContent value="mobile">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Mobile Device Safety</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-700">
                    Smartphones are central to our digital lives, making them prime targets for scams.
                    Protect your mobile devices and personal data with these essential tips.
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        Securing Your Device
                      </h3>

                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Use Strong Passcodes/Biometrics
                            </p>
                            <p className="text-gray-600">
                              Enable fingerprint, face ID, or a strong PIN/password to unlock your device.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Keep Your OS Updated
                            </p>
                            <p className="text-gray-600">
                              Install operating system updates promptly to patch security vulnerabilities.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Review App Permissions
                            </p>
                            <p className="text-gray-600">
                              Only grant necessary permissions to apps. Be wary of apps requesting excessive access.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Enable Find My Device Features
                            </p>
                            <p className="text-gray-600">
                              These features (e.g., Find My iPhone, Find My Device for Android) can help locate a lost or stolen phone.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        Protecting Your Data
                      </h3>

                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Be Wary of Public Wi-Fi
                            </p>
                            <p className="text-gray-600">
                              Avoid accessing sensitive information or making payments on unsecured public Wi-Fi.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Avoid Clicking Suspicious Links
                            </p>
                            <p className="text-gray-600">
                              Be cautious of links in SMS messages (smishing) or unexpected emails.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Only Download Apps from Official Stores
                            </p>
                            <p className="text-gray-600">
                              Google Play Store and Apple App Store vet apps for security.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Regularly Back Up Your Data
                            </p>
                            <p className="text-gray-600">
                              Back up photos, contacts, and important documents to cloud services or a computer.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 p-6 rounded-lg border border-red-100 mt-6">
                    <h3 className="text-xl font-semibold flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      Mobile Scam Warning Signs
                    </h3>

                    <ul className="grid md:grid-cols-2 gap-x-8 gap-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        Unexpected calls or SMS messages from unknown numbers
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        Messages asking for personal details or login credentials
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        Links to suspicious websites in texts or emails
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        Pop-ups claiming your device is infected with a virus
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        Apps requesting excessive or unusual permissions
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        Unsolicited requests to download software or updates
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Cryptocurrency Safety Tab */}
            <TabsContent value="crypto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Cryptocurrency Safety
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-700">
                    The world of cryptocurrency is exciting but also a hotbed for scams.
                    Learn how to identify legitimate opportunities and protect your digital assets.
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        Protecting Your Assets
                      </h3>

                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Use Reputable Exchanges
                            </p>
                            <p className="text-gray-600">
                              Only use well-known and regulated cryptocurrency
                              exchanges with strong security measures.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Secure Your Wallet
                            </p>
                            <p className="text-gray-600">
                              Use hardware wallets for large holdings and enable
                              all available security features like 2FA.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Beware of Phishing Websites
                            </p>
                            <p className="text-gray-600">
                              Always double-check the URL of crypto exchanges
                              and wallets before entering credentials.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Educate Yourself
                            </p>
                            <p className="text-gray-600">
                              Understand the basics of blockchain and
                              cryptocurrency before investing.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        Identifying Crypto Scams
                      </h3>

                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              "Get Rich Quick" Schemes
                            </p>
                            <p className="text-gray-600">
                              Promises of guaranteed high returns with little to
                              no risk are almost always scams.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Fake ICOs/Tokens
                            </p>
                            <p className="text-gray-600">
                              Thoroughly research any new Initial Coin Offering
                              (ICO) or token before investing.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Romance Scams with Crypto
                            </p>
                            <p className="text-gray-600">
                              Scammers build relationships online then
                              convince victims to invest in fake crypto schemes.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              Impersonation Scams
                            </p>
                            <p className="text-gray-600">
                              Scammers pretend to be celebrities, government
                              officials, or support staff to trick you into
                              sending crypto.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 p-6 rounded-lg border border-red-100 mt-6">
                    <h3 className="text-xl font-semibold flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      Common Crypto Scam Tactics
                    </h3>

                    <ul className="grid md:grid-cols-2 gap-x-8 gap-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        Unsolicited investment opportunities via social media
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        Requests for private keys or seed phrases
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        Fake customer support asking for remote access
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        Promises of free crypto or airdrops requiring a small "fee"
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        Pressure to invest quickly without proper research
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        Websites with poor design, grammar, or missing contact info
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SafetyTips;
