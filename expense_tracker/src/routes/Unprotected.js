import { Outlet,Navigate } from 'react-router-dom';
 const UnProtectedRoute =()=>{
    const login = localStorage.getItem("islogin");
    console.log("LOGIN ",login);
    return login?<Navigate to='/dashboard' />:
    <Outlet/>

}
export default UnProtectedRoute