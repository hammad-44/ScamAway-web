import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

type CheckType = "website";

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
  const navigate = useNavigate(); // ⬅️ for navigation

  const handleCheck = async () => {
    if (!inputValue.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: inputValue }),
      });

      const result = await response.json();
      console.log("🔍 Scam Check Result:", result);

      if (onCheck) {
        onCheck(inputValue, activeType, result);
      }

      // Redirect to /results?url=inputValue
      navigate(`/results?url=${encodeURIComponent(inputValue)}`);
    } catch (error) {
      console.error("❌ Error checking scam:", error);
      alert("Failed to check scam status. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCheck();
    }
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
    </div>
  );
}
