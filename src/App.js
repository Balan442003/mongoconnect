import './App.css';
import Login from './components/login/Login';
import Register from './components/register/Register';
import { Routes, Route } from 'react-router-dom'
import ViewUser from './components/view/ViewUser';
import Dashboard from './components/dashboard/Dashboard';
import ListUser from './components/listcomponent/ListUser';
import EditUser from './components/editcomponent/EditUser';
import Admin from './components/admin/Admin';
import AdminLogin from './components/admin/Adminlogin';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ListUser />}/>
        <Route path="/Register" element={<Register />} />
        <Route path="/viewuser/:id" element={<ViewUser/>}/>
        <Route path="/EditUser/:id" element={<EditUser/>}/>
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard/:id" element={<Dashboard />} />
        <Route path="/Admin" element={<Admin />}/>
        <Route path="/Adminlogin" element={<AdminLogin />}/>

      </Routes>
    </div>
  );
}

export default App;
