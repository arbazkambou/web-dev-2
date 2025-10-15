import { cn } from "@/lib/utils";

type SpinnerSize = "sm" | "md" | "lg" | "xl";

export interface SpinnerProps {
  size?: SpinnerSize;
  label?: string;
  className?: string;
}

const sizeClasses: Record<SpinnerSize, string> = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
};

export function Spinner({
  size = "md",
  label = "Loading",
  className,
}: SpinnerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={label}
      className={cn("inline-flex items-center", className)}
    >
      <svg
        viewBox="0 0 24 24"
        className={cn("animate-spin", sizeClasses[size])}
        aria-hidden="true"
      >
        {/* Track */}
        <circle
          className="text-muted-foreground/30"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        {/* Active arc */}
        <circle
          className="text-primary"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          style={{
            strokeDasharray: "60 200",
            strokeDashoffset: "0",
          }}
        />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
}

export default Spinner;
