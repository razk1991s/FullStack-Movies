import { Route, Routes } from "react-router-dom";
import LoginPage from "./features/auth/loginPage.jsx";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}
