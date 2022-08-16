import React,{useRef} from 'react';
import {isEmpty,IsEmail,IsMobile,SuccessToast,ErrorToast} from "../../Helper/ValidationHelper";
import {InsertRegistration} from "../../APIServices/CRUDServices";
import {withRouter} from "react-router";

const Registration = (props) => {
  let emailRef,nameRef,mobileRef,passwordRef=useRef();
  const onRegistration = () => {
        let p_key = emailRef.value;
        let email=emailRef.value;
        let name=nameRef.value;
        let mobile=mobileRef.value;
        let password= passwordRef.value;

        if(IsEmail(email)){
            ErrorToast("Valid Email Address Required !")
        }
        else if(isEmpty(name)){
            ErrorToast("First Name Required !")
        }
        else if(!IsMobile(mobile)){
            ErrorToast("Valid Mobile  Required !")
        }
        else if(isEmpty(password)){
            ErrorToast("Password Required !")
        }
        else{
            InsertRegistration(p_key,email,name,mobile,password)
            if(true){
                SuccessToast("Registration Success");
                props.history.push("/");
            }
            else {
                ErrorToast("Request Fail Try Again");
            }
        }
    }

  return (
    <div className="container">
        <div className="row  justify-content-center">
            <div className="col-md-10 col-lg-10 center-screen">
                <div className="card animated fadeIn w-100 p-3">
                    <div className="card-body">
                        <h4>Sign Up</h4>
                        <hr/>
                        <div className="container-fluid m-0 p-0">
                            <div className="row m-0 p-0">
                                <div className="col-md-6 p-2">
                                    <label>Email Address</label>
                                    <input ref={(input)=>emailRef=input}  placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                                </div>
                                <div className="col-md-6 p-2">
                                    <label>Name</label>
                                    <input ref={(input)=>nameRef=input} placeholder="Name" className="form-control animated fadeInUp" type="text"/>
                                </div>
                                <div className="col-md-6 p-2">
                                    <label>Mobile Number</label>
                                    <input ref={(input)=>mobileRef=input} placeholder="Mobile" className="form-control animated fadeInUp" type="mobile"/>
                                </div>
                                <div className="col-md-6 p-2">
                                    <label>Password</label>
                                    <input ref={(input)=>passwordRef=input} placeholder="User Password" className="form-control animated fadeInUp" type="password"/>
                                </div>

                            </div>
                            <div lassName="row mt-2 p-0">
                                <div className="col-md-4 p-2">
                                    <button onClick={onRegistration} className="btn mt-3 w-100 float-end btn-primary animated fadeInUp">Complete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default withRouter(Registration);
