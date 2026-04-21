import React from 'react'
import Sidebar from '../../Components/Sidebar'

export default function AdminHomePage() {
    return (
        <>
            {/* start page-content */}
            <div className="page-content">
                <div className="container-fluid my-2">
                    <div className="row">
                        <div className="col-md-3">
                            <Sidebar />
                        </div>
                        <div className="col-md-9">
                            <h5 className='text-light bg-dark p-2 text-center'>Admin Panel</h5>
                            <div className="row">
                                <div className="col-md-4">
                                    <img src="/assets/images/avatars/nouser.png" width="100%" height="220" alt="..." />
                                </div>
                                <div className="col-md-8">
                                    <table className="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <th>Name</th><td>MR. XYZ</td>
                                            </tr>
                                            <tr>
                                                <th>User Name</th><td>MR. XYZ</td>
                                            </tr>
                                            <tr>
                                                <th>Email</th><td>MR.XYZ@gmail.com</td>
                                            </tr>
                                            <tr>
                                                <th>Mobile No.</th><td>98730XXXXX</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <button className='btn btn-dark text-light w-100'>Update Profile</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end page-content */}
        </>
    )
}
