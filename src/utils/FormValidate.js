
export const formValidate = (email, password) =>{
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    if(!isEmailValid) return "E-Mail is Not Valid";
    if(!isPasswordValid) return "Password must contains one captial, one special, numbers and minimum 8 characters";

    return null;
}