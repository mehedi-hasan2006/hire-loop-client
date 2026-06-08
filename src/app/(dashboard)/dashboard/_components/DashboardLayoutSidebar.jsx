"use client";
import {
  LayoutSideContentLeft,
  Bell,
  Envelope,
  Gear,
  House,
  Plus,
  FileText,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardLayoutSidebar() {
  const pathname = usePathname();

  const navItems = [
    { icon: House, label: "Home", href: "/dashboard/recruiter" },
    {
      icon: Plus,
      label: "Add Job",
      href: "/dashboard/recruiter/jobs/new",
    },
    {
      icon: Bell,
      label: "My Company",
      href: "/dashboard/recruiter/my-company",
    },
    {
      icon: Envelope,
      label: "Manage Jobs",
      href: "/dashboard/recruiter/manage-job",
    },
    {
      icon: FileText,
      label: "Applications",
      href: "/dashboard/recruiter/applications",
    },
    { icon: Gear, label: "Settings", href: "/dashboard/recruiter/settings" },
  ];

  const menu = (
    <nav className="flex flex-col gap-1 px-3">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link key={item.label} href={item.href} className="outline-none">
            <button
              className={`flex items-center gap-3 w-full cursor-pointer rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-zinc-800 text-white shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
              type="button"
            >
              <item.icon
                className={`size-5 transition-colors duration-200 ${
                  isActive
                    ? "text-white"
                    : "text-zinc-500 group-hover:text-zinc-300"
                }`}
              />
              {item.label}
            </button>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 bg-zinc-950 border-r border-zinc-800/50 py-6">
        {/* Logo/Brand Area */}
        <div className="px-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <div>
              <h1 className="text-base font-bold text-white leading-tight">
                Recruiter
              </h1>
              <p className="text-xs text-zinc-500">Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1">
          <div className="px-6 mb-3">
            <p className="text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              Main Menu
            </p>
          </div>
          {menu}
        </div>

        {/* Bottom Section */}
        <div className="px-6 mt-6 pt-6 border-t border-zinc-800/50">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-medium text-zinc-400">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                John Doe
              </p>
              <p className="text-xs text-zinc-500 truncate">
                john@acmecorp.com
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Trigger */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Drawer>
          <Button
            className="bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl px-3 py-2 min-w-0 transition-all duration-200"
            variant="bordered"
          >
            <LayoutSideContentLeft className="size-5" />
          </Button>
          <Drawer.Backdrop className="bg-black/60 backdrop-blur-sm" />
          <Drawer.Content
            placement="left"
            className="bg-zinc-950 border-r border-zinc-800/50"
          >
            <Drawer.Dialog className="h-full flex flex-col">
              <Drawer.CloseTrigger className="text-zinc-400 hover:text-white absolute top-4 right-4" />
              <Drawer.Header className="border-b border-zinc-800/50 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                    <span className="text-white font-bold text-sm">R</span>
                  </div>
                  <Drawer.Heading className="text-lg font-bold text-white">
                    Navigation
                  </Drawer.Heading>
                </div>
              </Drawer.Header>
              <Drawer.Body className="flex-1 py-6">
                {/* Mobile Navigation */}
                <div className="mb-6 px-3">
                  <p className="text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-3 px-3">
                    Main Menu
                  </p>
                  {menu}
                </div>

                {/* Mobile User Info */}
                <div className="mt-auto px-6 pt-6 border-t border-zinc-800/50">
                  <div className="flex items-center gap-3 px-3 py-2">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-medium text-zinc-400">
                      JD
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        John Doe
                      </p>
                      <p className="text-xs text-zinc-500 truncate">
                        john@acmecorp.com
                      </p>
                    </div>
                  </div>
                </div>
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer>
      </div>
    </>
  );
}
