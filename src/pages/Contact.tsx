import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  MessageSquare,
  Share2,
  MapPin,
  Phone,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // In a real implementation, this would send the form data to a server
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        <PageHeader
          title="Contact Us"
          description="Have questions, feedback, or need assistance? We're here to help!"
        />

        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="md:col-span-2">
              {formSubmitted ? (
                <Alert className="bg-green-50 border-green-200 mb-6">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <AlertTitle className="text-green-800 text-lg">
                    Message Sent Successfully
                  </AlertTitle>
                  <AlertDescription className="text-green-700">
                    Thank you for contacting us! Our team will get back to you
                    as soon as possible, usually within 24-48 hours.
                  </AlertDescription>
                </Alert>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white p-6 rounded-lg shadow-sm"
                >
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Your Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <Label htmlFor="subject">Subject</Label>
                    <Select onValueChange={handleSelectChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="technical">
                          Technical Support
                        </SelectItem>
                        <SelectItem value="report">Report an Issue</SelectItem>
                        <SelectItem value="partnership">
                          Partnership Opportunity
                        </SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 mb-6">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      className="min-h-32"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">
                  Contact Information
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-red-600 mt-1" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-gray-600">123 Anti-Scam Street</p>
                      <p className="text-gray-600">Amsterdam, 1000 AB</p>
                      <p className="text-gray-600">Netherlands</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-gray-600">+31 (0) 20 123 4567</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">support@scamadviser.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-red-600 mt-1" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 5:00 PM CET
                      </p>
                      <p className="text-gray-600">Saturday - Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">
                  Alternative Ways to Reach Us
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Live Chat</p>
                      <p className="text-gray-600">
                        Available during business hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Share2 className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Social Media</p>
                      <div className="flex gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full w-8 h-8"
                        >
                          <span className="sr-only">Twitter</span>
                          <svg
                            viewBox="0 0 24 24"
                            className="h-4 w-4 fill-current"
                          >
                            <path d="M22 3.999a8.65 8.65 0 0 1-2.464.676 4.33 4.33 0 0 0 1.887-2.374 8.68 8.68 0 0 1-2.724 1.04 4.3 4.3 0 0 0-7.315 3.918 12.2 12.2 0 0 1-8.84-4.476 4.24 4.24 0 0 0-.583 2.157 4.29 4.29 0 0 0 1.915 3.58 4.25 4.25 0 0 1-1.949-.537v.054a4.3 4.3 0 0 0 3.44 4.211 4.25 4.25 0 0 1-1.938.073 4.3 4.3 0 0 0 4.007 2.981 8.6 8.6 0 0 1-5.32 1.829A8.7 8.7 0 0 1 2 19.74a12.14 12.14 0 0 0 6.58 1.926c7.896 0 12.222-6.54 12.222-12.217 0-.186-.004-.371-.013-.555a8.74 8.74 0 0 0 2.141-2.223z" />
                          </svg>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full w-8 h-8"
                        >
                          <span className="sr-only">Facebook</span>
                          <svg
                            viewBox="0 0 24 24"
                            className="h-4 w-4 fill-current"
                          >
                            <path d="M22 12.001c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10ZM13 21.128v-7.127h1.887a.676.676 0 0 0 .673-.675l.136-1.559a.676.676 0 0 0-.673-.67H13V9.412c0-.863.433-1.295 1.3-1.295h1.164a.676.676 0 0 0 .673-.676V5.761a.676.676 0 0 0-.673-.676h-1.942c-2.209 0-3.522 1.354-3.522 3.813v2.196H8.112a.676.676 0 0 0-.673.675v1.556a.676.676 0 0 0 .673.675H10v7.128a8.321 8.321 0 0 0 3 0Z" />
                          </svg>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full w-8 h-8"
                        >
                          <span className="sr-only">LinkedIn</span>
                          <svg
                            viewBox="0 0 24 24"
                            className="h-4 w-4 fill-current"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
