import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { getTestimonial } from "../Redux/ActionCreators/TestimonialActionCreator"
function getSlidesPerView() {
    if (window.innerWidth < 560)
        return 1
    else if (window.innerWidth < 768)
        return 2
    else if (window.innerWidth < 992)
        return 3
    else
        return 4
}

import Breadcrumb from '../Components/Breadcrumb'
import { useDispatch, useSelector } from 'react-redux';

export default function TestimonialPage() {
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

    let [testimonial, setTestimonial] = useState([])
    let TestimonialStateData = useSelector(state => state.TestimonialStateData)
    let dispatch = useDispatch()

    function showStar(id) {
        let review = testimonial.find(x => x.id === id)
        console.log(review)
        if (review.star === 5)
            return "<i class='bi bi-star-fill text-warning'/><i class='bi bi-star-fill text-warning'/><i class='bi bi-star-fill text-warning'/><i class='bi bi-star-fill text-warning'/><i class='bi bi-star-fill text-warning'/> "

        else if (review.star === 4) {
            return "<i class='bi bi-star-fill text-warning'/><i class='bi bi-star-fill text-warning'/><i class='bi bi-star-fill text-warning'/><i class='bi bi-star-fill text-warning'/><i class='bi bi-star'/> "
        }
        else {
            return "<i class='bi bi-star-fill text-warning'/><i class='bi bi-star-fill text-warning'/><i class='bi bi-star-fill text-warning'/><i class='bi bi-star'/> <i class='bi bi-star'/>"
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getTestimonial())
            if (TestimonialStateData.length) {
                setTestimonial(TestimonialStateData.filter(x => x.star >= 3))
            }
        })()
    }, [TestimonialStateData.length])


    return (
        <>
            {/*start page content*/}
            <div className="page-content">
                <Breadcrumb title="Customer's Reviews" />
                <section className="section-padding">
                    <div className="container">
                        <div className="text-center pb-3">
                            <h3 className="mb-0 h3 fw-bold">Our Customer's Reviews</h3>
                            <p className="mb-0 text-capitalize">Shopping from our site <span className='fw-bold fst-italic'>{`${import.meta.env.VITE_SITE_SITENAME}`}</span> is an amazing experience! The site is easy to navigate, with clear product details and secure checkout. Delivery is quick, and the packaging is impressive. The products exceeded my expectations in both quality and style. Customer support will be friendly and responsive. Truly a trustworthy and stylish online shopping destination!</p>
                        </div>
                        <div className="product-thumbs">
                            <Swiper {...options}
                            >
                                {
                                    testimonial.map(item => {
                                        return <SwiperSlide key={item.id}>
                                            <div className="card p-2 border-3" style={{ background: "rgba(243, 237, 237, 1)" }}>
                                                <h6 className='text-center'>{item.name}</h6>
                                                <p className='text-center' dangerouslySetInnerHTML={{ __html: showStar(item.id) }} />
                                                <h6 className='testimonial-msg text-justify'>{item.message}</h6>
                                                <h6 className='text-center'>{new Date(item.date).toLocaleDateString()}</h6>
                                            </div>
                                        </SwiperSlide>
                                    })
                                }
                            </Swiper>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
