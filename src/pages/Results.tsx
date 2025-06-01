import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
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
  Info,
  Mail,
  Code,
  Link,
  HardDrive,
  MapPin,
  Fingerprint,
  Database,
  Image,
  List,
  Star,
  Shield,
  ListOrdered,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/firebase";
import { doc, getDoc, setDoc, serverTimestamp, Timestamp } from "firebase/firestore"; 

const PROGRESS_STEPS = [
  { progress: 5, message: "🧠 Initializing AI model..." },
  { progress: 10, message: "🔍 Starting analysis..." },
  { progress: 20, message: "📋 Gathering WHOIS information..." },
  { progress: 30, message: "✅ WHOIS information collected" },
  { progress: 40, message: "🔗 Gathering DNS records..." },
  { progress: 50, message: "✅ DNS records analyzed" },
  { progress: 60, message: "🌍 Determining geolocation..." },
  { progress: 70, message: "✅ Geolocation determined" },
  { progress: 75, message: "🔒 Scanning for open ports..." },
  { progress: 80, message: "✅ Port scan completed" },
  { progress: 85, message: "🔐 Analyzing SSL certificate..." },
  { progress: 90, message: "✅ SSL certificate verified" },
  { progress: 92, message: "🌐 Gathering HTTP information..." },
  { progress: 94, message: "✅ HTTP headers analyzed" },
  { progress: 95, message: "🤖 Feeding data to AI model..." }, 
  { progress: 96, message: "🛠️ Detecting website technologies..." },
  { progress: 98, message: "✅ Technologies identified" },
  { progress: 99, message: "🧮 Calculating risk score..." },
];


