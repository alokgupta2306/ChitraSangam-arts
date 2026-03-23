import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import DoodleBg from "./components/DoodleBg";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import JoinUs from "./pages/JoinUs";
import About from "./pages/About";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ArtistList from "./pages/admin/ArtistList";
import DeliveryPartnerList from "./pages/admin/DeliveryPartnerList";
import PaintingsSell from "./pages/admin/PaintingsSell";
import WorkDistributor from "./pages/admin/WorkDistributor";
import FinanceTally from "./pages/admin/FinanceTally";
import ArtistDashboard from "./pages/artist/ArtistDashboard";
import WorkAssigned from "./pages/artist/WorkAssigned";
import WorkUpload from "./pages/artist/WorkUpload";
import ArtistEarnings from "./pages/artist/ArtistEarnings";
import BuyPaintings from "./pages/customer/BuyPaintings";
import RentPaintings from "./pages/customer/RentPaintings";
import CustomizePainting from "./pages/customer/CustomizePainting";
import TrackOrder from "./pages/customer/TrackOrder";
import DeliveryDashboard from "./pages/delivery/DeliveryDashboard";
import MyDeliveries from "./pages/delivery/MyDeliveries";
import AssignDelivery from "./pages/admin/AssignDelivery";
import PaintingsSold from "./pages/admin/PaintingsSold";

function AppContent() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <>
      <DoodleBg dark={isAdmin} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/join" element={<JoinUs />} />
          <Route path="/about" element={<About />} />

          {/* admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/artists" element={<ArtistList />} />
          <Route path="/admin/delivery-partners" element={<DeliveryPartnerList />} />
          <Route path="/admin/paintings" element={<PaintingsSell />} />
          <Route path="/admin/work-distributor" element={<WorkDistributor />} />
          <Route path="/admin/finance" element={<FinanceTally />} />
          <Route path="/admin/assign-delivery" element={<AssignDelivery />} />
          <Route path="/admin/paintings-sold" element={<PaintingsSold />} />

          {/* artist */}
          <Route path="/artist" element={<ArtistDashboard />} />
          <Route path="/artist/work-assigned" element={<WorkAssigned />} />
          <Route path="/artist/work-upload" element={<WorkUpload />} />
          <Route path="/artist/earnings" element={<ArtistEarnings />} />

          {/* customer */}
          <Route path="/buy" element={<BuyPaintings />} />
          <Route path="/rent" element={<RentPaintings />} />
          <Route path="/customize" element={<CustomizePainting />} />
          <Route path="/track" element={<TrackOrder />} />

          {/* delivery */}
          <Route path="/delivery" element={<DeliveryDashboard />} />
          <Route path="/delivery/my-deliveries" element={<MyDeliveries />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;