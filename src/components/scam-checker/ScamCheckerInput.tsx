import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Globe, Phone, Coins, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

type CheckType = "website" | "phone" | "crypto" | "iban";

interface ScamCheckerInputProps {
  onCheck?: (value: string, type: CheckType) => void;
  className?: string;
}

export function ScamCheckerInput({
  onCheck,
  className,
}: ScamCheckerInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [activeType, setActiveType] = useState<CheckType>("website");

  const handleCheck = () => {
    if (inputValue.trim() && onCheck) {
      onCheck(inputValue, activeType);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCheck();
    }
  };

  const checkTypes = [
    {
      id: "website" as CheckType,
      label: "Website",
      icon: <Globe className="h-4 w-4" />,
    },
   
  ];


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
          placeholder={"Enter Website URL"}
          className="pl-10 py-6 text-lg"
        />
      </div>

     

      <div className="mt-6 mx-auto">
        <Button
          onClick={handleCheck}
          className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white py-6"
          size="lg"
        >
          Check scam
        </Button>
      </div>
    </div>
  );
}
