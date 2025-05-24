import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
}

export function PageHeader({
  title,
  description,
  className,
  children,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "bg-gradient-to-r from-gray-100 to-gray-200 py-8 md:py-12",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-gray-600 max-w-2xl">{description}</p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
