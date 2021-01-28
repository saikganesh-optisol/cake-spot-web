import React,{useState,useContext} from 'react'
import './Signup.scss'

import GlobalVariableContext from '../../contexts/globalVariablesContext'
import UserContext from '../../contexts/userContext'

import {AiFillEye,AiFillEyeInvisible} from 'react-icons/ai'
import {MdInput} from 'react-icons/md'
import {ImCancelCircle} from 'react-icons/im'
import {IoMdAddCircleOutline} from 'react-icons/io'
import Button from '../../components/button/Button'

import axios from 'axios'

import cookies from 'js-cookie'

const Signup = () => {

    const [email,setEmail] = useState('')
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [phone,setPhone] = useState('')
    const [addresses,setAddresses] = useState([''])

    const [isPasswordVisible,setPasswordVisibility] = useState(false)

    const globalVariableContext = useContext(GlobalVariableContext)
    const {fieldIconColor} = globalVariableContext

    const userContext = useContext(UserContext)
    const {setCurrentUser} = userContext

    const handleAddressChange = (event,index) => {
        const value = event.target.value
        setAddresses(addresses => {
            let newAddresses = [...addresses]
            newAddresses[index] = value
            return newAddresses
        })
        return 
    }

    const addAddress = () => {
        const length = addresses.length
        if(length >= 3) return
        setAddresses(addresses => {
            let newAddresses = [...addresses]
            newAddresses.push('')
            return newAddresses
        })
    }

    const deleteAddress = (index) => {
        const length = addresses.length
        if(length-1 <= 0 ) return
        setAddresses(addresses => {
            let newAddresses = [...addresses]
            newAddresses.splice(index,1)
            return newAddresses
        })
    }

    const handleSignup = async (event) => {
        event.preventDefault()
        const response = await axios.post('http://localhost:3001/auth/signUp',{
            email,
            password,
            confirmPassword,
            username,
            phone,
            addresses : addresses.filter(address => address.length > 0)
        })
        
        const {data : {signedInUser,userToken}} = response
        cookies.set('react-ecommerce-user',userToken)
        setCurrentUser(signedInUser)
    }

    return(
        <div className="signup">
            <h1 className="signupText">SIGN UP</h1>
            <form className="signupForm" onSubmit={handleSignup}>
                <div className="formInputContainer">
                    <div className="fieldIcon">
                        <MdInput color={fieldIconColor} size='2rem'/>
                    </div>
                    <input 
                        type='text' 
                        className='formInput'
                        placeholder='Email'
                        value = {email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="formInputContainer">
                        <div className="fieldIcon">
                            <MdInput color={fieldIconColor} size='2rem'/>
                        </div>
                        <input 
                            type={isPasswordVisible ? 'text' : 'password'} 
                            className='formInput'
                            placeholder='Password'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <div className="fieldControlIcon">
                            {
                                isPasswordVisible ? 
                                    <AiFillEyeInvisible color={fieldIconColor} size='2rem' onClick={() => setPasswordVisibility(!isPasswordVisible)}/> 
                                    : 
                                    <AiFillEye color={fieldIconColor} size='2rem' onClick={() => setPasswordVisibility(!isPasswordVisible)}/>
                            }
                        </div>
                </div>
                <div className="formInputContainer">
                        <div className="fieldIcon">
                            <MdInput color={fieldIconColor} size='2rem'/>
                        </div>
                        <input 
                            type={isPasswordVisible ? 'text' : 'password'} 
                            className='formInput'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                        />
                        <div className="fieldControlIcon">
                            {
                                isPasswordVisible ? 
                                    <AiFillEyeInvisible color={fieldIconColor} size='2rem' onClick={() => setPasswordVisibility(!isPasswordVisible)}/> 
                                    : 
                                    <AiFillEye color={fieldIconColor} size='2rem' onClick={() => setPasswordVisibility(!isPasswordVisible)}/>
                            }
                        </div>
                </div>
                <div className="formInputContainer">
                    <div className="fieldIcon">
                        <MdInput color={fieldIconColor} size='2rem'/>
                    </div>
                    <input 
                        type='text' 
                        className='formInput'
                        placeholder='Full name'
                        value = {username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="formInputContainer">
                    <div className="fieldIcon">
                        <MdInput color={fieldIconColor} size='2rem'/>
                    </div>
                    <input 
                        type='text' 
                        className='formInput'
                        placeholder='Phone'
                        value = {phone}
                        onChange={(event) => setPhone(event.target.value)}
                    />
                </div>
                <div className="addressesContainer">
                    <div className="addressHeaderContainer">
                        <span className="addressHeader">Address</span>
                        {
                            addresses.length  < 3?
                            <IoMdAddCircleOutline color={fieldIconColor} size='2rem' onClick={addAddress}/>
                            :
                            null
                        }
                    </div>
                    {
                        addresses.map((address,index) => {
                            
                            return(
                                <div className="formInputContainer" key={index}>
                                    <div className="fieldIcon">
                                        <MdInput color={fieldIconColor} size='2rem'/>
                                    </div>
                                    <input 
                                        type='text' 
                                        className='formInput'
                                        placeholder= 'Address'
                                        value = {address}
                                        onChange={(event) => handleAddressChange(event,index)}
                                    />
                                    <div className="fieldControlIcon">
                                        {
                                            index !==0 || addresses.length !== 1 ? 
                                                <ImCancelCircle color={fieldIconColor} size='2rem' onClick={() => deleteAddress(index)}/> 
                                                : 
                                                null
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="submitButtonContainer" >
                    <Button type='submit' value='SIGN UP'/>
                </div>
            </form>
        </div>
    )
}

export default Signup