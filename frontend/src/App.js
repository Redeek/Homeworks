import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import InfoMe from './pages/InfoMe';
import Sorted from './pages/Sorted';
import Header from './components/Header';
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const user = localStorage.getItem("token")
  return (
    <>
    
   
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/me' element={<InfoMe />} />
          <Route path='/sorted' element={<Sorted />} />
        </Routes>
      </div>
    </Router>
    <ToastContainer />
    </>
    
  );
}

export default App;
