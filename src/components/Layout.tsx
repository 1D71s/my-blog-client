import {  Outlet } from "react-router-dom";
import { NavBar } from "./NavBar/NavBar";
import { BottomMenu } from "./BottomMenu/BottomMenu";

const Layout = () => {
    return (
        <>
            <NavBar/>
            
            <Outlet />

            <BottomMenu/>
        
        </>    
    )
}

export {Layout}