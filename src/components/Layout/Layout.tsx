import {  Outlet } from "react-router-dom";
import Example from "./LayoutComponent";


const Layout = () => {
    return (
        <>
            <Example Content={<Outlet />} /> 
        </>    
    )
}

export {Layout}