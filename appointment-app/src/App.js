import Appointment from "./components/Appointment";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Payment from "./components/Payment";

function App() {
  return (
    <div>
      <Navbar />

      <div style={{ height: 70 }} />
      <Home />
      <Appointment />
      <Payment />
      <Footer />
    </div>
  );
}

export default App;
