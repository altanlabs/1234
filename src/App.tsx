import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/theme/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";

import { Layout } from "./layout";
import Index from "./pages/index";
import NotFound from "./pages/NotFound";
import UploadPage from "./pages/upload";
import ExportPage from "./pages/export";
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
                <Route element={
                  <Layout
                    showSidebar={false}
                    header={{
                      title: appName,
                      navigation: [
                        { label: "Editor", href: "/" },
                        { label: "Subir Facturas", href: "/upload" },
                        { label: "Exportar", href: "/export" },
                      ],
                      showNotifications: false,
                      showUserMenu: false,
                      showThemeToggle: true,
                    }}
                  />
                }>
                  <Route index element={<Index />} />
                  <Route path="upload" element={<UploadPage />} />
                  <Route path="export" element={<ExportPage />} />
                </Route>
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