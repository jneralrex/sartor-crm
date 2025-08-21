
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';

import Overview from './pages/Overview';
import TaskManager from './pages/TaskManager';
import Employees from './pages/Employees';
import Lpos from './pages/Lpos';
import Leads from './pages/Leads';
import Customers from './pages/Customers';
import Invoices from './pages/Invoices';
import ConvertLabelGen from './pages/ConvertLabelGen';
import Product from './pages/Product';

import LoginPage from './pages/auth/LoginPage';
import ForgotPassword from './pages/auth/ForgotPassword';
import PrivateRoute from './context/PrivateRoutes';

import AppLayout from './components/AppLayout';
import LandingPage from './pages/LandingPage';
import BodyLayout from './components/BodyLayout';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<BodyLayout />}>
        <Route index element={<LandingPage />} />
      </Route>

        <Route path="login" element={<LoginPage />} />
        <Route path="forgot-password" element={<ForgotPassword />} />

      {/* PROTECTED DASHBOARD ROUTES */}
      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
          <Route path="task-manager" element={<TaskManager />} />
          <Route path="employees" element={<Employees />} />
          <Route path="lpos" element={<Lpos />} />
          <Route path="leads" element={<Leads />} />
          <Route path="products" element={<Product />} />
          <Route path="customers" element={<Customers />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="label-gen" element={<ConvertLabelGen />} />
        </Route>
      </Route>
    </Route>
  )
);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </>
  );
}
