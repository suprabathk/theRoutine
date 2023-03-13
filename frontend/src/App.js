import HomePage from "./pages/HomePage";
import NewAppointment from "./pages/NewAppointment";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new/:selectedDay" element={<NewAppointment />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;