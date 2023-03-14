import HomePage from "./pages/HomePage";
import NewAppointment from "./pages/NewAppointment";
import NavBar from "./components/NavBar";
import EditAppointment from "./pages/EditAppointment";
import DeleteAppointment from "./pages/DeleteAppointment";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;