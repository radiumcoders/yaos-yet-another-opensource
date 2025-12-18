import { cn } from "@/lib/utils";

function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("h-full w-full max-w-3xl mx-auto","border-x border-edge", className)}>
      {children}
    </div>
  );
}

export default Container;
