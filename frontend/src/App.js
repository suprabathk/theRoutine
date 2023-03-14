import HomePage from "./pages/HomePage";
import NewAppointment from "./pages/NewAppointment";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import EditAppointment from "./pages/EditAppointment";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new/:selectedDay" element={<NewAppointment />} />
          <Route path="/edit/:appointmentID" element={<EditAppointment />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;