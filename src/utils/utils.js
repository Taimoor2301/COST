import axios from "axios"
import { baseURL } from "src/Constants/Constants"
import api from "src/hooks/useApi"

export function checkValidation(userData, selectedRoles) {
  if (userData.firstName.length < 3) {
    return 'first name should be atleast 3 characters long'
  }
  if (userData.lastName.length < 3) {
    return 'last name should be atleast 3 characters long'
  }
  if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userData.email) === false) {
    return 'please enter a valid email'
  }
  if (/^\+(?:[0-9] ?){6,14}[0-9]$/.test(userData.phoneNumber) === false) {
    return 'please enter a valid phone number'
  }
  if (!selectedRoles.length) {
    return 'please select atleast one role'
  } else return ''
}

export function signUpCheck(userData) {
  if (userData.firstName.length < 3) {
    return 'first name should be atleast 3 characters long'
  }
  if (userData.lastName.length < 3) {
    return 'last name should be atleast 3 characters long'
  }
  if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userData.email) === false) {
    return 'please enter a valid email'
  }
  if (/^\+(?:[0-9] ?){6,14}[0-9]$/.test(userData.phoneNumber) === false) {
    return 'please enter a valid phone number'
  }
  if (userData.password.length < 6) {
    return 'password must be atleast 6 characters long'
  }
  if (userData.password !== userData.confirmPassword) {
    return 'passwords are not matching'
  } else return ''
}

export function checkPersonalUpdate(userData){

  if (userData.firstName.length < 3) {
    return 'first name should be atleast 3 characters long'
  }
  if (userData.lastName.length < 3) {
    return 'last name should be atleast 3 characters long'
  }
  if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userData.email) === false) {
    return 'please enter a valid email'
  }
  if (/^\+(?:[0-9] ?){6,14}[0-9]$/.test(userData.phoneNumber) === false) {
    return 'please enter a valid phone number'
  } else{
    return ""
  }

}


export async function uploadImage(file){
  try {
    const data = new FormData();
    data.append('File', file)

    const res = await axios.post(baseURL+'/file/file.uploadfileasync',data, {
      headers:
      {
      accept: 'application/json',
      tenant: 'root',
      'Content-Type': 'multipart/form-data',
      Authorization:`Bearer ${localStorage.getItem('accessToken')}`
    }})




    return res.data.data.data
  } catch (error) {
    console.log(error)
     throw new Error("Upload error")


  }
}

