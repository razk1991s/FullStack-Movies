// src/App.jsx
import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./features/auth/loginPage/LoginPage";
import CreateAccount from "./features/auth/createAccountPage/CreateAccount";
import Main from "./app/pages/mainPage/MainPage.jsx";

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
}
