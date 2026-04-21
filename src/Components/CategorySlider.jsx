import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
function getSlidesPerView() {
    if (window.innerWidth < 560)
        return 1
    else if (window.innerWidth < 768)
        return 2
    else
        return 3
}

export default function CategorySlider({ title, data }) {
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
            {/*start Brands*/}
            <section className="section-padding">
                <div className="container">
                    <div className="text-center pb-3">
                        <h3 className="mb-0 h3 fw-bold">Top {title}</h3>
                        <p className="mb-0 text-capitalize">
                            Select your favorite categories and purchase
                        </p>
                    </div>
                    <div className="brands">
                        <Swiper {...options}
                        >
                            {
                                data.map(item => {
                                    return <SwiperSlide key={item.id}>
                                        <div className="col">
                                            <div className="p-3 border rounded brand-box">
                                                <div className="d-flex align-items-center">
                                                    <Link to={`/shop/?${title == "Maincategory" ? "mc" : "sc"}=${title}`}>
                                                        <img
                                                            src={`${import.meta.env.VITE_SITE_IMG_SERVER}/${item.pic}`}
                                                            className="img-fluid" alt="" style={{ width: '100%', height: '200px' }}
                                                        />
                                                    </Link>
                                                </div>
                                                <h6 className='fw-bold w-100 text-center p-1'>{item.name}</h6>
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
    )
}
