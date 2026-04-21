import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import HomePage from './Pages/HomePage'
import ShopPage from './Pages/ShopPage'
import AboutPage from './Pages/AboutPage'
import ContactUs from './Pages/ContactUs'
import DashboardPage from './Pages/DashboardPage'
import ProfilePage from './Pages/ProfilePage'
import UpdateProfile from './Pages/UpdateProfile'
import OrdersPage from './Pages/OrdersPage'
import WishlistPage from './Pages/WishlistPage'
import BuyerAddress from './Pages/BuyerAddress'
import ForgotPassword from './Pages/ForgotPassword'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import CartPage from './Pages/CartPage'
import CheckoutPage from './Pages/CheckoutPage'
import ProductPage from './Pages/ProductPage'
import OrderConfirmationPage from './Pages/OrderConfirmationPage'
import TestimonialPage from './Pages/TestimonialPage'
import FeaturesPage from './Pages/FeaturesPage'
import ErrorPage from './Pages/ErrorPage'
import AdminHomePage from './Pages/Admin/AdminHomePage'

import AdminMainCategoryPage from './Pages/Admin/AdminMainCategory/AdminMainCategoryPage'
import AdminMaincategoryCreatePage from './Pages/Admin/AdminMainCategory/AdminMaincategoryCreatePage'
import AdminUpdateMaincategoryPage from './Pages/Admin/AdminMainCategory/AdminUpdateMaincategoryPage'

import AdminSubcategoryPage from './Pages/Admin/AdminSubcategory/AdminSubcategoryPage'
import AdminSubcategoryCreatePage from './Pages/Admin/AdminSubcategory/AdminSubcategoryCreatePage'
import AdminUpdateSubcategoryPage from './Pages/Admin/AdminSubcategory/AdminUpdateSubcategoryPage'

import AdminBrandPage from './Pages/Admin/AdminBrand/AdminBrandPage'
import AdminBrandCreatePage from './Pages/Admin/AdminBrand/AdminBrandCreatePage'
import AdminUpdateBrandPage from './Pages/Admin/AdminBrand/AdminUpdateBrandPage'

import AdminFeaturePage from './Pages/Admin/AdminFeature/AdminFeaturePage'
import AdminFeatureCreatePage from './Pages/Admin/AdminFeature/AdminFeatureCreatePage'
import AdminUpdateFeaturePage from './Pages/Admin/AdminFeature/AdminUpdateFeaturePage'

import AdminFaqPage from './Pages/Admin/AdminFaq/AdminFaqPage'
import AdminFaqCreatePage from './Pages/Admin/AdminFAQ/AdminFaqCreatePage'
import AdminUpdateFaqPage from './Pages/Admin/AdminFAQ/AdminUpdateFaqPage'

import AdminProductPage from './Pages/Admin/AdminProduct/AdminProductPage'
import AdminProductCreatePage from './Pages/Admin/AdminProduct/AdminProductCreatePage'
import AdminUpdateProductPage from './Pages/Admin/AdminProduct/AdminUpdateProductPage'

import AdminSettingPage from "./Pages/Admin/AdminSetting/AdminSettingPage"


export default function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="" element={<HomePage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/testimonial" element={<TestimonialPage />} />
                    <Route path="/features" element={<FeaturesPage />} />
                    <Route path="/*" element={<ErrorPage />} />


                    {/* Admin Routes */}
                    <Route path="/admin" element={<AdminHomePage />} />
                    <Route path="/admin/maincategory" element={<AdminMainCategoryPage />} />
                    <Route path="/admin/maincategory/create" element={<AdminMaincategoryCreatePage />} />
                    <Route path="/admin/maincategory/update/:id" element={<AdminUpdateMaincategoryPage />} />

                    <Route path="/admin/subcategory" element={<AdminSubcategoryPage />} />
                    <Route path="/admin/subcategory/create" element={<AdminSubcategoryCreatePage />} />
                    <Route path="/admin/subcategory/update/:id" element={<AdminUpdateSubcategoryPage />} />

                    <Route path="/admin/brand" element={<AdminBrandPage />} />
                    <Route path="/admin/brand/create" element={<AdminBrandCreatePage />} />
                    <Route path="/admin/brand/update/:id" element={<AdminUpdateBrandPage />} />

                    <Route path="/admin/feature" element={<AdminFeaturePage />} />
                    <Route path="/admin/feature/create" element={<AdminFeatureCreatePage />} />
                    <Route path="/admin/feature/update/:id" element={<AdminUpdateFeaturePage />} />

                    <Route path="/admin/faq" element={<AdminFaqPage />} />
                    <Route path="/admin/faq/create" element={<AdminFaqCreatePage />} />
                    <Route path="/admin/faq/update/:id" element={<AdminUpdateFaqPage />} />

                    <Route path="/admin/product" element={<AdminProductPage />} />
                    <Route path="/admin/product/create" element={<AdminProductCreatePage />} />
                    <Route path="/admin/product/update/:id" element={<AdminUpdateProductPage />} />

                    <Route path="/admin/setting" element={<AdminSettingPage />} />

                    {/* Buyer Routes */}
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/update-profile" element={<UpdateProfile />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/buyer-address" element={<BuyerAddress />} />
                    <Route path="/forget-password" element={<ForgotPassword />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    )
}
