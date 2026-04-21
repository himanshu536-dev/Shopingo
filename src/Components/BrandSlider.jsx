import React, { useEffect, useState } from 'react'
import { getBrand } from "../Redux/ActionCreators/BrandActionCreator"
import { useDispatch, useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
function getSlidesPerView() {
    if (window.innerWidth < 560)
        return 2
    else if (window.innerWidth < 768)
        return 3
    else if (window.innerWidth < 992)
        return 4
    else
        return 6
}
export default function BrandSlider() {
    let BrandStateData = useSelector(state => state.BrandStateData)
    let dispatch = useDispatch()
    useEffect(() => {
        (() => {
            dispatch(getBrand())
        })()
    }, [BrandStateData.length])

    let [slidesPerView, setSlidesPerView] = useState(getSlidesPerView())
    let options = {
        slidesPerView: slidesPerView,
        spaceBetween: 30,
        freeMode: true,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },

        modules: [FreeMode, Pagination, Autoplay],
        className: "mySwiper",

    }

    window.addEventListener("resize", () => {
        setSlidesPerView(getSlidesPerView())
    })

    return (
        <>
            <>
                {/*start Brands*/}
                <section className="section-padding">
                    <div className="container">
                        <div className="text-center pb-3">
                            <h3 className="mb-0 h3 fw-bold">Shop By Brands</h3>
                            <p className="mb-0 text-capitalize">
                                Select your favorite brands and purchase
                            </p>
                        </div>
                        <div className="brands">

                            <Swiper {...options}
                            >
                                {
                                    BrandStateData.map(item => {
                                        return <SwiperSlide key={item.id}>
                                            <div className="col">
                                                <div className="p-3 border rounded brand-box">
                                                    <div className="d-flex align-items-center">
                                                        <Link to={`/shop`}>
                                                            <img
                                                                src={`${import.meta.env.VITE_SITE_IMG_SERVER}/${item.pic}`}
                                                                className="img-fluid" alt="" style={{ width: '120px', height: '70px' }}
                                                            />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    })
                                }

                            </Swiper>
                        </div>
                        {/*end row*/}
                    </div>

                </section>
                {/*end Brands*/}
            </>

        </>
    )
}
