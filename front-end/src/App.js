import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AuthProvider, { useAuth } from "./security/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
import LoginComponent from "./components/LoginComponent";
import Register from "./components/Register";
import ErrorComponent from "./components/ErrorComponent";
import LogoutComponent from "./components/LogoutComponent";
import SidebarComponent from "./components/SideBarComponent";
import CommandComponent from "./components/CommandComponent";
import PaymentComponent from "./components/PaymentComponent";
import ReviewComponent from "./components/ReviewComponent";
import UserComponent from "./admin/UserComponent";
import CarComponent from "./admin/CarComponent";
import WishListComponent from "./components/WishListComponent";
import ProfileComponent from "./components/ProfileComponent";
import UserEditCard from "./admin/UserEditCard";
import CarEditCard from "./admin/CarEditCard";

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();

  if (authContext.isAuthenticated) return children;

  return <Navigate to="/" />;
}

function AdminRoute({ children }) {
  const authContext = useAuth();

  if (authContext.isAdmin) return children;

  return <Navigate to="/" />;
}

function AuthenticatedNotAdminRoute({ children }) {
  const authContext = useAuth();

  if (authContext.isAdmin === false) return children;

  return <Navigate to="/" />;
}

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <HeaderComponent />
          <Routes>
            <Route path="/" element={<SidebarComponent />} />
            <Route path="/car/:page" element={<SidebarComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<Register />} />
            <Route path="/review/:id" element={<ReviewComponent />} />
            <Route
              path="/profile"
              element={
                <AuthenticatedNotAdminRoute>
                  <ProfileComponent />
                </AuthenticatedNotAdminRoute>
              }
            />
            <Route
              path="/command"
              element={
                <AuthenticatedRoute>
                  <CommandComponent />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <AuthenticatedRoute>
                  <PaymentComponent />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/wishList"
              element={
                <AuthenticatedRoute>
                  <WishListComponent />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/users/:page"
              element={
                <AdminRoute>
                  <UserComponent />
                </AdminRoute>
              }
            />
            <Route
              path="/cars/:page"
              element={
                <AdminRoute>
                  <CarComponent />
                </AdminRoute>
              }
            />
            <Route
              path="/editCar/:ID"
              element={
                <AdminRoute>
                  <CarEditCard />
                </AdminRoute>
              }
            />
            <Route
              path="/editUser/:ID"
              element={
                <AdminRoute>
                  <UserEditCard />
                </AdminRoute>
              }
            />
            <Route
              path="/logout"
              element={
                <AuthenticatedRoute>
                  <LogoutComponent />
                </AuthenticatedRoute>
              }
            />
            <Route path="*" element={<ErrorComponent />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
