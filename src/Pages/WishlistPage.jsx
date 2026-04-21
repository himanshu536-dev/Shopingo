import React, { useState, useEffect } from 'react'
import Breadcrumb from '../Components/Breadcrumb'
import { useDispatch, useSelector } from 'react-redux'
import { deleteWishlist, getWishlist } from '../Redux/ActionCreators/WishlistActionCreator'
import { Link } from 'react-router-dom'

export default function WishlistPage() {
  let [wishlist, setWishlist] = useState([])
  let WishlistStateData = useSelector(state => state.WishlistStateData)
  let dispatch = useDispatch()

  function getAPIData() {
    dispatch(getWishlist())
    if (WishlistStateData.length) {
      let data = WishlistStateData.filter(x => x.user === localStorage.getItem("userid"))
      setWishlist(data)
    }
    else
      setWishlist([])
  }

  useEffect(() => {
    getAPIData()
  }, [WishlistStateData.length])

  function deleteRecord(id) {
    if (window.confirm("Are You Sure to Delete That Item : ")) {
      dispatch(deleteWishlist({ id: id }))
      getAPIData()
    }
  }


  return (
    <>
      {/*start page content*/}
      <div className="page-content">
        <Breadcrumb title="Wishlist" />
        {/*start product wishlist*/}
        <section className="section-padding">
          <div className="container">
            <div className="d-flex align-items-center px-3 py-2 border mb-4">
              <div className="text-start">
                <h4 className="mb-0 h4 fw-bold">Wishlist ({wishlist.length} Items)</h4>
              </div>
              <div className="ms-auto">
                <div className="ms-auto">
                  <Link to="/shop" className="btn btn-dark btn-ecomm">Continue Shopping</Link>
                </div>
              </div>
            </div>
            <div className="similar-products">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 g-4">
                {
                  wishlist.map(item => {
                    return <div className="col" key={item.id}>
                      <div className="card rounded-0">
                        <button className="btn-close wishlist-close position-absolute end-0 top-0" onClick={() => deleteRecord(item.id)} />

                        <img src={`${import.meta.env.VITE_SITE_IMG_SERVER}/${item.pic}`} width="100%" height="300" alt="" />

                        <div className="card-body border-top text-center">
                          <p className="mb-0 product-short-name">{item.name}</p>
                          <div className="product-price d-flex align-items-center gap-2 mt-2 justify-content-center">
                            <div className="h6 fw-bold">&#8377;{item.price}</div>
                          </div>
                        </div>
                        <div className="card-footer bg-transparent text-center">
                          <Link to={`/product/${item.product}`} className="btn btn-dark w-100">Move to Cart</Link>
                        </div>
                      </div>
                    </div>
                  })
                }
              </div>
              {/*end row*/}
            </div>
          </div>
        </section>
        {/*start product details*/}
      </div>
      {/*end page content*/}
    </>
  )
}
