import { createBrowserRouter } from "react-router";
import { AdminDashboard } from "./pages/AdminDashboard";
import { VendorDetail } from "./pages/VendorDetail";
import { VendorReview } from "./pages/VendorReview";
import { Transactions } from "./pages/Transactions";
import { VendorsList } from "./pages/VendorsList";
import { Intelligence } from "./pages/Intelligence";
import { Settings } from "./pages/Settings";
import { ResolutionTerminal } from "./pages/ResolutionTerminal";
import { RiskAnalysis } from "./pages/RiskAnalysis";
import { ApprovalSuccess } from "./pages/ApprovalSuccess";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: AdminDashboard,
      },
      {
        path: "success",
        Component: ApprovalSuccess,
      },
      {
        path: "vendors",
        Component: VendorsList,
      },
      {
        path: "vendors/:id",
        Component: VendorDetail,
      },
      {
        path: "review/:id",
        Component: VendorReview,
      },
      {
        path: "investments",
        Component: Transactions,
      },
      {
        path: "intelligence",
        Component: Intelligence,
      },
      {
        path: "settings",
        Component: Settings,
      },
      {
        path: "resolve/:id",
        Component: ResolutionTerminal,
      },
      {
        path: "analysis/:id",
        Component: RiskAnalysis,
      },
      {
        path: "*",
        Component: AdminDashboard, // Fallback to home for now
      }
    ],
  },
]);
