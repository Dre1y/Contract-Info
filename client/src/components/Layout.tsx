import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarHeader,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Users, Building, FileText } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const AppSidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/colaboradores", label: "Colaboradores", icon: Users },
    { path: "/empresas", label: "Empresas", icon: Building },
    { path: "/contratos", label: "Contratos", icon: FileText },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="GetInfo Logo" className="h-8 w-auto" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.path}
                  >
                    <Link to={item.path}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <main className="container mx-auto px-4 py-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
