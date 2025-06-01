import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {AlertDialog} from '@/components/ui/AlertDialog';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type CheckType = "website";
type AnalysisType = "basic" | "detailed";

interface ScamCheckerInputProps {
  onCheck?: (value: string, type: CheckType, result?: any) => void;
  className?: string;
}

export function ScamCheckerInput({
  onCheck,
  className,
}: ScamCheckerInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [activeType, setActiveType] = useState<CheckType>("website");
  const [loading, setLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedAnalysisType, setSelectedAnalysisType] = useState<AnalysisType>("basic");
  const navigate = useNavigate();


  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        try {
          new URL(`https://${url}`);
          return true;
        } catch (e) {
          return false;
        }
      }
      return false;
    }
  };

  const handleCheck = () => {
    if (!inputValue.trim()) {
      setErrorMessage("Please enter a URL to check.");
      setShowErrorModal(true);
      return;
    }

    if (!isValidUrl(inputValue)) {
      setErrorMessage("Please enter a valid URL (e.g., example.com, https://example.com).");
      setShowErrorModal(true);
      return;
    }

    let analysisMessage = "";
    if (selectedAnalysisType === "basic") {
      analysisMessage = "Basic analysis will take approximately 2 minutes.";
    } else { 
      analysisMessage = "Detailed analysis will take time based on the size and number of pages on the website.";
    }

    setErrorMessage(analysisMessage);
    setShowErrorModal(true);

    navigate(`/results?url=${encodeURIComponent(inputValue)}&analysisType=${selectedAnalysisType}`);

    if (onCheck) {
      onCheck(inputValue, activeType);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCheck();
    }
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Search className="h-5 w-5" />
        </div>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter Website URL"
          className="pl-10 py-6 text-lg"
        />
      </div>

      <div className="mt-4">
        <RadioGroup
          defaultValue="basic"
          onValueChange={(value: AnalysisType) => setSelectedAnalysisType(value)}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="basic" id="basic-analysis" />
            <Label htmlFor="basic-analysis">Basic Analysis</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="detailed" id="detailed-analysis" />
            <Label htmlFor="detailed-analysis">Detailed Analysis</Label>
          </div>
        </RadioGroup>
        {/* Dynamic text based on selected analysis type */}
        <p className="text-gray-500 text-sm mt-2">
          {selectedAnalysisType === "basic"
            ? "Performs a quick check focusing on core domain information and homepage content."
            : "Conducts a comprehensive analysis, crawling relevant pages for in-depth insights."}
        </p>
      </div>

      <div className="mt-6 mx-auto">
        <Button
          onClick={handleCheck}
          className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white py-6"
          size="lg"
          disabled={loading}
        >
          {loading ? "Checking..." : "Check scam"}
        </Button>
      </div>

      <AlertDialog
        isOpen={showErrorModal}
        onClose={closeErrorModal}
        title={selectedAnalysisType === "basic" ? "Basic Analysis Information" : "Detailed Analysis Information"}
        message={errorMessage}
      />
    </div>
  );
}
