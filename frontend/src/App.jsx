import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfileSetup from "./pages/ProfileSetup";
import Dashboard from "./pages/Dashboard";
import Matches from "./pages/Matches";
import ViewProfile from "./pages/ViewProfile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/profile/:id" element={<ViewProfile />} />
      </Routes>
    </BrowserRouter>
  );
}
<div className="bg-red-500 text-white p-10 text-5xl">
  TEST TAILWIND
</div>
