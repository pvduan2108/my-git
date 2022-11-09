import moment from "moment";
import bcrypt from "bcryptjs";
const saltRounds = 10;
export const validateEmail = email => {
    if (!email) return "Email is required";
    if (!String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
        return "Email is invalid"
    }
    return ""
};

export const validatePassword = password => {
    let upperCase = 0
    let lowerCase = 0
    if (password.length > 50) {
        return `Password can not exceed 50 characters`;
    }
    if (password.length < 8) {
        return "New password can not be less than 8 characters"
    }

    for (let i=0; i < password.length; i++){
        if (password.charAt(i) === password.charAt(i).toUpperCase() && password.charAt(i).match(/[a-z]/i)){
            upperCase = 1;
            break;
        }
    }

    for (let i=0; i < password.length; i++){
        if (password.charAt(i) === password.charAt(i).toLowerCase() && password.charAt(i).match(/[a-z]/i)){
            lowerCase = 1;
            break;
        }
    }
    if (upperCase === 0) {
        return "New password must have at least 1 uppercase character"
    }
    if (lowerCase === 0) {
        return "New password must have at least 1 lowercase character"
    }
    if (!(/\d/.test(password))) {
        return "New password must have at least 1 number character"
    }
    if (!(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password))) {
        return "New password must have at least 1 special character"
    }
    if (localStorage.getItem('firstTime') === "1" && bcrypt.compareSync(password, localStorage.getItem('mockPassword')) ) {
        return "U have to input new password"
    }
    return ""
}

export const validateNumberPhone = numberPhone => {
    if (!numberPhone) return "NumberPhone is required";
    if (!numberPhone.match(/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/)) {
        return "NumberPhone is invalid"
    }
    return ""
}
export const validateUsername = username => {
    if(!username) return "Username is required";
    if(username.length < 5) return "At least 5 characters";
    return ""
}

export const validateID = id => {
    if (!id) return "ID is required";
    if (!id.match(/^[0-9]+$/)) {
        return "ID is invalid"
    }
    return ""
}

export const validateMaxLength = (input, fieldName) => {
    if (input.length === 0) {
        return `This field is required`;
    }
    if (input.length > 50) {
        return `This field can not exceed 50 characters`;
    }
    return ""
}
export const validateCategoryCode = categoryCode => {
    if(!categoryCode||categoryCode.length===0) return "categoryCode is required";
    if(categoryCode.length >3) return "Max 3 characters";
    if(!String(categoryCode)
    .toLowerCase()
    .match(/^[a-zA-Z0-9]*$/))  return "Invalid special characters";
    return "";
}
export const validateLengthMax = (input, fieldName, max) => {
    if (input.length > max) {
        return `${fieldName} can not exceed ${max} characters`;
    }
    return ""
}

export const validateFieldName = (input,fieldName, max) => {
    if(!input ||input.length === 0) return `${fieldName} is required`;
    if(input.length >max) return `${fieldName} can not exceed ${max} characters`;
    // if(!String(input)
    // .toLowerCase()
    // .match(/^[a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$/)) 
    // return "Invalid special characters";
    return ""
}
export const validateNotEmpty = (input, fieldName) => {
    if(input.length ===0) {
        return `${fieldName} can not empty`;
    }
    return ""
}
export const validateState = state => {
    if(state === -1) {
        return "Need to select state"
    } 
    return ""
}

export const validateNotNull = input => {
    if (input.length == 0) {
        return "This field is required";
    }
    return ""
}
export const validateBirthdate = (day1, day2) => {
    if (day1 === null) {
        return "This field is required";
    }
    if (Math.ceil(Math.abs(Date.parse(day2) - Date.parse(day1))  / (1000 * 60 * 60 * 24 * 365)) < 18) {
        return "User is under 18. Please select a different date";
    }
    return "";
}

export const validateJoinedDate = (day1, day2) => {
    if (day2 === null) {
        return "This field is required";
    }
    if (moment(day2).format('LLLL').toString().includes("Saturday") || moment(day2).format('LLLL').toString().includes("Sunday")) {
        return "Joined date is Saturday or Sunday. Please select a different date"
    }
    if (Math.ceil(Date.parse(day2) - Date.parse(day1)) > 0 || day1 === null) {
        return "";
    }
    return "Joined date is not later than Date of Birth. Please select a different date"
}

export const validateTheSame = (after, before) => {
    if ((after.type === before.type) && (after.gender === before.gender)
        && checkDateEqual(after.dateOfBirth, before.birthDate) && checkDateEqual(after.joinedDate, before.joinedDate)) {
        return "This is same as the old one !"
    }
    return ""
}

const checkDateEqual = (day1, day2) => {
    if (Math.ceil(Date.parse(day2) - Date.parse(day1)) === 0) {
        return true;
    }
    return false
}

export const oldPassword = input => {
    if (!input) {
        return "Old password is required";
    }
    if (input.length > 50) {
        return "This field not exceed 50 characters"
    }
    if (!bcrypt.compareSync(input, localStorage.getItem('mockPassword'))) {
        return "Password is incorrect";
    }
    return "";
}

export const newPassword = (oldOne, newOne) => {
    let upperCase = 0
    let lowerCase = 0
    if (newOne.length === 0) {
        return "New password is required"
    }
    if (newOne.length > 50) {
        return "New password not exceed 50 characters"
    }
    if (newOne.length < 8) {
        return "New password can not be less than 8 characters"
    }

    for (let i=0; i < newOne.length; i++){
        if (newOne.charAt(i) === newOne.charAt(i).toUpperCase() && newOne.charAt(i).match(/[a-z]/i)){
            upperCase = 1;
            break;
        }
    }

    for (let i=0; i < newOne.length; i++){
        if (newOne.charAt(i) === newOne.charAt(i).toLowerCase() && newOne.charAt(i).match(/[a-z]/i)){
            lowerCase = 1;
            break;
        }
    }
    if (upperCase === 0) {
        return "New password must have at least 1 uppercase character"
    }
    if (lowerCase === 0) {
        return "New password must have at least 1 lowercase character"
    }
    if (!(/\d/.test(newOne))) {
        return "New password must have at least 1 number character"
    }
    if (!(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(newOne))) {
        return "New password must have at least 1 special character"
    }
    if (newOne === oldOne && bcrypt.compareSync(oldOne, localStorage.getItem('mockPassword'))) {
        return "New password must be different from the old one"
    }
    return "";
}

export const confirmTheSame = (pw1, pw2) => {
    if(pw1.trim().length===0) {
        return "This field is required";
    }
    if (pw1 !== pw2) {
        return "Confirm password must be the same as new password"
    }
    return "";
}

export const validateFirstName = firstName => {
    return validateMaxLength(firstName, "First name")
}

export const validateLastName = lastName => {
    return validateMaxLength(lastName, "Last name")
}

export const trimString = stringInput => {
    let a = stringInput.split(" ");
    let result = "";
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== "") {
            result += a[i] + " ";
        }
    }
    return result;
}

export const removeSpace = stringInput => {
    let a = stringInput.split(" ");
    let result = "";
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== "") {
            result += a[i];
        }
    }
    return result;
}

export const validateSearch = input => {
    if (input.length > 50) {
        return `Search box can not exceed 50 characters`;
    }
    return ""
}