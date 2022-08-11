import React, {Fragment, useEffect,useRef} from 'react';
import FullScreenLoader from "../Common/FullScreenLoader";
import {ErrorToast, isEmpty, SuccessToast,getBase64} from "../../Helper/ValidationHelper";
import {ReadByID, UpdateLocalStorage} from "../../APIServices/CRUDServices";
import {withRouter} from "react-router";
import uuid from "react-uuid";
const UpdateForm = (props) => {
    let TitleName,TitleDescription,userImgRef,userImgView=useRef();
    const PreviewImage = ()=>{
        let ImgFile = userImgRef.files[0];
        getBase64(ImgFile).then((base64Img)=>{
            userImgView.src=base64Img;
        })
    }
    const UpdateData = () => {
        let payload = {
            AutoId:props.id,
            Title:TitleName.value,
            Description:TitleDescription.value,
            Photo:userImgView.src,
            SysId:uuid()
        }
        if(isEmpty(payload.Title)){
            ErrorToast("Title Name Required");
        }
        else if(isEmpty(payload.Description)){
            ErrorToast("Title Description Required");
        }else {
            UpdateLocalStorage(props.id,payload)
            if(true){
                SuccessToast("Data Udpate Success")
                props.history.push("/");
            }
            else {
                ErrorToast("Request Fail Try Again");
            }
        }
    }
    useEffect(()=>{
        TitleName.value =  ReadByID(props.id).Title
        TitleDescription.value =  ReadByID(props.id).Description
        userImgView.src =  ReadByID(props.id).Photo
    })
    return (
        <Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header pb-0">
                                <h4 className="animated fadeInUp text-center">To-do Update</h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-8  p-2 m-auto">
                                        <label className="animated fadeInUp">ID Number</label>
                                        <input readOnly="true" value={props.id} type="text" className="form-control animated fadeInUp"/>
                                    </div>
                                    <div className="col-md-8  p-2 m-auto">
                                        <label className="animated fadeInUp">Title Name</label>
                                        <input ref={(input)=>TitleName=input}  type="text" className="form-control animated fadeInUp"/>
                                    </div>
                                    <div className="col-md-8  p-2 m-auto">
                                        <label className="animated fadeInUp">Title Description</label>
                                        <textarea ref={(input)=>TitleDescription=input} type="text" className="form-control animated fadeInUp"/>
                                    </div>
                                    <div className="col-md-8  p-2 m-auto">
                                        <input onChange={PreviewImage}  ref={(input)=>userImgRef=input} className="form-control animated fadeInUp" type="file"/>
                                        <img  ref={(input)=>userImgView=input} width={"150px"}  className="icon-nav-img-lg mt-3" src="" alt=""/>
                                    </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-md-4  m-auto p-2">
                                        <button onClick={UpdateData} className="btn btn-primary  animated fadeInUp w-100">Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <div className="d-none">
                    <FullScreenLoader/>
                </div>
            </Fragment>
    );
};
export default withRouter(UpdateForm);