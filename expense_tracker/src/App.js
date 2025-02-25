import { Routes, Route } from 'react-router-dom';
import './asset/css/App.css';
import Homepage from './components/Homepage';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
function App() {
  return (
    <div>
    <Routes>
      <Route path = "/" element={<Homepage/>} />
      <Route path = "/register" element={<Register/>} />
      <Route path = "/dashboard" element={<Dashboard/>} />
     
    </Routes>
    </div>
  );
}

export default App;
