import React, {Fragment, useEffect,useState,useRef} from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import QRCode from 'react-qr-code';
import {ReadByID} from "../../APIServices/CRUDServices";
import {withRouter} from "react-router";
const ViewDetails = (props) => {
    const pdfRef = useRef(null);
    const [Data,SetData]=useState({});

    const createPDF = async (id) => {
        const dl_button = document.querySelector('.btn-primary');
        dl_button.style.display = 'none';

        const pdf = new jsPDF("portrait", "pt", "a4");
        const content = pdfRef.current;
        pdf.html(content).then(() => {
            pdf.save(id+'.pdf');
            dl_button.style.display = 'block';
        });
    }

    const printPDF = ()=> {
        const domElement = pdfRef.current;
        html2canvas(domElement, { onclone: (document) => {
        document.getElementById('print-button').style.visibility = 'hidden'
        }}).then((canvas) => {
            const img = canvas.toDataURL('image/png')
            const pdf = new jsPDF("portrait", "pt", "a4")
            pdf.addImage(img, 'JPEG', 0, 0, 400, 800)
            pdf.save('your-filename.pdf')
    })}

    const makePDF = ()=> {
        const options = {
            background: '#f1f1f1',
            scale: 1,
            quality:1,
            pagebreak: {
                mode: 'avoid'
            }
        };
        const domElement = pdfRef.current;
        html2canvas(domElement, options).then((canvas) => {
            var imgData = canvas.toDataURL('image/png');
            var imgWidth = 209;
            var pageHeight = 296;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;
            var doc = new jsPDF('p', 'mm', 'a4');
            var position = 5; // give some top padding to first page
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            while (heightLeft >= 0) {
                position += heightLeft - imgHeight; // top padding for other pages
                doc.addPage();
                doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            doc.save('data.pdf');
        });
}

  

   

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
                                <div className="row" ref={pdfRef}>
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
                                        <QRCode title={toString(Data.Title)} value={toString(Data.id)} size={100} />
                                    </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-md-4  m-auto p-2">
                                        <button onClick={createPDF.bind(this,props.id)} className="btn btn-primary  animated fadeInUp w-100">Download Pdf</button>
                                        <button id="print-button" onClick={printPDF} className="btn btn-primary  animated fadeInUp w-100">Img-TO-PDF</button>
                                        <button onClick={makePDF} className="btn btn-primary  animated fadeInUp w-100">Make-PDF</button>
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