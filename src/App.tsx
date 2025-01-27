import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import ExportPage from "./pages/export";
import LoginPage from "./pages/login";
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
                {/* Redirect to login by default */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Login page */}
                <Route path="/login" element={<LoginPage />} />

                {/* Main app routes */}
                <Route element={<Layout
                  showSidebar={false}
                  header={{
                    title: appName,
                    navigation: [
                      { label: "Editor", href: "/editor" },
                      { label: "Subir Facturas", href: "/upload" },
                      { label: "Exportar", href: "/export" },
                    ],
                    showNotifications: false,
                    showUserMenu: false,
                    showThemeToggle: true,
                  }}
                />}>
                  <Route path="/editor" element={<Index />} />
                  <Route path="/upload" element={<UploadPage />} />
                  <Route path="/export" element={<ExportPage />} />
                </Route>

                {/* Catch all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </SidebarProvider>
        </div>
      </Theme>
    </ThemeProvider>
  );
};

export default App;