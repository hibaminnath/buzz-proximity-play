import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, Settings, Info, LogIn } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/login", label: "Login", icon: LogIn },
    { path: "/mosquito", label: "Simulation", icon: Activity },
    { path: "/settings", label: "Settings", icon: Settings },
    { path: "/about", label: "About", icon: Info },
  ];

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-card/80 backdrop-blur-md border border-border rounded-full px-2 py-2 shadow-[var(--shadow-card)]">
        <div className="flex gap-1">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link key={path} to={path}>
              <Button
                variant={location.pathname === path ? "default" : "ghost"}
                size="sm"
                className="rounded-full flex items-center gap-2 px-4"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;