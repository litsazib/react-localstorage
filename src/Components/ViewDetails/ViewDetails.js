import React, {Fragment, useEffect,useState} from 'react';
import { jsPDF } from "jspdf";
import QRCode from 'react-qr-code';
import {ReadByID} from "../../APIServices/CRUDServices";
import {withRouter} from "react-router";
const ViewDetails = (props) => {

    const [Data,SetData]=useState({});

    const createPDF = async (id) => {
        const pdf = new jsPDF("portrait", "pt", "a4");
        const data = await document.querySelector("#pdf");
        pdf.html(data).then(() => {
            // pdf.output('dataurlnewwindow');
            // let base64Image = $('#qr_code img').attr('src');
            // pdf.addImage(base64Image, 'png', 0, 0, 40, 40);
            pdf.save(id+'.pdf');
        });
    };

    useEffect(()=>{
        SetData(ReadByID(props.id));
    },[]);

    return (
        <Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header pb-0">
                                <h4 className="animated fadeInUp text-center">View Details</h4>
                            </div>
                            <div className="card-body">
                                <div className="row" id="pdf">
                                    <div className="col-md-8  p-2 m-auto">
                                        <label className="animated fadeInUp"><span className="lblTag">ID Number:</span><strong>{props.id}</strong></label>
                                    </div>
                                    <div className="col-md-8  p-2 m-auto">
                                        <label className="animated fadeInUp"><span className="lblTag">Title Name:</span><strong>{Data.Title}</strong></label>
                                    </div>
                                    <div className="col-md-8  p-2 m-auto">
                                        <label className="animated fadeInUp"><span className="lblTag">Title Description:</span><strong>{Data.Description}</strong></label>
                                    </div>
                                    <div className="col-md-8  p-2 m-auto">
                                        <label className="animated fadeInUp"><span className="lblTag">System ID:</span><strong>{Data.SysId}</strong></label>
                                    </div>
                                    <div className="col-md-8  p-2 m-auto">
                                        <label className="animated fadeInUp"><span className="lblTag">Photo:</span></label>
                                        <br/>
                                        <img width={"150px"}  className="icon-nav-img-lg mt-3" src={Data.Photo} alt=""/>
                                    </div>
                                    <div className="col-md-8  p-2 m-auto">
                                    {/* <QRCode
                                        title={toString(Data.Title)}
                                        value={toString(Data.id)}
                                        size="100"
                                    /> */}
                                    </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-md-4  m-auto p-2">
                                        <button onClick={createPDF.bind(this,props.id)} className="btn btn-primary  animated fadeInUp w-100">Download Pdf</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </Fragment>
    );
};
export default withRouter(ViewDetails);