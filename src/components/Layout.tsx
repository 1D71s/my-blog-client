import {  Outlet } from "react-router-dom";
import Example from "./Layout/LayoutComponent";


const Layout = () => {
    return (
        <>
            <Example Content={<Outlet />} /> 
        </>    
    )
}

export {Layout}