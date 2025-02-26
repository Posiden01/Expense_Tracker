import { Outlet,Navigate } from 'react-router-dom';
 const ProtectedRoute =()=>{
    const login = localStorage.getItem("islogin");
    console.log("LOGIN ",login);
    return login?<Outlet/>:
    <Navigate to='/' />

}
export default ProtectedRoute