
import { Link } from 'react-router-dom'
import Sidebar from '../../../Components/Sidebar'
import { useEffect } from 'react'
import { deleteProduct, getProduct } from "../../../Redux/ActionCreators/ProductActionCreator"
//to use dataTables.net
import $ from 'jquery'
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import { useDispatch, useSelector } from 'react-redux';

export default function AdminProductPage() {
    let ProductStateData = useSelector(state => state.ProductStateData)
    let dispatch = useDispatch()

    function deleteAPIdata(id) {
        if (confirm("Are You Sure !!! Want to Delete the Record!!")) {
            dispatch(deleteProduct({ id: id }))
            getAPIdata()
        }

    }
    function getAPIdata() {
        dispatch(getProduct())

        var t = setTimeout(() => {
            $('#DataTable').DataTable()
        }, 500)
        return t

    }
    useEffect(() => {
        let time = getAPIdata()
        return () => clearTimeout(time)

    }, [ProductStateData.length])
    return (
        <>
            <div className="page-content">

                <div className="container-fluid my-2">
                    <div className="row">
                        <div className="col-md-3">
                            <Sidebar />
                        </div>
                        <div className="col-md-9">
                            <h5 className='text-light bg-dark p-2 text-center'>Product
                                <Link to="/admin/product/create"> <i className="bi bi-plus float-end text-light "></i></Link></h5>
                            <div className="row">
                                <div className="table-responsive">
                                    <table className="table table-bordered" id="DataTable">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Maincategory</th>
                                                <th>Subcategory</th>
                                                <th>Brand</th>
                                                <th>Color</th>
                                                <th>Size</th>
                                                <th>BasePrice</th>
                                                <th>Discount</th>
                                                <th>FinalPrice</th>
                                                <th>Stock</th>
                                                <th>StockQuantity</th>
                                                <th>Pics</th>
                                                <th>Active</th>
                                                <th></th>
                                                <th></th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                ProductStateData.map(item => {
                                                    return <tr key={item.id}>
                                                        <td>{item.id}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.maincategory}</td>
                                                        <td>{item.subcategory}</td>
                                                        <td>{item.brand}</td>
                                                        <td>{item.color.join()}</td>
                                                        <td>{item.size.join()}</td>
                                                        <td>&#8377;{item.basePrice}</td>
                                                        <td>{item.discount}</td>
                                                        <td>&#8377;{item.finalPrice}</td>
                                                        <td>{item.stock ? "Yes" : "No"}</td>
                                                        <td>{item.stockQuantity}</td>
                                                        <td>
                                                            <div style={{ width: "250px" }}>
                                                                {
                                                                    item.pic.map(p => {
                                                                        return <Link to={`${import.meta.env.VITE_SITE_IMG_SERVER}/${p}`} target="_blank" key={item.id}><img src={`${import.meta.env.VITE_SITE_IMG_SERVER}/${p}`} width={50} height={50} className="m-2" /></Link>
                                                                    })
                                                                }

                                                            </div>
                                                        </td>


                                                        <td>{item.active ? "Yes" : "No"}</td>
                                                        <td><Link to={`/admin/product/update/${item.id}`}><i className='btn btn-primary bi bi-pencil-square'></i></Link></td>
                                                        <td><button onClick={() => deleteAPIdata(item.id)}><i className='btn btn-danger bi bi-trash'></i></button></td>

                                                    </tr>
                                                })
                                            }

                                        </tbody>


                                    </table>


                                </div>



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
