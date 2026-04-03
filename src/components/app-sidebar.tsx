import React from "react";
import { Home, Compass, Waves, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
export function AppSidebar(): JSX.Element {
  const location = useLocation();
  const navItems = [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "Spot Explorer", path: "/explore", icon: Compass },
    { name: "Map Explorer", path: "/map", icon: MapPin },
  ];
  return (
    <Sidebar className="border-r border-white/5">
      <SidebarHeader className="pt-6 px-6">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Waves className="h-8 w-8 text-primary animate-pulse" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full" />
          </div>
          <span className="text-2xl font-display font-bold tracking-tight text-foreground">
            Aether
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-3 pt-8">
        <SidebarGroup>
          <SidebarMenu className="space-y-1">
            {navItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === item.path}
                  className={cn(
                    "h-11 px-4 transition-all duration-200 hover:bg-white/5",
                    location.pathname === item.path ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  )}
                >
                  <Link to={item.path} className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="pb-8 px-6">
        <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
          <p className="text-xs text-muted-foreground leading-relaxed">
            AI Intelligence active for <span className="text-foreground font-semibold text-accent">Aegean Sector</span>
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}