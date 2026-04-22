import { RouterProvider } from "react-router";
import { router } from "./routes";
import { StakeholderProvider } from "./context";

export default function App() {
  return (
    <StakeholderProvider>
      <RouterProvider router={router} />
    </StakeholderProvider>
  );
}
