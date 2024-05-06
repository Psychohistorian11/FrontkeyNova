import React from 'react';
import { useNavigate, Outlet, NavLink } from 'react-router-dom';
import logo from '../Assets/logo.png'

export const Layout = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  }

  return (
    <>
        <div className="flex items-center justify-start p-1 h-16 bg-white text-black h-auto border-b border-b-gray-300 shadow">
            <div className="flex items-center">
                <img src={logo} alt="Logo" className="h-10 ms-6" />
                <span className="ms-3 font-montserrat text-xl font-bold">Nova</span>
            </div>
            
            <div className="grow flex justify-center space-x-8 content-center h-full bg-white">
                <NavLink to="inventory" className={({isActive}) => "font-poppins hover:bg-skinColor max-h-max content-center my-2 px-4 rounded-2xl " + (isActive? "font-bold" : "")}>Inventario</NavLink>
                <NavLink to="owners" className={({isActive}) => "font-poppins hover:bg-skinColor max-h-max content-center my-2 px-4 rounded-2xl " + (isActive? "font-bold" : "")}>Propietario</NavLink>
                <NavLink to="update" className={({isActive}) => "font-poppins hover:bg-skinColor max-h-max content-center my-2 px-4 rounded-2xl " + (isActive? "font-bold" : "")}>Actualización</NavLink>
                
            </div>

            <div className="flex items-center  justify-end text-black p-2 font-montserrat ml-auto mr-4">
                <span className="mr-2 font-bold">User</span>
                <span className="text-2xl">👤</span>
            </div>
        </div>  

        <Outlet />
    </>
  );
};
