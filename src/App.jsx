import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'
// import Login from './authentication/Login'
import Drawer from './components/Drawer'
import Overview from './pages/Overview'
import TaskManager from './pages/TaskManager'
import Employees from './pages/Employees'
import Lpos from './pages/Lpos'
import Leads from './pages/Leads'
import Customers from './pages/Customers'
import Invoices from './pages/Invoices'
import ConvertLabelGen from './pages/ConvertLabelGen'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Public Routes */}
      {/* <Route path='/' element={<Login />} /> */}

      {/* Protected Routes */}
        <Route path='' element={<Drawer />}>
        <Route path='/' element={<Overview/>} />
        <Route path='task-manager' element={<TaskManager />} />
        <Route path='employees' element={<Employees />} />
        <Route path='lpos' element={<Lpos />} />
        <Route path='leads' element={<Leads />} />
        <Route path='customers' element={<Customers />} />
        <Route path='invoices' element={<Invoices />} />
        <Route path='label-gen' element={<ConvertLabelGen />} />
        {/* <Route path='logout' element={<Logout />} /> */}
        {/* <Route path='*' element={<NotFound />} /> */}
        </Route>

    </Route>
  )
)
 

const App = () => {
  return <RouterProvider router={router} />
}


export default App
