import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  BookOpen,
  HelpCircle,
  FileText,
  Video,
  MessageSquare,
  Mail,
  ArrowRight,
} from "lucide-react";

const Help = () => {
  const faqs = [
    {
      question: "How does ScamAway determine if a website is safe?",
      answer:
        "ScamAway uses a sophisticated algorithm that analyzes multiple factors, including the website's age, location, popularity, and reviews from our community. We also check for suspicious characteristics commonly associated with scam websites, such as SSL certificate status, domain registration information, and presence on blacklists.",
    },
    {
      question:
        "I checked a website that I know is a scam, but it got a good rating. Why?",
      answer:
        "While our algorithm is highly accurate, scammers are constantly evolving their tactics. Some new scams might not have enough negative reports yet. If you believe a website has been incorrectly rated, please report it through our 'Report a Scam' page to help improve our database.",
    },
    {
      question: "Can I check other things besides websites for scams?",
      answer:
        "Yes! ScamAway allows you to check phone numbers, email addresses, cryptocurrency addresses, and IBAN numbers for potential scams. Our database includes reports across multiple channels that scammers use.",
    },
    {
      question: "How do I report a scam I've encountered?",
      answer:
        "You can report a scam by clicking on the 'Report a Scam' link in the navigation bar. Fill out the form with as much detail as possible about the scam you encountered. Your report helps protect others from falling victim to the same scam.",
    },
    {
      question: "Can I use ScamAway on my mobile device?",
      answer:
        "Absolutely! ScamAway is fully responsive and works on all devices. For an even better experience, you can download our mobile app from the App Store or Google Play Store.",
    },
    {
      question: "How can I get alerted about new scams?",
      answer:
        "You can sign up for our newsletter to receive regular updates about new scam trends. If you create an account, you can also set up customized alerts for specific types of scams you're concerned about.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        <PageHeader
          title="Help & Information"
          description="Find answers to common questions and learn how to protect yourself from online scams"
        />

        <div className="container mx-auto px-4 py-8">
       

          {/* Frequently Asked Questions */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <HelpCircle className="h-6 w-6 text-red-600" />
              Frequently Asked Questions
            </h2>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Contact Us Section */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Need More Help?
            </h2>

              <div className="flex flex-col items-center text-center p-6 border rounded-lg">
                <Mail className="h-10 w-10 text-red-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Email Support</h3>
                <p className="text-gray-600 mb-4">
                  Send us an email and we'll get back to you within 24 hours.
                </p>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Help;
