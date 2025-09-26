import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import Bag from "./pages/BagPage"; // <-- import Bag page
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import AdminLoginPage from "./pages/AdminLoginPage";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth,} = useAuthStore();
  const { theme } = useThemeStore();


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/bag" element={authUser ? <Bag /> : <Navigate to="/login" />} /> {/* Protect Bag page */}
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
         <Route path="/admin/login" element={<AdminLoginPage />} />
         <Route path="/admin/dashboard" element={<AdminDashBoard/>} />
      </Routes>
       
      <Toaster />
    </div>
  );
};

export default App;
