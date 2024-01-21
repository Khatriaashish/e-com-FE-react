import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"

import HomePage from "../pages/home/landing/home.page"
import {Error404} from "../pages/common/error.page"
import CategoryDetailPage from "../pages/home/category/category-detail.page"
import CategoryDetailLayoutPage from "../pages/home/category/category-detail.layout.page"
import AdminDashboard from "../pages/cms/dashboard/dashboard.page"
import PermissionCheck from "../pages/common/check-permission"
import {CMSLayout, HomeLayout} from "../pages/layouts"

import { LoginPage, RegisterPage, ForgetPassword, SetPasswordPage } from "../pages/home/auth"
import * as banner from "../pages/cms/banner"
import * as brand from "../pages/cms/brand"
import * as category from "../pages/cms/category"
import * as product from "../pages/cms/product"


export const Routing = ()=>{
    return (<>
            <ToastContainer/>
            <BrowserRouter>
                <Routes>
                    {/* auth */}
                    <Route path="/" element={<HomeLayout/>}>
                        <Route index element={<HomePage/>}/>
                        <Route path="register" element={<RegisterPage/>}/>
                        <Route path="forget-password" element={<ForgetPassword/>}/>
                        <Route path="activate/:token" element={<SetPasswordPage/>}/>
                        <Route path="login" element={<LoginPage/>}/>

                    </Route>

                    {/* Admin-CMS */}
                    <Route path="/admin" element={<PermissionCheck accessBy={"admin"} Component={<CMSLayout/>}/>}>
                        {/* dashboard */}
                        <Route index element={<AdminDashboard/>}/>

                        {/* banner */}
                        <Route path="banner" element={<banner.BannerLayout/>}>
                            <Route index element={<banner.BannerList/>}/>
                            <Route path="create" element={<banner.BannerCreate/>}/>
                            <Route path=":id" element={<banner.BannerEdit/>}/>
                        </Route>

                        {/* brand */}
                        <Route path="brand" element={<brand.BrandLayout/>}>
                            <Route index element={<brand.BrandList/>}/>
                            <Route path="create" element={<brand.BrandCreate/>}/>
                            <Route path=":id" element={<brand.BrandEdit/>}/>
                        </Route>

                        {/* category */}
                        <Route path="category" element={<category.CategoryLayout/>}>
                            <Route index element={<category.CategoryList/>}/>
                            <Route path="create" element={<category.CategoryCreate/>}/>
                            <Route path=":id" element={<category.CategoryEdit/>}/>
                        </Route>

                        {/* product */}
                        <Route path="product" element={<product.ProductLayout/>}>
                            <Route index element={<product.ProductList/>}/>
                            <Route path="create" element={<product.ProductCreate/>}/>
                            <Route path=":id" element={<product.ProductEdit/>}/>
                        </Route>
                    </Route>
                    <Route path="*" element={<Error404/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

