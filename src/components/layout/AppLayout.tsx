import React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
type AppLayoutProps = {
  children: React.ReactNode;
  container?: boolean;
  className?: string;
  contentClassName?: string;
};
export function AppLayout({ children, container = false, className, contentClassName }: AppLayoutProps): JSX.Element {
  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <SidebarInset className={cn("bg-background", className)}>
          <header className="sticky top-0 z-40 w-full flex h-16 items-center justify-between px-6 bg-background/80 backdrop-blur-xl border-b border-border/10">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="h-10 w-10" />
            </div>
            <div className="flex items-center">
              <ThemeToggle className="relative top-0 right-0 h-10 w-10" />
            </div>
          </header>
          <main className="relative flex-1 min-h-[calc(100vh-4rem)]">
            {container ? (
              <div className={cn(
                "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12",
                contentClassName
              )}>
                {children}
              </div>
            ) : (
              children
            )}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}