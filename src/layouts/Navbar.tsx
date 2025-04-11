import { ThemeSwitcher } from "@/components/core/Theme/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Container } from "@/layouts/Container";
import { Flex } from "@/layouts/Flex";
import { Heading } from "@/layouts/Heading";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/" },
  { label: "Boards", to: "/boards" },
  { label: "Insights", to: "/insights" },
  { label: "Feed", to: "/feed" },
  { label: "Blob", to: "/blob" },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <header className="border-b bg-background py-3">
      <Container>
        <Flex justify="between" align="center" className="gap-4">
          <Flex align="center" className="gap-4">
            <Heading level={1} className="text-xl font-bold">
              OpenStaff 🚀
            </Heading>
            <Separator orientation="vertical" className="h-6 hidden sm:block" />

            {/* Desktop Nav */}
            <Flex className="hidden sm:flex gap-2">
              {navItems.map((item) => (
                <Link key={item.to} to={item.to}>
                  <Button
                    variant={pathname === item.to ? "default" : "ghost"}
                    className={cn("text-sm", {
                      "font-bold": pathname === item.to,
                    })}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </Flex>
          </Flex>

          {/* Right side controls */}
          <Flex align="center" className="gap-2">
            <ThemeSwitcher />

            {/* Mobile Nav */}
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost" className="sm:hidden">
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-4">
                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <Link key={item.to} to={item.to}>
                      <Button
                        variant={pathname === item.to ? "default" : "ghost"}
                        className="w-full justify-start"
                      >
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>

            {/* Desktop user menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm hidden sm:inline-flex">
                  Menu ▾
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/logout">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Flex>
        </Flex>
      </Container>
    </header>
  );
}
