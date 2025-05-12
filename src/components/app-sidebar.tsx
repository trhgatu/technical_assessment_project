import * as React from 'react';
import { Users, Image } from 'lucide-react';
import { NavMain } from './nav-main';
import { Sidebar, SidebarContent } from './ui/sidebar';

const navMain = [
  {
    title: 'Albums',
    url: '/albums',
    icon: Image,
    isActive: true,
  },
  {
    title: 'Users',
    url: '/users',
    icon: Users,
    isActive: false,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
    </Sidebar>
  );
}