import uuid from "react-uuid";
import {reactLocalStorage} from 'reactjs-localstorage';
import {ErrorToast,SuccessToast} from "../Helper/ValidationHelper";

export function InsertRegistration(p_key,email,name,mobile,password){
    let PostBody={
        Email:email,
        Name:name,
        Mobile:mobile,
        Password:password,
    }

    try {
        sessionStorage.setItem(`${p_key}`, JSON.stringify(PostBody));
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }

}

export function InsertLocalStorage(ID_Number,Title_Name,Title_Description,PhotoData){

    let PostBody={
        AutoId:ID_Number,
        Title:Title_Name,
        Description:Title_Description,
        Photo:PhotoData,
        SysId:uuid()
    }

    try {
        reactLocalStorage.setObject(`${PostBody.AutoId}`, PostBody);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }

}


export function LoginCheck(email,pass){
    try {
        let Email = email
        let Password = pass
        var Result = JSON.parse(sessionStorage.getItem(Email));
        if(Email === Result.Email && Password === Result.Password) {
            // SuccessToast("Login Success");
            // window.location.href="/read"
            return true
        }else {
            // ErrorToast("Login Faild..")
            // window.location.href="/"
            return false
        }
        

    } catch (error) {
        return false
    }
}

export function RetrieveAll() {
    try {
        var Result = [];
        for (var i = 0; i<localStorage.length; i++) {
            Result[i] = reactLocalStorage.getObject(localStorage.key(i));
        }
        return Result;
        
    } catch (error) {
        return false;
    }
}

export function DeleteLocalStorage(id) {
    try {
        reactLocalStorage.remove(id);
        return true;
    } catch (error) {
        return false;
    }
}


export function ReadByID(id){
    try {
       let Result = reactLocalStorage.getObject(id);
        return Result;
    } catch (error) {
        return false;
    }
}

export function UpdateLocalStorage (id,payload) {
    try {
        reactLocalStorage.setObject(id,payload);
        return true;
    } catch (error) {
        return false;
    }
}

