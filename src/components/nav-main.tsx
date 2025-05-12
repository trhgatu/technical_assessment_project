"use client"

import { NavLink } from "react-router-dom"
import { type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    imageIconUrl?: string
  }[]
}) {
  return (
    <SidebarGroup>
      <div className="flex items-center gap-2 p-4">
          <img src="https://geekup.vn/Icons/geekup-logo-general.svg">
          </img>
        </div>
      <SidebarGroupLabel>Function</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <NavLink to={item.url}>
              {({ isActive }) => (
                <SidebarMenuButton
                  tooltip={item.title}
                  className={isActive ? "bg-muted font-semibold" : ""}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              )}
            </NavLink>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
