import { Link } from 'react-router-dom'
import Sidebar from '../../../Components/Sidebar'
import { useEffect } from 'react'
import { deleteFeature, getFeature } from "../../../Redux/ActionCreators/FeatureActionCreator"

//to use dataTables.net
import $ from 'jquery'
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import { useDispatch, useSelector } from 'react-redux';

export default function AdminFeaturePage() {
    let FeatureStateData = useSelector(state => state.FeatureStateData)
    let dispatch = useDispatch()

    function deleteAPIdata(id) {
        if (confirm("Are You Sure !!! Want to Delete the Record!!")) {
            dispatch(deleteFeature({ id: id }))
            getAPIdata()
        }
    }

    function getAPIdata() {
        dispatch(getFeature())
        var t = setTimeout(() => {
            $('#DataTable').DataTable()
        }, 500)
        return t
    }

    useEffect(() => {
        let time = getAPIdata()
        return () => clearTimeout(time)
    }, [FeatureStateData.length])


    return (
        <>
            <div className="page-content">
                <div className="container-fluid my-2">
                    <div className="row">
                        <div className="col-md-3">
                            <Sidebar />
                        </div>
                        <div className="col-md-9">
                            <h5 className='text-light bg-dark p-2 text-center'>Feature
                                <Link to="/admin/feature/create"> <i className="bi bi-plus float-end text-light "></i></Link></h5>
                            <div className="row">
                                <div className="table-responsive">
                                    <table className="table table-bordered" id="DataTable">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Icon</th>
                                                <th>Short Description</th>
                                                <th>Active</th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                FeatureStateData.map(item => {
                                                    return <tr key={item.id}>
                                                        <td>{item.id}</td>
                                                        <td>{item.name}</td>
                                                        <td><span dangerouslySetInnerHTML={{ __html: item.icon }} className='text-primary'></span></td>
                                                        <td>{item.shortDescription}</td>
                                                        <td>{item.active ? "Yes" : "No"}</td>
                                                        <td><Link to={`/admin/feature/update/${item.id}`}><i className='btn btn-primary bi bi-pencil-square'></i></Link></td>
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
