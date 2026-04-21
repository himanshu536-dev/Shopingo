import React, { useEffect } from 'react'
import ProductSlider from '../Components/ProductSlider'
import LatestProducts from '../Components/LatestProducts'
import TrendingProducts from '../Components/TrendingProducts'
import CategorySlider from '../Components/CategorySlider'
import Features from '../Components/Features'
import BrandSlider from "../Components/BrandSlider"
import { Link } from 'react-router-dom'
import { getProduct } from "../Redux/ActionCreators/ProductActionCreator"
import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreator"
import { getSubcategory } from "../Redux/ActionCreators/SubcategoryActionCreator"
import { useDispatch, useSelector } from 'react-redux'

export default function HomePage() {
  let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
  let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
  let ProductStateData = useSelector(state => state.ProductStateData)
  let dispatch = useDispatch()
  useEffect(() => {
    (() => {
      dispatch(getMaincategory())
    })()
  }, [MaincategoryStateData.length])
  useEffect(() => {
    (() => {
      dispatch(getSubcategory())
    })()
  }, [SubcategoryStateData.length])
  useEffect(() => {
    (() => {
      dispatch(getProduct())
    })()
  }, [ProductStateData.length])


  return (
    <>
      {/* <!--start page content--> */}
      <div className="page-content">

        {/* <!--start carousel--> */}
        <section className="slider-section">
          <div id="carouselExampleCaptions" className="carousel slide carousel-fade" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active"
                aria-current="true"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active bg-primary">
                <div className="row d-flex align-items-center">
                  <div className="col d-none d-lg-flex justify-content-center">
                    <div className="">
                      <h3 className="h3 fw-light text-white fw-bold">New Arrival</h3>
                      <h1 className="h1 text-white fw-bold">Women Fashion</h1>
                      <p className="text-white fw-bold"><i>Last call for upto 25%</i></p>
                      <div className=""><Link className="btn btn-dark btn-ecomm" to="/shop/female">Shop Now</Link>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <img src="assets/images/sliders/s_1.webp" className="img-fluid" alt="..." />
                  </div>
                </div>
              </div>
              <div className="carousel-item bg-red">
                <div className="row d-flex align-items-center">
                  <div className="col d-none d-lg-flex justify-content-center">
                    <div className="">
                      <h3 className="h3 fw-light text-white fw-bold">Latest Trending</h3>
                      <h1 className="h1 text-white fw-bold">Fashion Wear</h1>
                      <p className="text-white fw-bold"><i>Last call for upto 35%</i></p>
                      <div className=""> <Link className="btn btn-dark btn-ecomm" to="/shop/male">Shop Now</Link>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <img src="assets/images/sliders/s_2.webp" className="img-fluid" alt="..." />
                  </div>
                </div>
              </div>
              <div className="carousel-item bg-purple">
                <div className="row d-flex align-items-center">
                  <div className="col d-none d-lg-flex justify-content-center">
                    <div className="">
                      <h3 className="h3 fw-light text-white fw-bold">New Trending</h3>
                      <h1 className="h1 text-white fw-bold">Kids Fashion</h1>
                      <p className="text-white fw-bold"><i>Last call for upto 15%</i></p>
                      <div className=""><Link className="btn btn-dark btn-ecomm" to="/shop/kids">Shop Now</Link>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <img src="assets/images/sliders/s_3.webp" className="img-fluid" alt="..." />
                  </div>
                </div>
              </div>
              <div className="carousel-item bg-yellow">
                <div className="row d-flex align-items-center">
                  <div className="col d-none d-lg-flex justify-content-center">
                    <div className="">
                      <h3 className="h3 fw-light text-dark fw-bold">Latest Trending</h3>
                      <h1 className="h1 text-dark fw-bold">Electronics Items</h1>
                      <p className="text-dark fw-bold"><i>Last call for upto 45%</i></p>
                      <div className=""><Link className="btn btn-dark btn-ecomm" to="/shop/electronics">Shop Now</Link>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <img src="assets/images/sliders/s_4.webp" className="img-fluid" alt="..." />
                  </div>
                </div>
              </div>
              <div className="carousel-item bg-green">
                <div className="row d-flex align-items-center">
                  <div className="col d-none d-lg-flex justify-content-center">
                    <div className="">
                      <h3 className="h3 fw-light text-white fw-bold">Super Deals</h3>
                      <h1 className="h1 text-white fw-bold">Home Furniture</h1>
                      <p className="text-white fw-bold"><i>Last call for upto 24%</i></p>
                      <div className=""><Link className="btn btn-dark btn-ecomm" to="/shop/furniture">Shop Now</Link>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <img src="assets/images/sliders/s_5.webp" className="img-fluid" alt="..." />
                  </div>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </section>

        {
          MaincategoryStateData.filter(x => x.active).map(item => {
            return <ProductSlider key={item.id} title={item.name} data={ProductStateData.filter(x => x.maincategory === item.name)} />
          })
        }

        <LatestProducts category={MaincategoryStateData.filter(x => x.active)} data={ProductStateData.filter(x => x.active)} />
        <Features />
        <TrendingProducts data={ProductStateData[ProductStateData.length - 1]} />
        <BrandSlider />
        <CategorySlider title="Maincategory" data={MaincategoryStateData.filter(x => x.active)} />
        <CategorySlider title="Subcategory" data={SubcategoryStateData.filter(x => x.active)} />

      </div>
      {/* <!--end carousel--> */}
    </>
  )
}
