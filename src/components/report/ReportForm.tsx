import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  reportType: z.enum(["website", "email", "phonecall", "sms", "other"], {
    required_error: "Please select a scam type",
  }),
  entityValue: z.string().min(1, "This field is required"),
  scamCategory: z.string().min(1, "Please select a scam category"),
  moneyLost: z.enum(["yes", "no"], {
    required_error: "Please specify if you lost money",
  }),
  amount: z.string().optional(),
  description: z
    .string()
    .min(10, "Please provide at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
});

type ReportFormValues = z.infer<typeof formSchema>;

export function ReportForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reportType: "website",
      entityValue: "",
      scamCategory: "",
      moneyLost: "no",
      amount: "",
      description: "",
      name: "",
      email: "",
    },
  });

  const watchMoneyLost = form.watch("moneyLost");
  const watchReportType = form.watch("reportType");

  const onSubmit = async (data: ReportFormValues) => {
    setSubmitting(true);

    // In a real app, this would be an API call
    try {
      console.log("Report form submitted:", data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting form:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const getPlaceholder = () => {
    switch (watchReportType) {
      case "website":
        return "https://suspicious-website.com";
     
    }
  };

  const getFieldLabel = () => {
    switch (watchReportType) {
      case "website":
        return "Website URL";
     
    }
  };

  if (submitted) {
    return (
      <Card>
        <CardContent className="pt-6">
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-800 text-lg">
              Report Submitted Successfully
            </AlertTitle>
            <AlertDescription className="text-green-700">
              <p className="mb-4">
                Thank you for helping make the internet safer for everyone. Your
                report has been received and will be reviewed by our team.
              </p>
              <p>
                Other users will now be warned about this scam when they check
                this entity using our tools.
              </p>
            </AlertDescription>
          </Alert>
          <div className="mt-6 text-center">
            <Button
              onClick={() => {
                form.reset();
                setSubmitted(false);
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Submit Another Report
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            

            <FormField
              control={form.control}
              name="entityValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{getFieldLabel()}</FormLabel>
                  <FormControl>
                    <Input placeholder={getPlaceholder()} {...field} />
                  </FormControl>
                  <FormDescription>
                    Please provide the full Website URL of
                    the scam you're reporting
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="scamCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scam Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="phishing">Phishing</SelectItem>
                      <SelectItem value="fake_shop">
                        Fake Online Shop
                      </SelectItem>
                      <SelectItem value="crypto_scam">
                        Cryptocurrency Scam
                      </SelectItem>
                      <SelectItem value="tech_support">
                        Tech Support Scam
                      </SelectItem>
                      <SelectItem value="romance">Romance Scam</SelectItem>
                      <SelectItem value="investment">
                        Investment Fraud
                      </SelectItem>
                      <SelectItem value="charity">Fake Charity</SelectItem>
                      <SelectItem value="employment">
                        Employment Scam
                      </SelectItem>
                      <SelectItem value="malware">Malware/Virus</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="moneyLost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Did you lose money to this scam?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="money-yes" />
                        <Label htmlFor="money-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="money-no" />
                        <Label htmlFor="money-no">No</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchMoneyLost === "yes" && (
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How much money did you lose?</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="e.g. $500" {...field} />
                    </FormControl>
                    <FormDescription>
                      This information helps us track the impact of scams
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please describe your experience with this scam in detail"
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Include details like what happened, what was promised, how
                    you were contacted, etc.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Hammad Haider" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      We'll never share your email with anyone else
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700"
              disabled={submitting}
            >
              {submitting ? "Submitting Report..." : "Submit Report"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
