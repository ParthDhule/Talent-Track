import { ArrowRight } from "lucide-react";

export function HiringFunnel() {
  const steps = [
    { label: "Applied", count: 124, color: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800" },
    { label: "Test", count: 86, color: "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800" },
    { label: "Interview", count: 42, color: "bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800" },
    { label: "Offered", count: 18, color: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800" },
    { label: "Joined", count: 12, color: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800" }
  ];

  return (
    <div className="w-full py-4 overflow-x-auto">
      <div className="flex items-center justify-between gap-2 min-w-[600px]">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center flex-1">
            <div className={`flex flex-col items-center justify-center w-full p-3 rounded-lg border ${step.color} transition-all hover:scale-105`}>
              <span className="text-2xl font-bold">{step.count}</span>
              <span className="text-xs font-medium uppercase tracking-wider opacity-80">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <ArrowRight className="h-4 w-4 text-muted-foreground mx-2 shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
