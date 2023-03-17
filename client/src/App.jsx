import "./App.css";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import Context from "./Context";
import axios from "axios";
import AccountPage from "./pages/AccountPage";
import PlacesPage from "./pages/PlacesPage";
import AccountNav from "./components/AccountNav";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacePage from "./pages/PlacePage";
import BookingsPage from "./pages/BookingsPage";
axios.defaults.baseURL = "/api";
axios.defaults.withCredentials = "true";

function App() {
  return (
    <div className="py-4 px-4 md:px-8 flex flex-col max-w-6xl mx-auto mt-16">
      <Context>
        <Header />
        <Routes>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account/:profile?" element={<AccountPage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/place/:placeId" element={<PlacePage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
        </Routes>
      </Context>
    </div>
  );
}

export default App;
