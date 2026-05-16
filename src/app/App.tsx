import React, { useState, useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { StakeholderProvider } from "./context";
import { SplashScreen } from "./components/SplashScreen";
import { AnimatePresence } from "motion/react";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <StakeholderProvider>
      <AnimatePresence mode="wait">
        {loading && <SplashScreen key="splash" />}
      </AnimatePresence>
      <RouterProvider router={router} />
    </StakeholderProvider>
  );
}
