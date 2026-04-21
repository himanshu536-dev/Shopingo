import React from 'react'
import Breadcrumb from '../Components/Breadcrumb'
import Features from '../Components/Features'
import BrandSlider from '../Components/BrandSlider'
import { Link } from 'react-router-dom'

export default function AboutPage() {
    return (
        <>
            {/*start page content*/}
            <div className="page-content">
                <Breadcrumb title="About" />
                {/*start product details*/}
                <section className="section-padding">
                    <div className="container">
                        <div className="row g-4">
                            <div className="col-12 col-xl-6">
                                <h3 className="fw-bold text-center">About Us</h3>
                                <p align="justify">
                                    Welcome to Our Website for Trendy Products, your trusted destination for stylish, comfortable, and high-quality garments. We believe that fashion is more than just clothing—it’s a way to express your personality, confidence, and lifestyle. Our collection is thoughtfully designed to keep you on-trend while ensuring comfort and durability in every piece.
                                </p>
                                <p align="justify">At Our Website for Trendy Products, we bring together the finest fabrics, modern designs, and expert craftsmanship to create apparel that fits every occasion—whether it’s casual wear, office attire, or festive celebrations. Our team is dedicated to curating versatile styles that cater to different tastes, sizes, and preferences, making fashion accessible to everyone.
                                </p>
                                <p align="justify">What sets us apart is our commitment to customer satisfaction and affordability without compromising on quality. With easy shopping, secure payments, and reliable doorstep delivery, we ensure a seamless online shopping experience. Our mission is to make fashion effortless, enjoyable, and inspiring—helping you look good and feel great every day.
                                </p>
                                <Link to="/shop" className="btn btn-dark text-center text-light w-100">Shop Now</Link>
                            </div>
                            <div className="col-12 col-xl-6">
                                <img
                                    src="/assets/images/blog/01.webp"
                                    className="img-fluid" style={{ height: "100%", width: "100%" }}
                                    alt=""
                                />
                            </div>
                            <Features />
                            <BrandSlider />
                        </div>
                        {/*end row*/}
                    </div>
                </section>
                {/*start product details*/}
            </div>
            {/*end page content*/}
        </>
    )
}
