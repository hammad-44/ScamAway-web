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
  AlertCircle,
  Phone,
  Clock,
} from "lucide-react";
import { useState, useEffect } from "react"; // Import useEffect
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";

// Import your existing Firebase db instance
import { db } from "@/firebase"; // Assuming your firebase.ts is in src/firebase.ts
import { collection, addDoc } from 'firebase/firestore';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isDbReady, setIsDbReady] = useState(false);

  useEffect(() => {
    if (db) {
      setIsDbReady(true);
    } else {
      console.error("Firestore DB instance not available. Check firebase.ts import.");
      setMessage({ type: 'error', text: "Application error: Database not connected." });
    }
  }, []); 

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null); 

    if (!isDbReady) {
      setMessage({ type: 'error', text: "Database is not ready. Please try again." });
      setLoading(false);
      return;
    }

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setMessage({ type: 'error', text: "Please fill in all required fields." });
      setLoading(false);
      return;
    }

    try {
  
      const collectionPath = "contact_messages"; 
      
      await addDoc(collection(db, collectionPath), {
        ...formData,
        timestamp: new Date().toISOString(), 
      });

      setMessage({ type: 'success', text: "Message sent successfully! We'll get back to you soon." });
      setFormSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

    } catch (error: any) {
      console.error("Error adding document: ", error);
      setMessage({ type: 'error', text: `Failed to send message: ${error.message}` });
    } finally {
      setLoading(false);
    }
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
              {message && (
                <Alert className={`mb-6 ${message.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  {message.type === 'success' ? <CheckCircle2 className="h-5 w-5 text-green-600" /> : <AlertCircle className="h-5 w-5 text-red-600" />}
                  <AlertTitle className={`${message.type === 'success' ? 'text-green-800' : 'text-red-800'} text-lg`}>
                    {message.type === 'success' ? "Success!" : "Error!"}
                  </AlertTitle>
                  <AlertDescription className={`${message.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                    {message.text}
                  </AlertDescription>
                </Alert>
              )}
              {formSubmitted && message?.type === 'success' ? ( 
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
                    <Select onValueChange={handleSelectChange} value={formData.subject}>
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
                    disabled={loading || !isDbReady}   >
                    {loading ? "Sending Message..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>

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
                      <p className="text-gray-600">Lahore Pakistan</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-gray-600">+92 312 4567890</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:support@scamaway.com" className="text-gray-600">support@scamaway.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-red-600 mt-1" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 5:00 PM PST
                      </p>
                      <p className="text-gray-600">Saturday - Sunday: Closed</p>
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
