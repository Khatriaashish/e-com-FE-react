import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "../pages/home/landing/home.page"
import LoginPage from "../pages/home/auth/login"
import {Error404} from "../pages/common/error.page"
import RegisterPage from "../pages/home/auth/register"
import CategoryDetailPage from "../pages/home/category/category-detail.page"
import CategoryDetailLayoutPage from "../pages/home/category/category-detail.layout.page"
import CMSLayout from "../pages/layouts/cms/cms.layout"
import AdminDashboard from "../pages/cms/dashboard/dashboard.page"
import HomeLayout from "../pages/layouts/home/home.layout"
import PermissionCheck from "../pages/common/check-permission"


export const Routing = ()=>{
    return (<>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomeLayout/>}>
                        <Route index element={<HomePage/>}/>
                        <Route path="login" element={<LoginPage/>}/>
                        <Route path="register" element={<RegisterPage/>}/>
                    </Route>
                    
                    <Route path="/category/:slug" element={<CategoryDetailLayoutPage/>}>
                        {/* <Route index element={<CategoryDetailPage/>}/> */}
                        <Route path=":childCat" element={<CategoryDetailPage/>}/>
                    </Route>

                    <Route path="/admin" element={<PermissionCheck accessBy={'admin'} Component={<CMSLayout/>}/>}>
                        <Route index element={<AdminDashboard/>}/>
                    </Route>
                    <Route path="*" element={<Error404/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

