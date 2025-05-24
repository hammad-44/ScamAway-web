import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MailCheck, AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple email validation
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address");
      return;
    }

    // In a real implementation, this would send the email to an API
    setSubscribed(true);
    setError(null);
    setEmail("");
  };

  return (
    <section className="py-16 bg-red-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                Join Our Early Access Community
              </CardTitle>
              <CardDescription>
                Be the first to receive alerts about emerging scams, safety
                tips, and updates from our team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {subscribed ? (
                <Alert className="bg-green-50 border-green-200">
                  <MailCheck className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-600">Success!</AlertTitle>
                  <AlertDescription>
                    Thank you for subscribing to our newsletter. You'll receive
                    your first update soon.
                  </AlertDescription>
                </Alert>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-grow"
                      aria-label="Email address"
                      required
                    />
                    <Button
                      type="submit"
                      className="bg-red-600 hover:bg-red-700 transition-colors"
                    >
                      Subscribe
                    </Button>
                  </div>
                  {error && (
                    <div className="mt-2 text-red-600 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {error}
                    </div>
                  )}
                </form>
              )}
            </CardContent>
            <CardFooter className="text-center text-sm text-gray-500 flex justify-center">
              <p className="max-w-md">
                By subscribing, you agree to receive emails from ScamAway. You
                can unsubscribe at any time.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
