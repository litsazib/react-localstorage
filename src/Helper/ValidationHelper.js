import cogoToast from "cogo-toast";
let EmailRegx = /\S+@\S+\.\S+/;
let MobileRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;

class ValidationHelper{

    isEmpty(value){
        if(value.length===0){
            return true;
        }
        else {
            return false
        }
    }
    IsEmail(value) {
        return !EmailRegx.test(value);
    }

    IsMobile(value){
        return MobileRegx.test(value);
    }

    SuccessToast(msg){
        cogoToast.success(msg, {position:"bottom-center"})
    }
    ErrorToast(msg){
        cogoToast.error(msg, {position:"bottom-center"})
    }
    AutoNumber() {
        return Math.floor(100 + Math.random() * 900);
    }
    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }
    limit(element){
        var max_chars = 30;
        var str = element;
        if(str.length > max_chars) {
         return str = str.substring(0,max_chars);
        }
    }
    TextToSpece(text) {
        var msg = new SpeechSynthesisUtterance();
        msg.text = text
        return window.speechSynthesis.speak(msg);
    }
    


}

export const {isEmpty,IsEmail,IsMobile,SuccessToast,ErrorToast,AutoNumber,getBase64,limit,TextToSpece}=new ValidationHelper();