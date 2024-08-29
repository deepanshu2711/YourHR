import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import { UserProvider } from "./providers/userProvider";
import { Privateroute } from "./utils/privateRoutes";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route element={<Privateroute />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
