import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import Tost from "./components/Tost/Tost";
import AuthProvider from "./context/AuthProvider";
import routes from "./routes/Route";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={routes} />
        <Tost />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
