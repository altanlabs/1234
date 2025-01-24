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

import { Layout } from "./layout";
import Index from "./pages/index";
import NotFound from "./pages/NotFound";
import DashboardPage from "./pages/dashboard/DashboardPage";
import UploadPage from "./pages/upload";
import { useTheme } from "./theme/use-theme";

const appName = "Facturator";

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
                  element={
                    <Layout
                      showSidebar={false}
                      header={{
                        title: appName,
                        navigation: [
                          { label: "Editor", href: "/" },
                          { label: "Subir Facturas", href: "/upload" },
                        ],
                        showNotifications: false,
                        showUserMenu: false,
                        showThemeToggle: true,
                      }}
                    />
                  }
                >
                  <Route index element={<Index />} />
                  <Route path="upload" element={<UploadPage />} />
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
