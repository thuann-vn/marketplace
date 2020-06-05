
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

export const validatePassword = (str)=>{
    if(!str){
        return true;
    }

    // Validate length
    if(str.length >= 8) {
        return 'Password length must be 8 character at least';
    }
    
    // // Validate capital letters
    // if(!str.test(/[A-Z]/g)) {
    //     return 'Password must contain a Capital letter';
    // }

    // if(!str.test(/[0-9]/g)) {
    //     return 'Password must contain one Number';
    // }

    // if(!str.test(/[0-9]/g)) {
    //     return 'Password must contain one Number';
    // }

    // if(!str.test(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g)) {
    //     return 'Password must contain one Special character';
    // }

    return true;
}