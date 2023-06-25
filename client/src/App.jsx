import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import ProfilePage from "./pages/ProfilePage";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";

axios.defaults.baseURL = "http://127.0.0.1:3000";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/account" element={<ProfilePage />}></Route>
        <Route path="/account/places?" element={<PlacesPage />}></Route>
        <Route path="/account/places/new" element={<PlacesFormPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
