
export const validateEmail = (email)=>{
    if(!email){
        return true;
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    return reg.test(email);
}

export const validatePhoneNumber = (phone)=>{
    if(!phone){
        return true;
    }
    let reg = /^[0-9]+$/;
    return reg.test(phone) && phone.length>=9 && phone.length<=12;
}