import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/theme/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  BarChart2, 
  User, 
  Settings,
  CreditCard,
  Users
} from "lucide-react";

import Index from "./pages/index";
import NotFound from "./pages/NotFound";
import DashboardPage from "./pages/dashboard/DashboardPage";
import { useTheme } from "./theme/use-theme";

const appName = "My app";

const App = () => {
  const { theme } = useTheme();

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Theme appearance={theme === "system" ? "light" : theme}>
        <div className={theme}>
          <SidebarProvider>
            <BrowserRouter>
              <Routes>
                {/* Marketing pages with header navigation */}
                <Route
                  path="/"
                  element={<Index />}
                >
                  <Route index element={<Index />} />
                  <Route path="*" element={<NotFound />} />
                </Route>

                {/* Dashboard pages with sidebar configuration */}
                <Route
                  path="/dashboard"
                  element={<DashboardPage />}
                >
                  <Route index element={<DashboardPage />} />
                  {/* Add other dashboard routes as needed */}
                </Route>
              </Routes>
            </BrowserRouter>
          </SidebarProvider>
        </div>
      </Theme>
    </ThemeProvider>
  );
};

export default App;
