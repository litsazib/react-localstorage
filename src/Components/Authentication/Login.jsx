import React, {Fragment, useRef} from 'react';
import {Link} from "react-router-dom";
import {LoginCheck} from "../../APIServices/CRUDServices";
import {isEmpty,IsEmail,ErrorToast,SuccessToast} from "../../Helper/ValidationHelper";


const Login = ()=> {
  let passRef,emailRef=useRef();
  const SubmitLogin=()=>{
      let email=emailRef.value;
      let pass=passRef.value;
      if(IsEmail(email)){
          ErrorToast("Invalid Email Address")
      }
      else if(isEmpty(pass)){
          ErrorToast("Password Required")
      }
      else{
        if(LoginCheck(email,pass)){
            SuccessToast("Login Success");
            window.location.href="/read"
        }else {
            ErrorToast("Login Faild");
        }
      }
  }
  return (
    <Fragment>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-6 center-screen">
                    <div className="card w-90  p-4">
                        <div className="card-body">
                            <h4>SIGN IN</h4>
                            <br/>
                            <input ref={(input)=>emailRef=input} placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                            <br/>
                            <input ref={(input)=>passRef=input} placeholder="User Password" className="form-control animated fadeInUp" type="password"/>
                            <br/>
                            <button onClick={SubmitLogin} className="btn w-100 animated fadeInUp float-end btn-primary">Next</button>
                            <hr/>
                            <div className="float-end mt-3">

                                <span>
                                    <Link className="text-center ms-3 h6 animated fadeInUp" to="/FaceRegistration">Face ID Registry</Link>
                                    <span className="ms-1">|</span>
                                    <Link className="text-center ms-3 h6 animated fadeInUp" to="/Registration">Sign Up </Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default Login;
