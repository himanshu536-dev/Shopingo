import React, { useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import ProductsCard from './ProductsCard';
function getSlidesPerView() {
    if (window.innerWidth < 560)
        return 2
    else if (window.innerWidth < 768)
        return 3
    else if (window.innerWidth < 992)
        return 4
    else
        return 5
}

export default function ProductSlider({ title, data }) {
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
            {/*start Featured Products slider*/}
            <section className="section-padding">
                <div className="container">
                    <div className="text-center pb-3">
                        <h3 className="mb-0 h3 fw-bold">{title} Products</h3>
                        <p className="mb-0 text-capitalize">Check New Arrivals</p>
                    </div>
                    <div className="product-thumbs">
                        <Swiper {...options}
                        >
                            {
                                data.map(item => {
                                    return <SwiperSlide key={item.id}>
                                        <div className="card" >
                                            <ProductsCard item={item} />
                                        </div>
                                    </SwiperSlide>
                                })
                            }
                        </Swiper>
                    </div>
                </div>
            </section>
            {/*end Featured Products slider*/}
        </>
    )
}
