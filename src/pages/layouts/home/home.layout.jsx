import { Outlet } from "react-router-dom"
import NavbarComponent from "../../../component/common/navbar/navbar.component"

const HomeLayout = ()=>{
    return (<>
        <NavbarComponent/>
        <Outlet/>
    </>)
}

export default HomeLayout