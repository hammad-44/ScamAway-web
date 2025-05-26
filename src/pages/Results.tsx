import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  ShieldQuestion,
  Calendar,
  Globe,
  Server,
  Lock,
  AlertTriangle,
  FileText,
  ExternalLink,
  Check,
  X,
  User,
  Clock,
  Search,
  Flag,
  ArrowRight,
  Star
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const fetchWebsiteAnalysis = async (url: string) => {
  const response = await fetch("http://localhost:8000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch analysis");
  }

  return await response.json();
};


const Results = () => {
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url") || "example.com";
  const [isLoading, setIsLoading] = useState(true);
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    setIsLoading(true);
    fetchWebsiteAnalysis(url)
      .then((data: any) => {
        setAnalysis(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching analysis:", error);
        setIsLoading(false);
      });
  }, [url]);

  const getRiskLevel = (score: number) => {
    if (score >= 66) return { level: "High Risk", color: "red" };
    if (score >= 33) return { level: "Medium Risk", color: "yellow" };
    return { level: "Low Risk", color: "green" };
  };

  const getRiskIcon = (score: number) => {
    if (score >= 66) return <ShieldAlert className="h-12 w-12 text-red-500" />;
    if (score >= 33)
      return <ShieldQuestion className="h-12 w-12 text-yellow-500" />;
    return <ShieldCheck className="h-12 w-12 text-green-500" />;
  };

  // Helper function to get badge color based on risk level
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "good":
      case "professional":
      case "not detected":
      case "not blacklisted":
        return <Badge className="bg-green-500">Good</Badge>;
      case "average":
        return <Badge className="bg-yellow-500">Average</Badge>;
      case "poor":
      case "detected":
      case "blacklisted on 3 services":
        return <Badge variant="destructive">Poor</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  // Helper function to render Yes/No icons
  const renderYesNo = (value: boolean) => {
    return value ? (
      <Check className="h-5 w-5 text-green-500" />
    ) : (
      <X className="h-5 w-5 text-red-500" />
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow">
          <PageHeader
            title="Analyzing Website"
            description={`We're thoroughly checking ${url} for potential risks`}
          />
          <div className="container mx-auto px-4 py-12">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-12 flex flex-col items-center">
                <div className="relative w-20 h-20 mb-6">
                  <svg
                    className="animate-spin w-full h-full text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Analysis in Progress</h3>
                <p className="text-gray-500 mb-8 text-center">
                  We're checking multiple data sources to determine the risk
                  level of this website. This typically takes 5-10 seconds.
                </p>
                <Progress value={65} className="w-full max-w-md" />
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow">
          <PageHeader
            title="Analysis Error"
            description="We couldn't analyze the requested website"
          />
          <div className="container mx-auto px-4 py-12 text-center">
            <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We encountered an error while trying to analyze this website.
              Please try again or check a different URL.
            </p>
            <Button asChild className="bg-red-600 hover:bg-red-700">
              <a href="/">Back to Home</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const riskLevel = getRiskLevel(analysis.riskScore);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        <PageHeader
          title="Website Analysis Results"
          description={`Here's what we found about ${url}`}
        />

        <div className="container mx-auto px-4 py-8">
          {/* Risk Score Summary */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                  {getRiskIcon(analysis.riskScore)}
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{url}</h2>
                    <Badge
                      className={`
                        text-white
                        ${
                          riskLevel.color === "red"
                            ? "bg-red-500"
                            : riskLevel.color === "yellow"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }
                      `}
                    >
                      {riskLevel.level}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold">
                        {analysis.riskScore}
                      </span>
                    </div>
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#f3f4f6"
                        strokeWidth="10"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke={
                          riskLevel.color === "red"
                            ? "#ef4444"
                            : riskLevel.color === "yellow"
                              ? "#eab308"
                              : "#22c55e"
                        }
                        strokeWidth="10"
                        strokeDasharray="282.7"
                        strokeDashoffset={
                          282.7 - (282.7 * analysis.riskScore) / 100
                        }
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                  </div>
                  <p className="mt-2 text-gray-600">Risk Score</p>
                </div>
              </div>

              <div
                className={`
                  p-4 mt-6 rounded-lg
                  ${
                    riskLevel.color === "red"
                      ? "bg-red-50 border border-red-100"
                      : riskLevel.color === "yellow"
                        ? "bg-yellow-50 border border-yellow-100"
                        : "bg-green-50 border border-green-100"
                  }
                `}
              >
                <p className="text-gray-800">{analysis.summary}</p>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Analysis */}
          <Tabs defaultValue="domain" className="w-full mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-6">
              <TabsTrigger value="domain">Domain</TabsTrigger>
              <TabsTrigger value="server">Server</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="traffic">Traffic</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="reputation">Reputation</TabsTrigger>
            </TabsList>

            {/* Domain Tab */}
            <TabsContent value="domain">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-500" />
                    Domain Information
                  </h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                          Registration Details
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">Domain Age:</span>
                            <span className="font-medium">
                              {analysis.domainInfo.domainAge}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Registration Date:
                            </span>
                            <span className="font-medium">
                              {analysis.domainInfo.domainRegistrationDate}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">Expiry Date:</span>
                            <span className="font-medium">
                              {analysis.domainInfo.domainExpiryDate}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">Registrar:</span>
                            <span className="font-medium">
                              {analysis.domainInfo.registrar}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                          Registrant Information
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Registrant Name:
                            </span>
                            <span className="font-medium">
                              {analysis.domainInfo.registrantName}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">Organization:</span>
                            <span className="font-medium">
                              {analysis.domainInfo.registrantOrganization}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">Country:</span>
                            <span className="font-medium">
                              {analysis.domainInfo.registrantCountry}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              WHOIS Privacy:
                            </span>
                            <span className="font-medium flex items-center">
                              {renderYesNo(analysis.domainInfo.hasWhoisPrivacy)}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              WHOIS History Changes:
                            </span>
                            <span className="font-medium">
                              {analysis.domainInfo.whoisHistoryChanges}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div
                      className={`p-4 rounded-lg ${analysis.domainInfo.domainAge.includes("0") ? "bg-red-50" : "bg-blue-50"}`}
                    >
                      <h4 className="font-medium mb-2">Domain Age Analysis</h4>
                      <p className="text-gray-700">
                        {analysis.domainInfo.domainAge.includes("0")
                          ? "This domain was registered very recently. New domains are more commonly associated with scams and phishing attempts."
                          : analysis.domainInfo.domainAge.includes("1")
                            ? "This domain is relatively new. While not necessarily suspicious, newer domains have less established reputation."
                            : "This domain has been registered for multiple years, which typically indicates an established website."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Server Tab */}
            <TabsContent value="server">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Server className="h-5 w-5 text-blue-500" />
                    Server & Technical Analysis
                  </h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                          Hosting Information
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Hosting Provider:
                            </span>
                            <span className="font-medium">
                              {analysis.serverInfo.hostingProvider}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">Server IP:</span>
                            <span className="font-medium">
                              {analysis.serverInfo.serverIP}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Server Location:
                            </span>
                            <span className="font-medium">
                              {analysis.serverInfo.serverLocation}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                          Security Configuration
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">Uses HTTPS:</span>
                            <span className="font-medium flex items-center">
                              {renderYesNo(analysis.serverInfo.useHttps)}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Valid SSL Certificate:
                            </span>
                            <span className="font-medium flex items-center">
                              {renderYesNo(
                                analysis.serverInfo.validSSLCertificate,
                              )}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">SSL Issuer:</span>
                            <span className="font-medium">
                              {analysis.serverInfo.sslIssuer}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Suspicious URL Characters:
                            </span>
                            <span className="font-medium flex items-center">
                              {renderYesNo(
                                analysis.serverInfo.suspiciousURLCharacters,
                              )}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Uses Subdomain:
                            </span>
                            <span className="font-medium flex items-center">
                              {renderYesNo(analysis.serverInfo.usesSubdomain)}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div
                      className={`p-4 rounded-lg ${!analysis.serverInfo.useHttps ? "bg-red-50" : !analysis.serverInfo.validSSLCertificate ? "bg-yellow-50" : "bg-green-50"}`}
                    >
                      <h4 className="font-medium mb-2">SSL/TLS Analysis</h4>
                      <p className="text-gray-700">
                        {!analysis.serverInfo.useHttps
                          ? "This website does not use HTTPS, making it insecure for transmitting sensitive information like passwords or payment details."
                          : !analysis.serverInfo.validSSLCertificate
                            ? "This website uses HTTPS but has an invalid or self-signed SSL certificate, which may indicate a security risk."
                            : "This website is properly secured with HTTPS and has a valid SSL certificate, which helps protect your data."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Content Tab */}
            <TabsContent value="content">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-500" />
                    Content Analysis
                  </h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                          Content Quality
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Design Quality:
                            </span>
                            <span className="font-medium">
                              {getStatusBadge(
                                analysis.contentAnalysis.designQuality,
                              )}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Grammar & Language:
                            </span>
                            <span className="font-medium">
                              {getStatusBadge(
                                analysis.contentAnalysis.grammarQuality,
                              )}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Content Plagiarism:
                            </span>
                            <span className="font-medium">
                              {getStatusBadge(
                                analysis.contentAnalysis.contentPlagiarism,
                              )}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Suspicious Outbound Links:
                            </span>
                            <span className="font-medium">
                              {analysis.contentAnalysis.suspiciousOutboundLinks}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                          Legal & Contact Information
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Contact Information:
                            </span>
                            <span className="font-medium flex items-center">
                              {renderYesNo(
                                analysis.contentAnalysis.hasContactInfo,
                              )}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Privacy Policy:
                            </span>
                            <span className="font-medium flex items-center">
                              {renderYesNo(
                                analysis.contentAnalysis.hasPrivacyPolicy,
                              )}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Terms of Service:
                            </span>
                            <span className="font-medium flex items-center">
                              {renderYesNo(
                                analysis.contentAnalysis.hasTermsOfService,
                              )}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Return/Refund Policy:
                            </span>
                            <span className="font-medium flex items-center">
                              {renderYesNo(
                                analysis.contentAnalysis.hasReturnPolicy,
                              )}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div
                      className={`p-4 rounded-lg ${!analysis.contentAnalysis.hasPrivacyPolicy || !analysis.contentAnalysis.hasTermsOfService ? "bg-red-50" : "bg-blue-50"}`}
                    >
                      <h4 className="font-medium mb-2">
                        Legal Documents Analysis
                      </h4>
                      <p className="text-gray-700">
                        {!analysis.contentAnalysis.hasPrivacyPolicy &&
                        !analysis.contentAnalysis.hasTermsOfService
                          ? "This website is missing essential legal documents (Privacy Policy and Terms of Service). Legitimate businesses typically have these pages."
                          : !analysis.contentAnalysis.hasPrivacyPolicy ||
                              !analysis.contentAnalysis.hasTermsOfService
                            ? "This website is missing some important legal documentation, which may be a concern for a legitimate business."
                            : "This website has proper legal documentation, which is typical of legitimate businesses."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Traffic Tab */}
            <TabsContent value="traffic">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-500" />
                    Traffic & Engagement Analysis
                  </h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                          Traffic Metrics
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">Alexa Rank:</span>
                            <span className="font-medium">
                              {analysis.trafficAnalysis.alexaRank}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Est. Monthly Visits:
                            </span>
                            <span className="font-medium">
                              {analysis.trafficAnalysis.estimatedMonthlyVisits}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">Bounce Rate:</span>
                            <span className="font-medium">
                              {analysis.trafficAnalysis.bounceRate}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Avg. Session Duration:
                            </span>
                            <span className="font-medium">
                              {analysis.trafficAnalysis.avgSessionDuration}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                          Traffic Sources
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-600">
                                Direct Traffic
                              </span>
                              <span className="text-sm font-medium">
                                {analysis.trafficAnalysis.trafficSources.direct}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{
                                  width:
                                    analysis.trafficAnalysis.trafficSources
                                      .direct,
                                }}
                              ></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-600">
                                Search Traffic
                              </span>
                              <span className="text-sm font-medium">
                                {analysis.trafficAnalysis.trafficSources.search}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{
                                  width:
                                    analysis.trafficAnalysis.trafficSources
                                      .search,
                                }}
                              ></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-600">
                                Referral Traffic
                              </span>
                              <span className="text-sm font-medium">
                                {
                                  analysis.trafficAnalysis.trafficSources
                                    .referrals
                                }
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-yellow-500 h-2 rounded-full"
                                style={{
                                  width:
                                    analysis.trafficAnalysis.trafficSources
                                      .referrals,
                                }}
                              ></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-600">
                                Social Traffic
                              </span>
                              <span className="text-sm font-medium">
                                {analysis.trafficAnalysis.trafficSources.social}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-purple-500 h-2 rounded-full"
                                style={{
                                  width:
                                    analysis.trafficAnalysis.trafficSources
                                      .social,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div
                      className={`p-4 rounded-lg ${analysis.trafficAnalysis.alexaRank === "Not ranked" ? "bg-yellow-50" : "bg-blue-50"}`}
                    >
                      <h4 className="font-medium mb-2">
                        Traffic Pattern Analysis
                      </h4>
                      <p className="text-gray-700">
                        {analysis.trafficAnalysis.alexaRank === "Not ranked"
                          ? "This website has very little traffic or is too new to be ranked. While not necessarily suspicious, established legitimate businesses typically have more traffic."
                          : analysis.trafficAnalysis.alexaRank > "1,000,000"
                            ? "This website has moderate traffic. Its traffic patterns are consistent with smaller but legitimate websites."
                            : "This website has significant traffic, which is typical of established, legitimate websites."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-500" />
                    Security Analysis
                  </h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                          Security Threats
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Malware Detected:
                            </span>
                            <span className="font-medium flex items-center">
                              {renderYesNo(
                                analysis.securityChecks.malwareDetected,
                              )}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Phishing Detected:
                            </span>
                            <span className="font-medium flex items-center">
                              {renderYesNo(
                                analysis.securityChecks.phishingDetected,
                              )}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Suspicious JavaScript:
                            </span>
                            <span className="font-medium flex items-center">
                              {renderYesNo(
                                analysis.securityChecks.suspiciousJavaScript,
                              )}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Blacklist Status:
                            </span>
                            <span className="font-medium">
                              {getStatusBadge(
                                analysis.securityChecks.blacklistStatus,
                              )}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                          Privacy Concerns
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Number of Trackers:
                            </span>
                            <span className="font-medium">
                              {analysis.securityChecks.excessiveTrackers >
                              10 ? (
                                <Badge variant="destructive">
                                  {analysis.securityChecks.excessiveTrackers}{" "}
                                  (Excessive)
                                </Badge>
                              ) : (
                                <Badge className="bg-green-500">
                                  {analysis.securityChecks.excessiveTrackers}{" "}
                                  (Normal)
                                </Badge>
                              )}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">Cookie Abuse:</span>
                            <span className="font-medium flex items-center">
                              {renderYesNo(analysis.securityChecks.cookieAbuse)}
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-medium text-gray-700 mb-2">
                          Security Recommendations
                        </h4>
                        <ul className="space-y-2 text-gray-700">
                          {analysis.securityChecks.malwareDetected && (
                            <li className="flex items-start gap-2">
                              <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                              <span>
                                Do not download any files from this website
                              </span>
                            </li>
                          )}
                          {analysis.securityChecks.phishingDetected && (
                            <li className="flex items-start gap-2">
                              <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                              <span>
                                Never enter personal or financial information on
                                this site
                              </span>
                            </li>
                          )}
                          {analysis.securityChecks.suspiciousJavaScript && (
                            <li className="flex items-start gap-2">
                              <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                              <span>
                                Consider using a script blocker when visiting
                                this site
                              </span>
                            </li>
                          )}
                          {analysis.securityChecks.excessiveTrackers > 10 && (
                            <li className="flex items-start gap-2">
                              <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                              <span>
                                Use a privacy-focused browser or extension when
                                visiting
                              </span>
                            </li>
                          )}
                          {!analysis.securityChecks.malwareDetected &&
                            !analysis.securityChecks.phishingDetected &&
                            !analysis.securityChecks.suspiciousJavaScript &&
                            analysis.securityChecks.excessiveTrackers <= 10 && (
                              <li className="flex items-start gap-2">
                                <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                <span>
                                  This website appears to be safe from major
                                  security threats
                                </span>
                              </li>
                            )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div
                      className={`p-4 rounded-lg ${analysis.securityChecks.malwareDetected || analysis.securityChecks.phishingDetected ? "bg-red-50" : analysis.securityChecks.suspiciousJavaScript ? "bg-yellow-50" : "bg-green-50"}`}
                    >
                      <h4 className="font-medium mb-2">Security Summary</h4>
                      <p className="text-gray-700">
                        {analysis.securityChecks.malwareDetected ||
                        analysis.securityChecks.phishingDetected
                          ? "This website has been flagged for serious security issues. We strongly advise against using or visiting this site."
                          : analysis.securityChecks.suspiciousJavaScript ||
                              analysis.securityChecks.excessiveTrackers > 10
                            ? "This website has some potential security or privacy concerns. Exercise caution when using this site."
                            : "This website appears to be free from major security threats and privacy concerns."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reputation Tab */}
            <TabsContent value="reputation">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5 text-blue-500" />
                    Reputation & Trust Analysis
                  </h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                          User Reviews
                        </h4>
                        <div className="mb-4">
                          <div className="flex items-center mb-2">
                            <div className="w-full bg-gray-200 rounded-full h-4 mr-2">
                              <div
                                className={`h-4 rounded-full ${analysis.reputation.userReviews.positive > 50 ? "bg-green-500" : "bg-red-500"}`}
                                style={{
                                  width: `${analysis.reputation.userReviews.positive}%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium w-16">
                              {analysis.reputation.userReviews.positive}%
                              Positive
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-4 mr-2">
                              <div
                                className="bg-red-500 h-4 rounded-full"
                                style={{
                                  width: `${analysis.reputation.userReviews.negative}%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium w-16">
                              {analysis.reputation.userReviews.negative}%
                              Negative
                            </span>
                          </div>
                        </div>

                        <ul className="space-y-3">
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Social Media Presence:
                            </span>
                            <span className="font-medium flex items-center">
                              {renderYesNo(
                                analysis.reputation.socialMediaPresence,
                              )}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Verified Business:
                            </span>
                            <span className="font-medium flex items-center">
                              {renderYesNo(
                                analysis.reputation.hasVerifiedBusiness,
                              )}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                          SEO Analysis
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Indexed in Google:
                            </span>
                            <span className="font-medium flex items-center">
                              {renderYesNo(
                                analysis.seoAnalysis.indexedInGoogle,
                              )}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Backlinks Count:
                            </span>
                            <span className="font-medium">
                              {analysis.seoAnalysis.backlinksCount}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Organic Keywords:
                            </span>
                            <span className="font-medium">
                              {analysis.seoAnalysis.organicKeywords}
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                          Payment Methods
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {analysis.reputation.acceptedPaymentMethods.map(
                            (method, index) => (
                              <Badge key={index} variant="outline">
                                {method}
                              </Badge>
                            ),
                          )}
                        </div>

                        {analysis.reputation.acceptedPaymentMethods.length ===
                          2 &&
                          analysis.reputation.acceptedPaymentMethods.includes(
                            "Cryptocurrency",
                          ) &&
                          analysis.reputation.acceptedPaymentMethods.includes(
                            "Wire Transfer",
                          ) && (
                            <div className="mt-3 text-sm text-yellow-600 flex items-start gap-1">
                              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                              <span>
                                Warning: Cryptocurrency and wire transfer only
                                payment methods are common in scams
                              </span>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div
                      className={`p-4 rounded-lg ${analysis.reputation.userReviews.positive < 30 ? "bg-red-50" : analysis.reputation.userReviews.positive < 70 ? "bg-yellow-50" : "bg-green-50"}`}
                    >
                      <h4 className="font-medium mb-2">Reputation Summary</h4>
                      <p className="text-gray-700">
                        {analysis.reputation.userReviews.positive < 30
                          ? "This website has very poor user reviews and reputation signals. It's advisable to avoid using this website."
                          : analysis.reputation.userReviews.positive < 70
                            ? "This website has mixed reviews and reputation. Exercise caution when using this website."
                            : "This website has positive user reviews and strong reputation signals, indicating it's likely trustworthy."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button className="bg-red-600 hover:bg-red-700">
              <Flag className="mr-2 h-4 w-4" />
              Report this Website
            </Button>
            <Button variant="outline">
              <ArrowRight className="mr-2 h-4 w-4" />
              Visit Website Anyway
            </Button>
            <Button variant="outline">
              <Search className="mr-2 h-4 w-4" />
              Check Another Website
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Results;
