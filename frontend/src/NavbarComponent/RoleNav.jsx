import { useAuthStore } from "../store/authStore";
import AdminHeader from "./AdminHeader";
import CustomerHeader from "./CustomerHeader";
import HotelHeader from "./HotelHeader";
import NormalHeader from "./NormalHeader";

const RoleNav = () => {
  const { isAuthenticated, role } = useAuthStore();

  if (!isAuthenticated) {
    return <NormalHeader />;
  }

  switch (role) {
    case 'admin':
      return <AdminHeader />;
    case 'customer':
      return <CustomerHeader />;
    case 'hotel':
      return <HotelHeader />;
    default:
      return <NormalHeader />;
  }
};

export default RoleNav;
