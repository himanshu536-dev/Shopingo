import React from 'react'

export default function Breadcrumb({title}) {
    return (
        <>
            {/* <!--start breadcrumb--> */}
            <div className="py-4 border-bottom">
                <div className="container-fluid">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 d-flex justify-content-center">
                            <li className="breadcrumb-item"><a href="javascript:;">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">{title}</li>
                        </ol>
                    </nav>
                </div>
            </div>
            {/* <!--end breadcrumb--> */}
        </>
    )
}
