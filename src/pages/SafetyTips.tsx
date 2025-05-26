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

            {/* Other tabs would be implemented similarly */}
            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Payment Safety</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-6">
                    Protecting your financial information online is crucial.
                    This section provides guidance on secure payment methods and
                    practices to prevent financial fraud.
                  </p>
                  <p className="italic text-gray-500">
                    Detailed payment safety content would be provided here,
                    similar to the Shopping and Email sections.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mobile">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Mobile Safety</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-6">
                    As smartphones become our primary devices, they also become
                    targets for scammers. Learn how to keep your mobile devices
                    and data secure.
                  </p>
                  <p className="italic text-gray-500">
                    Detailed mobile safety content would be provided here,
                    similar to the Shopping and Email sections.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="crypto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Cryptocurrency Safety
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-6">
                    Cryptocurrency scams are increasingly common. Learn how to
                    identify legitimate opportunities and protect your digital
                    assets.
                  </p>
                  <p className="italic text-gray-500">
                    Detailed cryptocurrency safety content would be provided
                    here, similar to the Shopping and Email sections.
                  </p>
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
