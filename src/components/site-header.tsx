import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { logout } from "@/redux/auth/authSlice";
import { useAppDispath } from "@/redux/hooks";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function SiteHeader() {
  const dispatch = useAppDispath();
  const navigate = useNavigate();
  const handlLogOut = () => {
    dispatch(logout());
    toast.success("LogOut SuccessFully!");
    navigate("/login");
    window.scrollTo(0, 0);
  };
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <NavLink
          to="/"
          className="text-gray-800 dark:text-white hover:text-blue-600 transition"
        >
          Home
        </NavLink>
        <button
          onClick={handlLogOut}
          className="px-4 py-2 ms-5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          LogOut
        </button>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
