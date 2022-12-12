import React from 'react';
import './Navbar.style.css';
import {Link, useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar: React.FC = () => {
    // @ts-ignore
    let username  = useAuth()
     const navigate = useNavigate();
    const renderTab:Object = {
     logout_Login: username ? <Link to={'/'} onClick={()=>{
         localStorage.removeItem('username')
        navigate('/');
     }
     }>Logout</Link>:<Link to={'/'}>Login</Link>,
     username:username && <Link to={'/list'}>{username}</Link>,
     add:username && <Link to={'/add'}>add</Link>,
     list:username && <Link to={'/list'}>List</Link>,
     update:username && <Link to={'/update'}>Update</Link>,
    }

    return(
        <nav>
            <div className="logo">My App</div>
            <div>
                {
                    // @ts-ignore
                    renderTab['username']
                }
                {
                    // @ts-ignore
                     renderTab['logout_Login']
                }
                {
                    // @ts-ignore
                    renderTab['list']
                }
                {
                    // @ts-ignore
                    renderTab['add']
                }
                {
                    // @ts-ignore
                    renderTab['update']
                }
            </div>
        </nav>
        )

};

export default Navbar;