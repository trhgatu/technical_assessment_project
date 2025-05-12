import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex items-center justify-between px-6 py-4 border-b bg-white shadow-sm">
                    <SidebarTrigger/>
                    <div className="text-xl font-semibold text-gray-800">
                        Admin Dashboard
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <img
                                src="https://i.pravatar.cc/40"
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full"
                            />
                            <span className="text-sm font-medium text-gray-700">Tu Tran</span>
                        </div>
                    </div>
                </header>
                <div className="flex-1 p-4">
                    <main className="max-w-6xl mx-auto">
                        <Outlet />
                    </main>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
