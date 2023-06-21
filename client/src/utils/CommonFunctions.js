import Cookies from "js-cookie";
const allowedPathsByRole = {
    user: ["/","/edit/profile"],
    admin: ["/", "/admin","/users"],
  };
  

const handleLogout = ()=>{
    Cookies.remove("token")
}


export {
    handleLogout,
    allowedPathsByRole
}