const Results = () => {
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url") || "";
  const analysisType = searchParams.get("analysisType") || 'basic';
  const [isLoading, setIsLoading] = useState(true);
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [progressMessages, setProgressMessages] = useState<string[]>([]);
  const [BarProgress, setBarProgress] = useState(0);
  const progressIntervalRef = useRef<number | null>(null);
  const stepIndexRef = useRef(0);
  let scoreColor = "";
  let scoreText = "";

  if (analysis) {
    if (analysis.riskScore <= 20) {
      scoreColor = "green";
      scoreText = "Very Low Risk";
    } else if (analysis.riskScore <= 40) {
      scoreColor = "green";
      scoreText = "Low Risk";
    } else if (analysis.riskScore <= 60) {
      scoreColor = "orange";
      scoreText = "Moderate Risk";
    } else if (analysis.riskScore <= 80) {
      scoreColor = "red";
      scoreText = "High Risk";
    } else {
      scoreColor = "red";
      scoreText = "Very High Risk";
    }
  }
  useEffect(() => {
    const fetchAnalysisData = async () => {
      setIsLoading(true);
      setError(null);
      setProgressMessages([]);
      setBarProgress(0);
      stepIndexRef.current = 0;

      const normalizeUrl = (url: string) => {
        return url
          .replace(/^https?:\/\//, '')
          .replace(/^www\./, '')
          .replace(/\/$/, '')
          .split('/')[0]; 
      };

      const docId = normalizeUrl(url);
      const reportRef = doc(db, "reports", docId);

      let useCache = false; 

      if (analysisType === 'basic') {
        try {
          const docSnap = await getDoc(reportRef);
          const now = new Date();
          const maxReportAge = 24 * 60 * 60 * 1000; 

          if (docSnap.exists()) {
            const reportData = docSnap.data();
            let reportDate: Date;

            if (reportData.timestamp instanceof Timestamp) {
              reportDate = reportData.timestamp.toDate();
            } else if (typeof reportData.timestamp === 'string') {
              reportDate = new Date(reportData.timestamp);
            } else {
              console.warn("Unexpected timestamp format in cache:", reportData.timestamp);
              reportDate = new Date();
            }

            const reportAge = now.getTime() - reportDate.getTime();

            if (reportAge < maxReportAge) {
              setAnalysis(reportData.data);
              setProgressMessages([
                "✅ Found recent report in cache",
                "✅ Analysis complete! Generating report"
              ]);
              setBarProgress(100);
              useCache = true; 
            }
          }
        } catch (cacheError: any) {
          console.error("Error checking cache:", cacheError);
        }
      }

      if (useCache) {
        setTimeout(() => setIsLoading(false), 500);
        return;
      }

      progressIntervalRef.current = window.setInterval(() => {
        if (stepIndexRef.current < PROGRESS_STEPS.length) {
          const step = PROGRESS_STEPS[stepIndexRef.current];
          setBarProgress(step.progress);
          setProgressMessages(prev => [...prev, step.message]);
          stepIndexRef.current++;
        } else {
          setBarProgress(prev => Math.min(prev + 0.5, 99));
        }
      }, 1200);

      try {
        const response = await fetch("http://localhost:8000/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: url, analysis_type: analysisType }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setAnalysis(data);

        setProgressMessages(prev => [...prev, "✅ Analysis complete! Generating report"]);
        setBarProgress(100);

        await setDoc(reportRef, {
          data: data,
          timestamp: serverTimestamp()
        });
      } catch (e: any) {
        console.error("Error fetching analysis:", e);
        setError(e.message || "Failed to fetch analysis data.");
        setProgressMessages(prev => [...prev, `❌ Error: ${e.message || "Analysis failed"}`]);
      } finally {
        setTimeout(() => {
          if (progressIntervalRef.current !== null) {
            clearInterval(progressIntervalRef.current);
          }
          setIsLoading(false);
        }, 800);
      }
    };

    fetchAnalysisData();

    return () => {
      if (progressIntervalRef.current !== null) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [url, analysisType]);


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

  const renderYesNo = (value: boolean) => {
    return value ? (
      <Check className="h-5 w-5 text-green-500" />
    ) : (
      <X className="h-5 w-5 text-red-500" />
    );
  };

  const renderList = (items: string[] | string | null | undefined) => {
    if (!items || (Array.isArray(items) && items.length === 0) || items === "None detected") {
      return <span className="text-gray-500 italic">N/A</span>;
    }
    if (Array.isArray(items)) {
      return (
        <ul className="list-disc list-inside space-y-1 text-sm">
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
    }
    return <span className="font-medium">{items}</span>;
  };

  const parseWhoisDate = (dateString: string | string[] | null | undefined): Date | null => {
    if (!dateString) return null;

    let cleanedDateString: string;
    if (Array.isArray(dateString)) {
      cleanedDateString = dateString[0];
    } else {
      cleanedDateString = dateString;
    }

    const match = cleanedDateString.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
    if (match) {
      cleanedDateString = match[0];
    }

    try {
      const date = new Date(cleanedDateString);
      if (!isNaN(date.getTime())) {
        return date;
      }
    } catch (e) {
      console.error("Error parsing date:", cleanedDateString, e);
    }
    return null;
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
                  level of this website. This typically takes{" "}
                  {analysisType === 'basic' ? (
                    <span>2-3 Minutes.</span>
                  ) : (
                    <span>5-10 Minutes</span>
                  )}
                </p>

                {/* Progress Bar */}
                <Progress value={BarProgress} className="w-full max-w-md mb-8" />
                <div className="text-gray-600 mb-6">
                  {Math.round(BarProgress)}% complete
                </div>

                {/* Progress Messages Section */}
                <div className="w-full max-w-md">
                  <h4 className="font-medium mb-3 flex items-center">
                    <ListOrdered className="h-5 w-5 mr-2 text-blue-500" />
                    Progress Log
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto">
                    {progressMessages.length > 0 ? (
                      <ul className="space-y-2">
                        {progressMessages.map((msg, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-gray-500">{idx + 1}.</span>
                            <span>{msg}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 italic">Initializing analysis...</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !analysis) {
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
              {error || "We encountered an error while trying to analyze this website. Please try again or check a different URL."}
            </p>

            {/* Show progress log */}
            <div className="mt-8 max-w-md mx-auto text-left">
              <h3 className="font-medium mb-3 flex items-center">
                <ListOrdered className="h-5 w-5 mr-2 text-blue-500" />
                Progress Log
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto">
                {progressMessages.length > 0 ? (
                  <ul className="space-y-2">
                    {progressMessages.map((msg, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-gray-500">{idx + 1}.</span>
                        <span>{msg}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">No progress messages recorded</p>
                )}
              </div>
            </div>

            <Button asChild className="bg-red-600 hover:bg-red-700 mt-8">
              <a href="/">Back to Home</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const riskLevel = getRiskLevel(analysis.riskScore);

  const summaryText =
    analysis.riskScore > 65
      ? "High risk detected! This website shows multiple warning signs of a potential scam."
      : analysis.riskScore > 30
        ? "Medium risk detected. Exercise caution when interacting with this website."
        : "Low risk detected. This website appears to be legitimate based on our analysis.";

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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        <PageHeader
          title="Website Analysis Results"
          description={`Comprehensive information for ${analysis.requested_url}`}
        />

        <div className="container mx-auto px-4 py-8">
          {/* Risk Score Summary */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                  {getRiskIcon(analysis.riskScore)}
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{analysis.requested_url}</h2>
                    <Badge
                      className={`
                        text-white
                        ${riskLevel.color === "red"
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
                  ${riskLevel.color === "red"
                    ? "bg-red-50 border border-red-100"
                    : riskLevel.color === "yellow"
                      ? "bg-yellow-50 border border-yellow-100"
                      : "bg-green-50 border border-green-100"
                  }
                `}
              >
                <p className="text-gray-800">{summaryText}</p>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center justify-center">
                  <ShieldAlert className="inline-block h-6 w-6 mr-2 text-red-500" />
                  Risk Score
                </h3>
                <Progress value={analysis.riskScore} className="w-full h-4" />
                <p className="text-center text-lg mt-2 font-bold" style={{ color: scoreColor }}>
                  {analysis.riskScore}% {scoreText}
                </p>

                {analysis.model_prediction && (
                  <div className="mt-6 text-center">
                    <h4 className="text-lg font-semibold mb-2 flex items-center justify-center">
                      <Fingerprint className="inline-block h-5 w-5 mr-1 text-purple-500" />
                      AI Model Prediction
                    </h4>
                    <p className="text-md mb-1">
                      The AI model classified this URL as:{" "}
                      <Badge
                        className={`font-semibold ${analysis.model_prediction === '1' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}
                      >
                        {analysis.model_prediction === '1' ? "MALICIOUS" : "BENIGN"}
                      </Badge>
                    </p>
                    {analysis.model_probabilities && (
                      <p className="text-sm text-gray-600">
                        Confidence:{" "}
                        {Object.entries(analysis.model_probabilities).map(([label, prob]) => (
                          <span key={label} className="mr-2">
                            {label === '1' ? 'Malicious' : 'Benign'}: {(parseFloat(prob as string) * 100).toFixed(2)}%
                          </span>
                        ))}
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-4 text-center text-sm text-gray-500 max-w-xl mx-auto">
                  <p>
                    <AlertTriangle className="inline-block h-4 w-4 mr-1 text-yellow-500" />
                    Please note: The AI model provides a prediction based on learned patterns and may not always be accurate.
                    This is a tool to assist in assessing risk, and human judgment is always advised.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="w-full mb-8">

            <TabsList className="flex flex-nowrap overflow-x-auto justify-start md:justify-center mb-6">
              <TabsTrigger value="overview" className="flex-shrink-0">Overview</TabsTrigger>
              <TabsTrigger value="whois" className="flex-shrink-0">WHOIS</TabsTrigger>
              <TabsTrigger value="dns" className="flex-shrink-0">DNS</TabsTrigger>
              <TabsTrigger value="http" className="flex-shrink-0">HTTP</TabsTrigger>
              <TabsTrigger value="ssl" className="flex-shrink-0">SSL</TabsTrigger>
              <TabsTrigger value="geolocation" className="flex-shrink-0">Geolocation</TabsTrigger>
              <TabsTrigger value="ports" className="flex-shrink-0">Ports</TabsTrigger>
              <TabsTrigger value="tech" className="flex-shrink-0">Tech</TabsTrigger>
              <TabsTrigger value="robots" className="flex-shrink-0">Robots.txt</TabsTrigger>
              <TabsTrigger value="crawl" className="flex-shrink-0">Crawled Pages</TabsTrigger>
              <TabsTrigger value="domain" className="flex-shrink-0">Domain</TabsTrigger>
              <TabsTrigger value="server" className="flex-shrink-0">Server</TabsTrigger>
              <TabsTrigger value="content" className="flex-shrink-0">Content</TabsTrigger>
              <TabsTrigger value="traffic" className="flex-shrink-0">Traffic</TabsTrigger>
              <TabsTrigger value="security" className="flex-shrink-0">Security</TabsTrigger>
              <TabsTrigger value="reputation" className="flex-shrink-0">Reputation</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-500" />
                    General Overview
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Basic Information</h4>
                        <ul className="space-y-3">
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">Requested URL:</span>
                            <a href={analysis.requested_url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline break-all">
                              {analysis.requested_url} <ExternalLink className="inline h-4 w-4 ml-1" />
                            </a>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">Domain Name:</span>
                            <span className="font-medium">{analysis.domain_name || "N/A"}</span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">Total Estimated Unique Pages:</span>
                            <span className="font-medium">{analysis.total_estimated_unique_pages || "N/A"}</span>
                          </li>
                          {analysis.favicon_url && (
                            <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                              <span className="text-gray-600">Favicon:</span>
                              <img src={analysis.favicon_url} alt="Favicon" className="h-6 w-6 rounded-sm" onError={(e) => { e.currentTarget.src = 'https://placehold.co/24x24/cccccc/ffffff?text=X'; }} />
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">HTTP & SSL Status</h4>
                        <ul className="space-y-3">
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">Main Page Status Code:</span>
                            <Badge className={analysis.http_info?.status_code === 200 ? "bg-green-500" : "bg-red-500"}>
                              {analysis.http_info?.status_code || "N/A"}
                            </Badge>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">Final URL:</span>
                            <span className="font-medium break-all">{analysis.http_info?.final_url || "N/A"}</span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">Uses HTTPS:</span>
                            <span className="font-medium">
                              {renderYesNo(analysis.ssl_info && !analysis.ssl_info.error)}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">Valid SSL Certificate:</span>
                            <span className="font-medium">
                              {renderYesNo(analysis.ssl_info && !analysis.ssl_info.error && analysis.ssl_info.not_after && new Date(analysis.ssl_info.not_after) > new Date())}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="whois">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-500" />
                    WHOIS Information
                  </h3>
                  {analysis.whois_info?.error ? (
                    <p className="text-red-500">{analysis.whois_info.error}</p>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Registration Details</h4>
                          <ul className="space-y-3">
                            <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                              <span className="text-gray-600">Registrar:</span>
                              <span className="font-medium">{analysis.whois_info?.registrar || "N/A"}</span>
                            </li>
                            <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                              <span className="text-gray-600">Creation Date:</span>
                              <span className="font-medium">{parseWhoisDate(analysis.whois_info?.creation_date)?.toLocaleDateString() || "N/A"}</span>
                            </li>
                            <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                              <span className="text-gray-600">Expiration Date:</span>
                              <span className="font-medium">{parseWhoisDate(analysis.whois_info?.expiration_date)?.toLocaleDateString() || "N/A"}</span>
                            </li>
                            <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                              <span className="text-gray-600">Updated Date:</span>
                              <span className="font-medium">{parseWhoisDate(analysis.whois_info?.updated_date)?.toLocaleDateString() || "N/A"}</span>
                            </li>
                            <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                              <span className="text-gray-600">Status:</span>
                              {/* WHOIS Status with details/summary */}
                              {analysis.whois_info?.status && (Array.isArray(analysis.whois_info.status) && analysis.whois_info.status.length > 1) ? (
                                <details className="inline-block">
                                  <summary className="cursor-pointer text-blue-600 hover:underline">
                                    View Status ({analysis.whois_info.status.length})
                                  </summary>
                                  {renderList(analysis.whois_info.status)}
                                </details>
                              ) : (
                                <span className="font-medium">{renderList(analysis.whois_info?.status) || "N/A"}</span>
                              )}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Registrant Contact</h4>
                          <ul className="space-y-3">
                            <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                              <span className="text-gray-600">Name:</span>
                              <span className="font-medium">{analysis.whois_info?.name || "N/A"}</span>
                            </li>
                            <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                              <span className="text-gray-600">Organization:</span>
                              <span className="font-medium">{analysis.whois_info?.org || "N/A"}</span>
                            </li>
                            <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                              <span className="text-gray-600">Country:</span>
                              <span className="font-medium">{analysis.whois_info?.country || "N/A"}</span>
                            </li>
                            <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                              <span className="text-gray-600">Email:</span>
                              {renderList(analysis.whois_info?.emails)}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dns">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Server className="h-5 w-5 text-blue-500" />
                    DNS Information
                  </h3>
                  {analysis.dns_info?.error ? (
                    <p className="text-red-500">{analysis.dns_info.error}</p>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                      {Object.entries(analysis.dns_info || {}).map(([type, records]) => (
                        <div key={type}>
                          <h4 className="font-medium text-gray-700 mb-2">{type} Records</h4>
                          {records && (records as string[] | string).length > 1 ? ( 
                            <details className="inline-block">
                              <summary className="cursor-pointer text-blue-600 hover:underline">
                                View {type} Records ({Array.isArray(records) ? records.length : 1}) 
                              </summary>
                              {renderList(records as string[] | string)} 
                            </details>
                          ) : (
                            renderList(records as string[] | string) 
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="http">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-500" />
                    HTTP Information
                  </h3>
                  {analysis.http_info?.error ? (
                    <p className="text-red-500">{analysis.http_info.error}</p>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">General</h4>
                          <ul className="space-y-3">
                            <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                              <span className="text-gray-600">Status Code:</span>
                              <span className="font-medium">{analysis.http_info?.status_code || "N/A"}</span>
                            </li>
                            <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                              <span className="text-gray-600">Final URL:</span>
                              <span className="font-medium break-all">{analysis.http_info?.final_url || "N/A"}</span>
                            </li>
                            <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                              <span className="text-gray-600">Content Type:</span>
                              <span className="font-medium">{analysis.http_info?.content_type || "N/A"}</span>
                            </li>
                            <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                              <span className="text-gray-600">Content Length:</span>
                              <span className="font-medium">{analysis.http_info?.content_length || "N/A"}</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Redirect History</h4>
                          {analysis.http_info?.redirect_history && analysis.http_info.redirect_history.length > 0 ? (
                            <ul className="space-y-2 text-sm">
                              {analysis.http_info.redirect_history.map((redirect: any, idx: number) => (
                                <li key={idx} className="pb-1 border-b border-gray-100">
                                  <span className="font-medium">{redirect.status_code}</span> - {redirect.url}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-500 italic">No redirects</p>
                          )}
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Security Headers</h4>
                          {Object.keys(analysis.http_info?.security_headers || {}).length > 0 ? (
                            <ul className="space-y-3">
                              {Object.entries(analysis.http_info.security_headers).map(([header, value]: [string, any]) => (
                                <li key={header} className="flex justify-between items-center pb-1 border-b border-gray-100">
                                  <span className="text-gray-600">{header}:</span>
                                  <span className="font-medium break-all">{String(value)}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-500 italic">No specific security headers detected.</p>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Cookies ({analysis.http_info?.cookies?.length || 0})</h4>
                          {/* Cookies with details/summary */}
                          {analysis.http_info?.cookies && analysis.http_info.cookies.length > 0 ? (
                            <details className="inline-block">
                              <summary className="cursor-pointer text-blue-600 hover:underline">
                                View Cookies ({analysis.http_info.cookies.length})
                              </summary>
                              <ul className="space-y-2 text-sm mt-2">
                                {analysis.http_info.cookies.map((cookie: any, idx: number) => (
                                  <li key={idx} className="pb-1 border-b border-gray-100">
                                    <span className="font-medium">{cookie.name}</span>: {cookie.value} (Domain: {cookie.domain}, Secure: {renderYesNo(cookie.secure)})
                                  </li>
                                ))}
                              </ul>
                            </details>
                          ) : (
                            <p className="text-gray-500 italic">No cookies detected.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ssl">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Lock className="h-5 w-5 text-blue-500" />
                    SSL/TLS Certificate Information
                  </h3>
                  {analysis.ssl_info?.error ? (
                    <p className="text-red-500">{analysis.ssl_info.error}</p>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Certificate Details</h4>
                          <ul className="space-y-3">
                            <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                              <span className="text-gray-600">Issuer CN:</span>
                              <span className="font-medium">{analysis.ssl_info?.issuer?.CN || "N/A"}</span>
                            </li>
                            <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                              <span className="text-gray-600">Subject CN:</span>
                              <span className="font-medium">{analysis.ssl_info?.subject?.CN || "N/A"}</span>
                            </li>
                            <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                              <span className="text-gray-600">Not Before:</span>
                              <span className="font-medium">{analysis.ssl_info?.not_before || "N/A"}</span>
                            </li>
                            <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                              <span className="text-gray-600">Not After:</span>
                              <span className="font-medium">{analysis.ssl_info?.not_after || "N/A"}</span>
                            </li>
                            <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                              <span className="text-gray-600">Signature Algorithm:</span>
                              <span className="font-medium">{analysis.ssl_info?.signature_algorithm || "N/A"}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Subject Alternative Names (SANs)</h4>
                          {/* SANs with details/summary */}
                          {analysis.ssl_info?.subject_alt_names && analysis.ssl_info.subject_alt_names.length > 1 ? (
                            <details className="inline-block">
                              <summary className="cursor-pointer text-blue-600 hover:underline">
                                View SANs ({analysis.ssl_info.subject_alt_names.length})
                              </summary>
                              {renderList(analysis.ssl_info.subject_alt_names)}
                            </details>
                          ) : (
                            renderList(analysis.ssl_info?.subject_alt_names)
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="geolocation">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    IP Geolocation
                  </h3>
                  {analysis.ip_geolocation?.error || analysis.ip_geolocation?.info ? (
                    <p className="text-red-500">{analysis.ip_geolocation.error || analysis.ip_geolocation.info}</p>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Location Details</h4>
                          <ul className="space-y-3">
                            <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                              <span className="text-gray-600">IP Address:</span>
                              <span className="font-medium">{analysis.ip_geolocation?.query || "N/A"}</span>
                            </li>
                            <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                              <span className="text-gray-600">Country:</span>
                              <span className="font-medium">{analysis.ip_geolocation?.country || "N/A"} ({analysis.ip_geolocation?.countryCode || "N/A"})</span>
                            </li>
                            <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                              <span className="text-gray-600">Region:</span>
                              <span className="font-medium">{analysis.ip_geolocation?.regionName || "N/A"} ({analysis.ip_geolocation?.region || "N/A"})</span>
                            </li>
                            <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                              <span className="text-gray-600">City:</span>
                              <span className="font-medium">{analysis.ip_geolocation?.city || "N/A"}</span>
                            </li>
                            <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                              <span className="text-gray-600">Timezone:</span>
                              <span className="font-medium">{analysis.ip_geolocation?.timezone || "N/A"}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Network Details</h4>
                          <ul className="space-y-3">
                            <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                              <span className="text-gray-600">ISP:</span>
                              <span className="font-medium">{analysis.ip_geolocation?.isp || "N/A"}</span>
                            </li>
                            <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                              <span className="text-gray-600">Organization:</span>
                              <span className="font-medium">{analysis.ip_geolocation?.org || "N/A"}</span>
                            </li>
                            <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                              <span className="text-gray-600">AS:</span>
                              <span className="font-medium">{analysis.ip_geolocation?.as || "N/A"}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ports">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <HardDrive className="h-5 w-5 text-blue-500" />
                    Common Port Scan Results
                  </h3>
                  {analysis.port_scan_results?.error ? (
                    <p className="text-red-500">{analysis.port_scan_results.error}</p>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Open Ports</h4>
                        {analysis.port_scan_results?.open_ports && analysis.port_scan_results.open_ports.length > 0 ? (
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            {analysis.port_scan_results.open_ports.map((port: number) => (
                              <li key={port} className="text-green-600">Port {port} is OPEN</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-500 italic">No common open ports detected.</p>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Closed Ports</h4>
                        {analysis.port_scan_results?.closed_ports && analysis.port_scan_results.closed_ports.length > 0 ? (
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            {analysis.port_scan_results.closed_ports.map((port: number) => (
                              <li key={port} className="text-red-600">Port {port} is CLOSED</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-500 italic">All common ports are open (unlikely) or no ports checked.</p>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tech">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Fingerprint className="h-5 w-5 text-blue-500" />
                    Website Technologies
                  </h3>
                  {analysis.technologies?.error ? (
                    <p className="text-red-500">{analysis.technologies.error}</p>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Server & CMS</h4>
                        <ul className="space-y-3">
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">Web Server:</span>
                            <span className="font-medium">{analysis.technologies?.web_server || "N/A"}</span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">CMS:</span>
                            <span className="font-medium">{analysis.technologies?.cms || "N/A"}</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Front-end & Analytics</h4>
                        <ul className="space-y-3">
                          <li className="flex justify-between items-start pb-1 border-b border-gray-100">
                            <span className="text-gray-600">JS Frameworks:</span>
                            {renderList(analysis.technologies?.javascript_frameworks)}
                          </li>
                          <li className="flex justify-between items-start pb-1 border-b border-gray-100">
                            <span className="text-gray-600">Analytics Platforms:</span>
                            {renderList(analysis.technologies?.analytics_platforms)}
                          </li>
                          <li className="flex justify-between items-start pb-1 border-b border-gray-100">
                            <span className="text-gray-600">CDNs:</span>
                            {renderList(analysis.technologies?.cdns)}
                          </li>
                          <li className="flex justify-between items-start pb-1 border-b border-gray-100">
                            <span className="text-gray-600">Other Detected:</span>
                            {renderList(analysis.technologies?.other)}
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="robots">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <List className="h-5 w-5 text-blue-500" />
                    Robots.txt Information
                  </h3>
                  {analysis.robots_txt?.error ? (
                    <p className="text-red-500">{analysis.robots_txt.error}</p>
                  ) : analysis.robots_txt?.info ? (
                    <p className="text-gray-500 italic">{analysis.robots_txt.info}</p>
                  ) : (
                    <div className="space-y-6">
                      {Object.entries(analysis.robots_txt || {}).map(([ua, data]: [string, any]) => (
                        <details key={ua} className="border rounded-lg p-3 bg-gray-50">
                          <summary className="cursor-pointer font-semibold text-gray-700 hover:text-gray-900">
                            User-Agent: {ua}
                          </summary>
                          <div className="mt-2 space-y-2 text-sm">
                            <div className="flex justify-between items-start">
                              <span className="text-gray-600">Allow Rules:</span>
                              {renderList(data.allow)}
                            </div>
                            <div className="flex justify-between items-start">
                              <span className="text-gray-600">Disallow Rules:</span>
                              {renderList(data.disallow)}
                            </div>
                            <div className="flex justify-between items-start">
                              <span className="text-gray-600">Sitemaps:</span>
                              {renderList(data.sitemaps)}
                            </div>
                            <div className="flex justify-between items-start">
                              <span className="text-gray-600">Crawl Delay:</span>
                              <span className="font-medium">{data.crawl_delay !== null ? `${data.crawl_delay}s` : "N/A"}</span>
                            </div>
                          </div>
                        </details>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>


            <TabsContent value="crawl">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-500" />
                    Crawled Pages Details
                  </h3>
                  {analysis.crawled_page_count === 0 ? (
                    <p className="text-gray-500 italic">No internal pages crawled successfully.</p>
                  ) : (
                    <div className="space-y-6">
                      <p className="text-gray-700">Total unique internal pages crawled: <span className="font-bold">{analysis.crawled_page_count || 0}</span></p>
                      <p className="text-gray-700">Specific Page Types Found:</p>
                      <ul className="list-disc list-inside space-y-1 mb-4">
                        {Object.entries(analysis.specific_page_types_found || {}).map(([type, urls]: [string, any]) => (
                          <li key={type}>
                            <span className="font-medium capitalize">{type.replace(/_/g, ' ')} ({urls.length}):</span>
                            {urls && urls.length > 0 ? (
                              <ul className="list-circle list-inside ml-4 text-sm">
                                {urls.map((url: string, idx: number) => (
                                  <li key={idx} className="break-all"><a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{url}</a></li>
                                ))}
                              </ul>
                            ) : <span className="italic text-gray-500"> None</span>}
                          </li>
                        ))}
                      </ul>

                      <p className="text-gray-700">Detected Payment Methods Keywords: {renderList(analysis.detected_payment_methods_keywords)}</p>

                      <details className="mt-6 border rounded-lg p-3 bg-gray-50">
                        <summary className="cursor-pointer text-lg font-semibold text-gray-700 hover:text-gray-900 flex items-center">
                          Individual Page Details
                        </summary>
                        <div className="mt-2 space-y-6">
                          {Object.entries(analysis.crawled_pages_details || {}).map(([url, data]: [string, any]) => (
                            <Card key={url} className="p-4 bg-gray-100">
                              <h5 className="font-bold text-md mb-2 break-all">
                                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                                  {data.title || url} <ExternalLink className="inline h-4 w-4 ml-1" />
                                </a>
                              </h5>
                              <ul className="text-sm space-y-1">
                                <li><span className="font-medium">Status:</span> {data.status_code || "N/A"}</li>
                                <li><span className="font-medium">Type:</span> {data.possible_page_type || "N/A"}</li>
                                <li><span className="font-medium">Description:</span> {data.meta_description || "N/A"}</li>
                                <li><span className="font-medium">Snippet:</span> {data.text_snippet || "N/A"}</li>
                                <li><span className="font-medium">GA ID:</span> {data.google_analytics_id || "N/A"}</li>
                                <li><span className="font-medium">GTM ID:</span> {data.google_tag_manager_id || "N/A"}</li>
                                <li><span className="font-medium">Emails:</span>
                                  {data.detected_emails && Array.isArray(data.detected_emails) && data.detected_emails.length > 0 ? (
                                    <ul className="list-disc pl-5 space-y-1">
                                      {data.detected_emails.map((email: string, index: number) => (
                                        <li key={index} className="text-blue-600 hover:text-blue-800 underline">
                                          <a href={`mailto:${email}`}>{email}</a>
                                        </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <span className="italic text-gray-500"> None detected</span>
                                  )}
                                </li>
                                <li><span className="font-medium">Schema Markup:</span> {renderList(data.detected_schema_markup)}</li>
                                <li>
                                  <span className="font-medium">Social Links:</span>
                                  {data.social_media_links && typeof data.social_media_links === 'object' && Object.keys(data.social_media_links).length > 0 ? (
                                    <ul className="list-disc list-inside ml-4">
                                      {Object.entries(data.social_media_links).map(([platform, links]: [string, any]) => (
                                        <li key={platform}>
                                          <span className="font-medium capitalize">{platform}:</span>{' '}
                                          {Array.isArray(links) ? (
                                            links.map((link: string, idx: number) => (
                                              <span key={idx}>
                                                <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                                  {link}
                                                </a>
                                                {idx < links.length - 1 ? ', ' : ''}
                                              </span>
                                            ))
                                          ) : (
                                            <a href={links} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                              {links}
                                            </a>
                                          )}
                                        </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <span className="italic text-gray-500">None detected</span>
                                  )}
                                </li>

                                <li><span className="font-medium">Keywords:</span> {renderList(data.detected_keywords)}</li>
                              </ul>
                            </Card>
                          ))}
                        </div>
                      </details>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

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
                              {/* Attempt to derive domain age from whois_info */}
                              {analysis.whois_info?.creation_date ?
                                (() => {
                                  const creationDate = parseWhoisDate(analysis.whois_info.creation_date);
                                  if (creationDate) {
                                    const diffTime = Math.abs(new Date().getTime() - creationDate.getTime());
                                    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
                                    return `${Math.floor(diffYears)} years`;
                                  }
                                  return "N/A";
                                })()
                                : "N/A"}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Registration Date:
                            </span>
                            <span className="font-medium">
                              {parseWhoisDate(analysis.whois_info?.creation_date)?.toLocaleDateString() || "N/A"}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">Expiry Date:</span>
                            <span className="font-medium">
                              {parseWhoisDate(analysis.whois_info?.expiration_date)?.toLocaleDateString() || "N/A"}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">Registrar:</span>
                            <span className="font-medium">
                              {analysis.whois_info?.registrar || "N/A"}
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
                              {analysis.whois_info?.name || "N/A"}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">Organization:</span>
                            <span className="font-medium">
                              {analysis.whois_info?.org || "N/A"}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">Country:</span>
                            <span className="font-medium">
                              {analysis.whois_info?.country || "N/A"}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              WHOIS Privacy:
                            </span>
                            <span className="font-medium flex items-center">
                              {/* Check if WhoisGuard Protected is in name or org */}
                              {renderYesNo(
                                analysis.whois_info?.name?.includes("WhoisGuard Protected") ||
                                analysis.whois_info?.org?.includes("WhoisGuard, Inc.")
                              )}
                            </span>
                          </li>

                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div
                      className={`p-4 rounded-lg ${analysis.whois_info?.creation_date &&
                        (new Date().getTime() - parseWhoisDate(analysis.whois_info.creation_date)?.getTime() || 0) / (1000 * 60 * 60 * 24) < 90
                        ? "bg-red-50" : "bg-blue-50"
                        }`}
                    >
                      <h4 className="font-medium mb-2">Domain Age Analysis</h4>
                      <p className="text-gray-700">
                        {analysis.whois_info?.creation_date &&
                          (new Date().getTime() - (parseWhoisDate(analysis.whois_info.creation_date)?.getTime() || 0)) / (1000 * 60 * 60 * 24) < 90
                          ? "This domain was registered very recently. New domains are more commonly associated with scams and phishing attempts."
                          : analysis.whois_info?.creation_date &&
                            (new Date().getTime() - (parseWhoisDate(analysis.whois_info.creation_date)?.getTime() || 0)) / (1000 * 60 * 60 * 24) < 365
                            ? "This domain is relatively new. While not necessarily suspicious, newer domains have less established reputation."
                            : "This domain has been registered for multiple years, which typically indicates an established website."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

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
                              {analysis.ip_geolocation?.isp || "N/A"}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">Server IP:</span>
                            <span className="font-medium">
                              {analysis.ip_geolocation?.query || "N/A"}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Server Location:
                            </span>
                            <span className="font-medium">
                              {analysis.ip_geolocation?.city && analysis.ip_geolocation?.countryCode ?
                                `${analysis.ip_geolocation.city}, ${analysis.ip_geolocation.countryCode}` : "N/A"}
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
                              {renderYesNo(analysis.ssl_info && !analysis.ssl_info.error)}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Valid SSL Certificate:
                            </span>
                            <span className="font-medium flex items-center">
                              {renderYesNo(
                                analysis.ssl_info && !analysis.ssl_info.error && analysis.ssl_info.not_after && new Date(analysis.ssl_info.not_after) > new Date()
                              )}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">SSL Issuer:</span>
                            <span className="font-medium">
                              {analysis.ssl_info?.issuer?.CN || "N/A"}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Suspicious URL Characters:
                            </span>
                            <span className="font-medium flex items-center">
                              {/* This logic would need to be in Python or added here */}
                              {renderYesNo(false)} {/* Placeholder */}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Uses Subdomain:
                            </span>
                            <span className="font-medium flex items-center">
                              {/* This logic would need to be in Python or added here */}
                              {renderYesNo(url.split('.').length > 2 && !url.includes("www"))} {/* Simple check */}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div
                      className={`p-4 rounded-lg ${!analysis.ssl_info || analysis.ssl_info.error ? "bg-red-50" : (analysis.ssl_info.not_after && new Date(analysis.ssl_info.not_after) < new Date()) ? "bg-yellow-50" : "bg-green-50"}`}
                    >
                      <h4 className="font-medium mb-2">SSL/TLS Analysis</h4>
                      <p className="text-gray-700">
                        {!analysis.ssl_info || analysis.ssl_info.error
                          ? "This website does not use HTTPS or has an invalid SSL configuration, making it insecure for transmitting sensitive information."
                          : (analysis.ssl_info.not_after && new Date(analysis.ssl_info.not_after) < new Date())
                            ? "This website uses HTTPS but has an expired SSL certificate, which may indicate a security risk."
                            : "This website is properly secured with HTTPS and has a valid SSL certificate, which helps protect your data."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

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
                          Legal & Contact Information
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Contact Information:
                            </span>
                            <span className="font-medium flex items-center">
                              {renderYesNo(analysis.specific_page_types_found?.contact_pages?.length > 0)}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Privacy Policy:
                            </span>
                            <span className="font-medium flex items-center">
                              {renderYesNo(analysis.specific_page_types_found?.policy_pages?.length > 0)}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Terms of Service:
                            </span>
                            <span className="font-medium flex items-center">
                              {renderYesNo(analysis.specific_page_types_found?.policy_pages?.some((p: string) => p.includes("terms") || p.includes("conditions")))}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Return/Refund Policy:
                            </span>
                            <span className="font-medium flex items-center">
                              {renderYesNo(analysis.specific_page_types_found?.policy_pages?.some((p: string) => p.includes("refund") || p.includes("return")))}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div
                      className={`p-4 rounded-lg ${!analysis.specific_page_types_found?.policy_pages?.length || !analysis.specific_page_types_found?.contact_pages?.length
                        ? "bg-red-50" : "bg-blue-50"
                        }`}
                    >
                      <h4 className="font-medium mb-2">
                        Legal Documents Analysis
                      </h4>
                      <p className="text-gray-700">
                        {!analysis.specific_page_types_found?.policy_pages?.length &&
                          !analysis.specific_page_types_found?.contact_pages?.length
                          ? "This website is missing essential legal documents (Privacy Policy, Terms of Service) and contact information. Legitimate businesses typically have these pages."
                          : "This website has proper legal documentation and contact information, which is typical of legitimate businesses."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

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
                            <span className="font-medium">N/A</span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Est. Monthly Visits:
                            </span>
                            <span className="font-medium">N/A</span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">Bounce Rate:</span>
                            <span className="font-medium">N/A</span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Avg. Session Duration:
                            </span>
                            <span className="font-medium">N/A</span>
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
                              <span className="text-sm font-medium">N/A</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: "0%" }}
                              ></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-600">
                                Search Traffic
                              </span>
                              <span className="text-sm font-medium">N/A</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: "0%" }}
                              ></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-600">
                                Referral Traffic
                              </span>
                              <span className="text-sm font-medium">N/A</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-yellow-500 h-2 rounded-full"
                                style={{ width: "0%" }}
                              ></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-600">
                                Social Traffic
                              </span>
                              <span className="text-sm font-medium">N/A</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-purple-500 h-2 rounded-full"
                                style={{ width: "0%" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div
                      className={`p-4 rounded-lg bg-gray-50`}
                    >
                      <h4 className="font-medium mb-2">
                        Traffic Pattern Analysis
                      </h4>
                      <p className="text-gray-700">
                        Traffic data is not available from the current analysis.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

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
                              {renderYesNo(false)} {/* Placeholder */}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Phishing Detected:
                            </span>
                            <span className="font-medium flex items-center">
                              {renderYesNo(false)} {/* Placeholder */}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Suspicious JavaScript:
                            </span>
                            <span className="font-medium flex items-center">
                              {renderYesNo(false)} {/* Placeholder */}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Blacklist Status:
                            </span>
                            <span className="font-medium">
                              N/A
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
                              N/A
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">Cookie Abuse:</span>
                            <span className="font-medium flex items-center">
                              {renderYesNo(false)} {/* Placeholder */}
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-medium text-gray-700 mb-2">
                          Security Recommendations
                        </h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start gap-2">
                            <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                            <span>
                              Detailed security threat detection is not available in this version. Refer to the "Ports" and "SSL" tabs for related information.
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div
                      className={`p-4 rounded-lg bg-gray-50`}
                    >
                      <h4 className="font-medium mb-2">Security Summary</h4>
                      <p className="text-gray-700">
                        Security analysis in this section is limited. Please refer to the "Ports" and "SSL" tabs for detailed security-related findings.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

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
                                className={`h-4 rounded-full bg-gray-400`}
                                style={{ width: `50%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium w-16">
                              N/A% Positive
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-4 mr-2">
                              <div
                                className="bg-gray-400 h-4 rounded-full"
                                style={{ width: `50%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium w-16">
                              N/A% Negative
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
                                analysis.crawled_pages_details &&
                                Object.values(analysis.crawled_pages_details).some((page: any) =>
                                  page.social_media_links && typeof page.social_media_links === 'object' && Object.keys(page.social_media_links).length > 0
                                )
                              )}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Verified Business:
                            </span>
                            <span className="font-medium flex items-center">
                              {renderYesNo(false)} {/* Requires external verification */}
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
                              {renderYesNo(analysis.sitemap_page_count > 0 || analysis.crawled_page_count > 0)}
                            </span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Backlinks Count:
                            </span>
                            <span className="font-medium">N/A</span>
                          </li>
                          <li className="flex justify-between items-center pb-1 border-b border-gray-100">
                            <span className="text-gray-600">
                              Organic Keywords:
                            </span>
                            <span className="font-medium">N/A</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                          Payment Methods
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {analysis.detected_payment_methods_keywords && analysis.detected_payment_methods_keywords.length > 0 ? (
                            analysis.detected_payment_methods_keywords.map(
                              (method: string, index: number) => (
                                <Badge key={index} variant="outline">
                                  {method}
                                </Badge>
                              ),
                            )
                          ) : (
                            <Badge variant="outline">N/A</Badge>
                          )}
                        </div>

                        {analysis.detected_payment_methods_keywords &&
                          analysis.detected_payment_methods_keywords.length === 2 &&
                          analysis.detected_payment_methods_keywords.includes(
                            "cryptocurrency",
                          ) &&
                          analysis.detected_payment_methods_keywords.includes(
                            "wire transfer",
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
                      className={`p-4 rounded-lg bg-gray-50`}
                    >
                      <h4 className="font-medium mb-2">Reputation Summary</h4>
                      <p className="text-gray-700">
                        Reputation analysis in this section is limited due to data availability. Please refer to the "WHOIS" and "Crawled Pages" tabs for related information.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button
              className="bg-red-600 hover:bg-red-700"
              asChild
            >
              <a
                href={`mailto:report@scamaway.com?subject=Report Suspicious Website&body=Website URL: ${analysis.requested_url}%0A%0AReason for reporting:%0A%0AAnalysis Results:%0ARisk Score: ${analysis.riskScore}%0ARisk Level: ${riskLevel.level}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Flag className="mr-2 h-4 w-4" />
                Report this Website
              </a>
            </Button>

            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
              asChild
            >
              <a
                href={analysis.requested_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                Visit Website Anyway
              </a>
            </Button>

            <Button
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50"
              onClick={() => window.location.href = '/check'}
            >
              <Search className="mr-2 h-4 w-4" />
              Check Another Website
            </Button>
          </div>

          {/* Risk Disclaimer */}
          <div className="mt-8 text-center text-sm text-gray-500 max-w-2xl mx-auto">
            <p>
              <AlertTriangle className="inline-block h-4 w-4 mr-1 text-yellow-500" />
              <strong>Disclaimer:</strong> This analysis provides a risk assessment based on technical indicators.
              It does not guarantee safety. Always exercise caution when visiting unfamiliar websites.
            </p>
            <p className="mt-2">
              Analysis performed on: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </main>

      <Footer />

    </div>
  );
};

export default Results;
