import { cn } from "@/lib/utils"

function Container({ children , className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("max-w-7xl w-full border-x border-border h-screen mx-auto px-4", className)}>{children}</div>
  )
}

export default Container