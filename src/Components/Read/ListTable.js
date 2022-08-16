import React, {useEffect, useState} from 'react';
import {RetrieveAll,DeleteLocalStorage} from "../../APIServices/CRUDServices";
import {ErrorToast, SuccessToast,limit} from "../../Helper/ValidationHelper";
import {withRouter} from "react-router";
const ListTable = (props) => {

    let [DataList,SetDataList]=useState([]);

    useEffect(()=>{
        SetDataList(RetrieveAll())
    },[])

    const DeleteItem=(id)=> {
        DeleteLocalStorage(id)
        if(true){
            SuccessToast("Delete Success")
            props.history.push("/read")
        }
        else{
            ErrorToast("Something wrong!");
        }
    }

    const UpdateItem=(id)=>{
        props.history.push("/update/"+id)
    }

    const ViewDetails = (id)=>{
        props.history.push("/view/"+id)
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card list-card">
                        <div className="card-header pb-0">
                            <h4>Todo List</h4>
                        </div>
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">ID</th>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Photo</th>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Title</th>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Description</th>
                                    <th className="text-secondary opacity-7">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    DataList.map((item,index)=>{
                                        return (
                                            <tr key={index+2}>
                                                <td>
                                                    <div className="d-flex  animated fadeInUp px-2 py-1">
                                                        <div className="d-flex flex-column justify-content-center">
                                                            <h6 className="mb-0 text-sm">{item.AutoId}</h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex  animated fadeInUp px-2 py-1">
                                                        <div className="d-flex flex-column justify-content-center">
                                                            <img className="icon-nav-img-lg photo mt-3" src={item.Photo} alt="photo"/>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <h6 className="mb-0 animated fadeInUp text-sm">{item.Title}</h6>
                                                </td>
                                                <td>
                                                    <h6 className="mb-0 animated fadeInUp text-sm">
                                                        {limit(item.Description)+"..."}
                                                    </h6>
                                                </td>
                                                <td>
                                                    <div className="btn-group animated fadeInUp" role="group" aria-label="Basic example">
                                                        <button onClick={DeleteItem.bind(this,localStorage.key(index))}  className="btn btn-danger "><i className="fa fa-trash-alt"/></button>
                                                        <button onClick={UpdateItem.bind(this,localStorage.key(index))} className="btn  btn-success "><i className="fa fa-edit"/></button>
                                                        <button onClick={ViewDetails.bind(this,localStorage.key(index))} className="btn  btn-success "><i className="fa fa-eye"/></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );




};

export default withRouter(ListTable);