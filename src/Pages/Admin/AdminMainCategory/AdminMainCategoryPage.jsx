import { Link } from 'react-router-dom'
import Sidebar from '../../../Components/Sidebar'
import { useEffect } from 'react'
import { deleteMaincategory, getMaincategory } from "../../../Redux/ActionCreators/MaincategoryActionCreator"

//to use dataTables.net
import $ from 'jquery'
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import { useDispatch, useSelector } from 'react-redux';

export default function AdminMaincategoryPage() {
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)

    let dispatch = useDispatch()

    function deleteAPIdata(id) {
        if (confirm("Are You Sure !!! Want to Delete the Record!!")) {
            dispatch(deleteMaincategory({ id: id }))
            getAPIdata()
        }
    }

    function getAPIdata() {
        dispatch(getMaincategory())
        var t = setTimeout(() => {
            $('#DataTable').DataTable()
        }, 500)
        return t
    }

    useEffect(() => {
        let time = getAPIdata()
        return () => clearTimeout(time)
    }, [MaincategoryStateData.length])

    return (
        <>
            <div className="page-content">
                <div className="container-fluid my-2">
                    <div className="row">
                        <div className="col-md-3">
                            <Sidebar />
                        </div>
                        <div className="col-md-9">
                            <h5 className='text-light bg-dark p-2 text-center'>Maincategory
                                <Link to="/admin/maincategory/create"> <i className="bi bi-plus float-end text-light "></i></Link></h5>
                            <div className="row">
                                <div className="table-responsive">
                                    <table className="table table-bordered" id="DataTable">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Pic</th>
                                                <th>Active</th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                MaincategoryStateData.map(item => {
                                                    return <tr key={item.id}>
                                                        <td>{item.id}</td>
                                                        <td>{item.name}</td>
                                                        <td><Link to={`${import.meta.env.VITE_SITE_IMG_SERVER}/${item.pic}`} target="_blank" ><img src={`${import.meta.env.VITE_SITE_IMG_SERVER}/${item.pic}`} width={50} height={50} /></Link></td>
                                                        <td>{item.active ? "Yes" : "No"}</td>
                                                        <td><Link to={`/admin/maincategory/update/${item.id}`}><i className='btn btn-primary bi bi-pencil-square'></i></Link></td>
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
