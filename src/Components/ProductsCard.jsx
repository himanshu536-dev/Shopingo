import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductsCard({ item }) {
  return (
    <>
      <div className='card'>
        <div className="position-relative overflow-hidden">
          <div className="product-options  mx-auto position-absolute bottom-0 start-0 end-0">
            <p className='bg-primary p-0 text-light w-100 text-center'>{item.brand}</p>
          </div>
          <Link to={`/product/${item.id}`}>
            <img src={`${import.meta.env.VITE_SITE_IMG_SERVER}/${item.pic[0]}`} className="card-img-top" alt="..." width="100%" height="250" />
          </Link>
        </div>
        <div className="card-body">
          <div className="product-info text-center">
            <p className="mb-1 fw-bold fs-6 product-name card-text">{item.name}</p>
            {/* <div className="ratings mb-1 h6">
                          <i className="bi bi-star-fill text-warning" />
                          <i className="bi bi-star-fill text-warning" />
                          <i className="bi bi-star-fill text-warning" />
                          <i className="bi bi-star-fill text-warning" />
                          <i className="bi bi-star-fill text-warning" />
                        </div> */}
            <p className='mb-0'>{item.stockQuantity} Pc Left</p>
            <p className="mb-0 h6 fw-bold product-price">&#8377;<del>{item.basePrice}</del>&nbsp; {item.finalPrice} &nbsp; <sup>{item.discount}</sup>%off</p>
          </div>
        </div>
      </div>
    </>
  )
}
