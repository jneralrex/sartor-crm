import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate
} from 'react-router-dom'
import Drawer from './components/Drawer'
import Overview from './pages/Overview'
import TaskManager from './pages/TaskManager'
import Employees from './pages/Employees'
import Lpos from './pages/Lpos'
import Leads from './pages/Leads'
import Customers from './pages/Customers'
import Invoices from './pages/Invoices'
import ConvertLabelGen from './pages/ConvertLabelGen'
import LoginPage from './pages/auth/LoginPage'
import ForgotPassword from './pages/auth/ForgotPassword'
import ProductsTable from './dataset/tables/ProductsTable'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      {/* Public Routes */}
      <Route path="login" element={<LoginPage />} />
      <Route path="forgot-password" element={<ForgotPassword />} />

      {/* Protected Routes */}
      <Route path="" element={<Drawer />}>
        <Route path="overview" element={<Overview />} />
        <Route path="task-manager" element={<TaskManager />} />
        <Route path="employees" element={<Employees />} />
        <Route path="lpos" element={<Lpos />} />
        <Route path="leads" element={<Leads />} />
        <Route path="products" element={<ProductsTable />} />
        <Route path="customers" element={<Customers />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="label-gen" element={<ConvertLabelGen />} />
      </Route>
    </Route>
  )
)

const App = () => {
  return <RouterProvider router={router} />
}

export default App