import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import AccountPage from "./pages/AccountPage";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

axios.defaults.baseURL = "http://127.0.0.1:3000";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/account" element={<AccountPage />}></Route>
        <Route path="/account/:subpage?" element={<AccountPage />}></Route>
        <Route path="/account/:subpage/:action" element={<AccountPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
