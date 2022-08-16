import React, {Fragment, useRef} from 'react';
import {ErrorToast, isEmpty, SuccessToast,AutoNumber,getBase64} from "../../Helper/ValidationHelper";
import {InsertLocalStorage} from "../../APIServices/CRUDServices";
import FullScreenLoader from "../Common/FullScreenLoader";
import {withRouter} from "react-router";
const CreateForm = (props) => {
    let IDNumber,TitleName,TitleDescription,userImgRef,userImgView,Loader=useRef();
    const PreviewImage = ()=>{
        let ImgFile = userImgRef.files[0];
        getBase64(ImgFile).then((base64Img)=>{
            userImgView.src=base64Img;
        })
    }
    const SaveData = () => {
      let ID_Number=IDNumber.value;
      let Title_Name=TitleName.value;
      let Title_Description=TitleDescription.value;
      let PhotoData = userImgView.src;

      if(isEmpty(Title_Name)){
        ErrorToast("Title Name Required");
      }
      else if(isEmpty(Title_Description)){
        ErrorToast("Description Required");
      }
      else{
        Loader.classList.remove("d-none")
        InsertLocalStorage(ID_Number,Title_Name,Title_Description,PhotoData)
        if(true){
            Loader.classList.add("d-none")
            SuccessToast("Data Save Success");
            props.history.push("/read");
        }
        else {
            ErrorToast("Request Fail Try Again");
        }

      }
    }
    return (
        <Fragment>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header pb-0">
                            <h4 className="animated fadeInUp text-center">Create To-do list</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-8  p-2 m-auto">
                                    <label className="animated fadeInUp">ID Number</label>
                                    <input ref={(input)=>IDNumber=input} readOnly="true" value={"ID-"+AutoNumber()} type="text" className="form-control animated fadeInUp"/>
                                </div>
                                <div className="col-md-8  p-2 m-auto">
                                    <label className="animated fadeInUp">Title Name</label>
                                    <input ref={(input)=>TitleName=input} type="text" className="form-control animated fadeInUp"/>
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
                                    <button onClick={SaveData} className="btn btn-primary  animated fadeInUp w-100">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <div className="d-none" ref={(div)=>Loader=div}>
                <FullScreenLoader/>
            </div>
        </Fragment>
    );
};
export default withRouter(CreateForm);