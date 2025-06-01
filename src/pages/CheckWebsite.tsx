import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { ScamCheckerInput } from "@/components/scam-checker/ScamCheckerInput";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Clock,
  Shield,
  ExternalLink,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { getFirestore, collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { Link } from "react-router-dom";

const CheckWebsite = () => {
  const [recentChecks, setRecentChecks] = useState<any[]>([]);
  const [loadingRecent, setLoadingRecent] = useState(true);
  useEffect(() => {
    const fetchRecentChecks = async () => {
      try {
        const reportsRef = collection(db, "reports");
        const q = query(
          reportsRef,
          orderBy("timestamp", "desc"),
          limit(5)
        );

        const querySnapshot = await getDocs(q);
        const checks = querySnapshot.docs.map(doc => {
          const data = doc.data();
          console.log(data);
          return {
            id: doc.id,
            status: calculateStatus(data.riskScore),
            date: data.timestamp.toDate()
          };
        });
        console.log(checks);
        setRecentChecks(checks);
      } catch (error) {
        console.error("Error fetching recent checks:", error);
      } finally {
        setLoadingRecent(false);
      }
    };

    fetchRecentChecks();
  }, []);

  const calculateStatus = (riskScore: number) => {
    if (riskScore <= 30) return "safe";
    if (riskScore <= 70) return "questionable";
    return "scam";
  };
  const [searchResult, setSearchResult] = useState<null | {
    url: string;
    status: "safe" | "scam" | "questionable";
    score: number;
    details?: {
      domainAge?: string;
      country?: string;
      secureConnection?: boolean;
      blacklisted?: boolean;
      reportedCount?: number;
    };
  }>(null);

  const [isSearching, setIsSearching] = useState(false);

  const handleScamCheck = (value: string, type: string) => {
    if (!value) return;

    setIsSearching(true);
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "safe":
        return {
          icon: <CheckCircle className="h-8 w-8 text-green-500" />,
          color: "bg-green-500",
          text: "Safe",
          description:
            "This website appears to be legitimate and safe to use based on our analysis.",
        };
      case "scam":
        return {
          icon: <AlertTriangle className="h-8 w-8 text-red-500" />,
          color: "bg-red-500",
          text: "Scam Detected",
          description:
            "This website has been identified as potentially fraudulent. We recommend avoiding it.",
        };
      case "questionable":
        return {
          icon: <AlertCircle className="h-8 w-8 text-yellow-500" />,
          color: "bg-yellow-500",
          text: "Questionable",
          description:
            "Some suspicious elements were detected. Proceed with caution if you decide to use this website.",
        };
      default:
        return {
          icon: <AlertCircle className="h-8 w-8 text-gray-500" />,
          color: "bg-gray-500",
          text: "Unknown",
          description:
            "We don't have enough information about this website yet.",
        };
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        <PageHeader
          title="Check Website Safety"
          description="Analyze any website, phone number, email, or crypto address before you trust it"
        />

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Check Area */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 text-center">
                    Enter a website to check for scams
                  </h2>
                  <ScamCheckerInput onCheck={handleScamCheck} />
                </CardContent>
              </Card>

              {isSearching && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Clock className="h-12 w-12 text-blue-500 mx-auto mb-4 animate-pulse" />
                    <h3 className="text-xl font-bold mb-2">
                      Analyzing Website
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Please wait while we check multiple data sources...
                    </p>
                    <Progress value={65} className="max-w-md mx-auto" />
                  </CardContent>
                </Card>
              )}

              {searchResult && !isSearching && (
                <Card>
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                      <div className="flex items-center gap-3 mb-4 md:mb-0">
                        {getStatusInfo(searchResult.status).icon}
                        <div>
                          <h3 className="text-xl font-bold">
                            {searchResult.url}
                          </h3>
                          <p className="text-gray-600">Checked just now</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="relative w-20 h-20 rounded-full flex items-center justify-center border-4 border-gray-100">
                          <div className="text-2xl font-bold">
                            {searchResult.score}
                          </div>
                          <svg
                            className="absolute top-0 left-0 w-full h-full"
                            viewBox="0 0 100 100"
                          >
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="#f3f4f6"
                              strokeWidth="8"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke={
                                searchResult.status === "safe"
                                  ? "#22c55e"
                                  : searchResult.status === "questionable"
                                    ? "#eab308"
                                    : "#ef4444"
                              }
                              strokeWidth="8"
                              strokeDasharray="282.7"
                              strokeDashoffset={
                                282.7 - (282.7 * searchResult.score) / 100
                              }
                              strokeLinecap="round"
                              transform="rotate(-90 50 50)"
                            />
                          </svg>
                        </div>
                        <p className="mt-2 font-medium text-gray-700">
                          Trust Score
                        </p>
                      </div>
                    </div>

                    <div
                      className="p-4 mb-6 rounded-lg bg-opacity-10"
                      style={{
                        backgroundColor:
                          searchResult.status === "safe"
                            ? "rgba(34, 197, 94, 0.1)"
                            : searchResult.status === "questionable"
                              ? "rgba(234, 179, 8, 0.1)"
                              : "rgba(239, 68, 68, 0.1)",
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <Shield
                          className="h-5 w-5 shrink-0 mt-0.5"
                          style={{
                            color:
                              searchResult.status === "safe"
                                ? "#22c55e"
                                : searchResult.status === "questionable"
                                  ? "#eab308"
                                  : "#ef4444",
                          }}
                        />
                        <p className="text-gray-700">
                          <span className="font-medium">
                            {getStatusInfo(searchResult.status).text}:{" "}
                          </span>
                          {getStatusInfo(searchResult.status).description}
                        </p>
                      </div>
                    </div>

                    {searchResult.details && (
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3">Website Details</h4>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex justify-between">
                              <span>Domain Age:</span>
                              <span className="font-medium">
                                {searchResult.details.domainAge}
                              </span>
                            </li>
                            <li className="flex justify-between">
                              <span>Server Location:</span>
                              <span className="font-medium">
                                {searchResult.details.country}
                              </span>
                            </li>
                            <li className="flex justify-between">
                              <span>Secure Connection:</span>
                              <span
                                className={`font-medium ${searchResult.details.secureConnection ? "text-green-600" : "text-red-600"}`}
                              >
                                {searchResult.details.secureConnection
                                  ? "Yes"
                                  : "No"}
                              </span>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">
                            Community Feedback
                          </h4>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex justify-between">
                              <span>Blacklisted:</span>
                              <span
                                className={`font-medium ${searchResult.details.blacklisted ? "text-red-600" : "text-green-600"}`}
                              >
                                {searchResult.details.blacklisted
                                  ? "Yes"
                                  : "No"}
                              </span>
                            </li>
                            <li className="flex justify-between">
                              <span>Times Reported:</span>
                              <span className="font-medium">
                                {searchResult.details.reportedCount}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3 mt-6">
                      <Button className="bg-red-600 hover:bg-red-700">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Full Report
                      </Button>
                      <Button variant="outline">Report as Scam</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Checks</h3>
                    <div className="space-y-4">
                      {loadingRecent ? (
                        <div className="text-center py-4">
                          <Clock className="h-6 w-6 text-blue-500 mx-auto animate-pulse" />
                          <p className="text-gray-600 mt-2">Loading recent checks...</p>
                        </div>
                      ) : recentChecks.length > 0 ? (
                        recentChecks.map((check) => (
                          <Link
                            to={`/results?url=${encodeURIComponent(check.id)}`}
                            key={check.id}
                            className="block hover:bg-gray-50 rounded -mx-2 px-2 py-1 transition-colors"
                          >
                            <div className="flex items-center justify-between border-b last:border-0 pb-2 last:pb-0">
                              <div className="flex items-center gap-2">
                                {check.status === "safe" ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : check.status === "scam" ? (
                                  <AlertTriangle className="h-4 w-4 text-red-500" />
                                ) : (
                                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                                )}
                                <span className="font-medium">{check.id}</span>
                              </div>
                              <span className="text-sm text-gray-500">
                                {check.date.toLocaleDateString(undefined, {
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <p className="text-gray-500 py-2 text-center">No recent checks found</p>
                      )}
                    </div>
                  </CardContent>
                </Card>


                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Why Check Websites?
                    </h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span>Avoid falling victim to phishing attempts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span>
                          Protect your personal and financial information
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span>Shop with confidence on legitimate websites</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span>Help others by reporting scams you encounter</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckWebsite;
