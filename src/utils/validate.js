export const checkValidData = (email, password) => {

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password);
    
    if(!isEmailValid) return "Email id is not Valid";
    if(!isPasswordValid) return "Password is not Valid";

    return null;

}