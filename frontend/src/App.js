import HomePage from "./pages/HomePage";
import NewAppointment from "./pages/NewAppointment";
import NavBar from "./components/NavBar";
import EditAppointment from "./pages/EditAppointment";
import DeleteAppointment from "./pages/DeleteAppointment";
import { BrowserRouter, Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new/:selectedDay" element={<NewAppointment />} />
          <Route path="/edit/:appointmentID" element={<EditAppointment />} />
          <Route path="/delete/:appointmentID" element={<DeleteAppointment />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;