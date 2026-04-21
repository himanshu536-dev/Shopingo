import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (
        <>
            <div className="list-group">
                <Link to="/admin" className="list-group-item list-group-item-action active bg-dark" aria-current="true"><i className='bi bi-house text-light'></i><span className='float-end'>Home</span></Link>
                <Link to="/admin/maincategory" className="list-group-item list-group-item-action active bg-dark" aria-current="true"><i className='bi bi-grid text-light'></i><span className='float-end'>Categories</span></Link>
                <Link to="/admin/subcategory" className="list-group-item list-group-item-action active bg-dark" aria-current="true"><i className='bi bi-list-ul text-light'></i><span className='float-end'>Sub-Categories</span></Link>
                <Link to="/admin/brand" className="list-group-item list-group-item-action active bg-dark" aria-current="true"><i className='bi bi-tags text-light'></i><span className='float-end'>Brands</span></Link>
                <Link to="/admin/product" className="list-group-item list-group-item-action active bg-dark" aria-current="true"><i className='bi bi-box text-light'></i><span className='float-end'>Products</span></Link>
                <Link to="/admin/feature" className="list-group-item list-group-item-action active bg-dark" aria-current="true"><i className='bi bi-stars text-light'></i><span className='float-end'>Features</span></Link>
                {/* <Link to="/admin/orders" className="list-group-item list-group-item-action active bg-dark" aria-current="true"><i className='bi bi-cart text-light'></i><span className='float-end'>Orders</span></Link> */}
                <Link to="/admin/checkout" className="list-group-item list-group-item-action active bg-dark" aria-current="true"><i className='bi bi-cart-check text-light'></i><span className='float-end'>Checkout</span></Link>
                <Link to="/admin/newsletter" className="list-group-item list-group-item-action active bg-dark" aria-current="true"><i className='bi bi-envelope text-light'></i><span className='float-end'>Newsletter</span></Link>
                <Link to="/admin/user" className="list-group-item list-group-item-action active bg-dark" aria-current="true"><i className='bi bi-person text-light'></i><span className='float-end'>User</span></Link>
                <Link to="/admin/faq" className="list-group-item list-group-item-action active bg-dark" aria-current="true"><i className='bi bi-question text-light'></i><span className='float-end'>FAQs</span></Link>
                <Link to="/admin/contactus" className="list-group-item list-group-item-action active bg-dark" aria-current="true"><i className='bi bi-telephone text-light'></i><span className='float-end'>Contact</span></Link>
                <Link to="/admin/setting" className="list-group-item list-group-item-action active bg-dark" aria-current="true"><i className='bi bi-gear text-light'></i><span className='float-end'>Settings</span></Link>
            </div>
        </>
    )
}
