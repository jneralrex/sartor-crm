
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

import AppLayout from './components/AppLayout';
import LandingPage from './pages/LandingPage';
import BodyLayout from './components/BodyLayout';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from './store/PrivateRoutes';
import TermsOfUse from './pages/TermsOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Commissions from './pages/Commissions';
import Vehicle from './pages/Vehicle';
import QrCode from './pages/QrCode';
import StockLevels from './pages/StockLevels';
import Stock from './pages/Stock';
import Order from './pages/Order';
import SalesRep from './pages/SalesRep';
import Merchandisers from './pages/Merchandisers';
import Suppliers from './pages/Suppliers';
import SalesNavigator from './pages/SalesNavigator';
import SartorCrm from './pages/SartorCrm';
import SalesNavigatorPlus from './pages/SalesNavigatorPlus';
import SartorChain from './pages/SartorChain';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<BodyLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="sales-navigator" element={<SalesNavigator />}/>
        <Route path="sartor-crm-360" element={<SartorCrm />}/>
        <Route path="sales-navigator-plus" element={<SalesNavigatorPlus />}/>
        <Route path="sartor-chain" element={<SartorChain />}/>
      </Route>

        <Route path="login" element={<LoginPage />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="terms-condition" element={<TermsOfUse />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />

      {/* PROTECTED DASHBOARD ROUTES */}
      <Route path="/sartor" element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
          <Route path="task-manager" element={<TaskManager />} />
          <Route path="employees" element={<Employees />} />
          <Route path="lpos" element={<Lpos />} />
          <Route path="leads" element={<Leads />} />
          <Route path="products" element={<Product />} />
          <Route path="customers" element={<Customers />} />
          <Route path='commissions' element={<Commissions/>} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="vehicles" element={<Vehicle />} />
          <Route path="label-gen" element={<ConvertLabelGen />} />
          <Route path="qr-code" element={<QrCode />} />
          <Route path="stock-levels" element={<StockLevels />} />
          <Route path="stocks" element={<Stock />} />
          <Route path="orders" element={<Order />} />
          <Route path="sales-rep" element={<SalesRep />} />
          <Route path="merchandisers" element={<Merchandisers />} />'
          <Route path="suppliers" element={<Suppliers />} />'
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
