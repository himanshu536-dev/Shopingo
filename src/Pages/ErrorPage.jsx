import React from 'react'
import Breadcrumb from "../Components/Breadcrumb"

export default function ErrorPage() {
    return (
        <>
            {/*start page content*/}
            <div className="page-content">

                {/*start breadcrumb*/}
                <Breadcrumb title="ErrorPage" />
                {/*end breadcrumb*/}

                <div className="text-cente fw-bold">
                    <h4 align="center">OOPS!!</h4>
                    <h5 align="center">404!! Page Not Found!</h5>
                </div>
            </div>
            {/*end page content*/}
        </>
    )
}
