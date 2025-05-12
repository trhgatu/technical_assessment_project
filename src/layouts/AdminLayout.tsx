import { Outlet } from "react-router-dom";
import React from 'react'
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header>
                    HEader
                </header>
                <div>
                    <Outlet />
                </div>
                <footer>
                    Footer
                </footer>
            </SidebarInset>

        </SidebarProvider>
    )
}
