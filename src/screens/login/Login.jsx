import React,{useState,useContext} from 'react'
import axios from 'axios'
import './Login.scss'

import UserContext from '../../contexts/userContext'
import GlobalVariableContext from '../../contexts/globalVariablesContext'

import {FaUserCircle} from 'react-icons/fa'
import {RiKey2Fill} from 'react-icons/ri'
import {AiFillEye,AiFillEyeInvisible,AiOutlineTwitter} from 'react-icons/ai'
import {FaFacebookSquare,FaGoogle} from 'react-icons/fa'

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import Button from '../../components/button/Button'

import cookies from 'js-cookie'

const Login = (props) => {

    const {history : {push} } = props

    const {setCurrentUser} = useContext(UserContext)
    const {fieldIconColor,serverDomain} = useContext(GlobalVariableContext)

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [isPasswordVisible,setPasswordVisibility] = useState(false)

    const handleEmaillogin = async (event) => {
        event.preventDefault()
        const serverResponse = await axios.post(`${serverDomain}/auth/email`,{
            email,
            password
        })
        const {data : {signedInUser,userToken}} = serverResponse
        cookies.set('react-ecommerce-user',userToken)
        setCurrentUser(signedInUser)
    }

    const handleFacebookResponse = async (response) => {

        try
        {
            const {accessToken,id} = response
            const serverResponse = await axios.post(`${serverDomain}/auth/facebook`,{
                accessToken,
                oAuthId : id,
            })
            const {data : {signedInUser,userToken}} = serverResponse
            console.log(userToken)
            cookies.set('react-ecommerce-user',userToken)
            setCurrentUser(signedInUser)
        }
        catch(error)
        {
            console.log(error)
        }
    }

    return(
        <div className="login">
            <h1 className="signinText">SIGN IN</h1>
            <form className="emailLogin" onSubmit={handleEmaillogin}>
                <div className="loginInputs">
                    <div className="formInputContainer">
                        <div className="fieldIcon">
                            <FaUserCircle color={fieldIconColor} size='2rem'/>
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
                            <RiKey2Fill color={fieldIconColor} size='2rem'/>
                        </div>
                        <input 
                            type={isPasswordVisible ? 'text' : 'password'} 
                            className='formInput'
                            placeholder='Password'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <div className="viewPasswordIcon">
                            {
                                isPasswordVisible ? 
                                    <AiFillEyeInvisible color={fieldIconColor} size='2rem' onClick={() => setPasswordVisibility(!isPasswordVisible)}/> 
                                    : 
                                    <AiFillEye color={fieldIconColor} size='2rem' onClick={() => setPasswordVisibility(!isPasswordVisible)}/>
                            }
                        </div>
                    </div>
                    
                </div>
                <div className="loginOptions">
                    <div className="rememberMe">
                        <input type="checkbox" className="rememberCheck"/>
                        <span className="rememberText">Remember me</span>
                    </div>
                    <Button value='LOG IN' type='submit' />
                </div>
                <div className="otherLinks">
                    <span onClick={() => push('/signup')} className="signUpLink">Register now</span>
                    <span className="forgotPasswordLink">Forgot password?</span>
                </div>
            </form>
            <div className="orOption">or</div>
            <div className="oLogin">
                <div className="oAuthButtonContainer">
                    <div className="buttonIcon facebookIcon">
                        <FaFacebookSquare size='2rem' color='white'/>
                    </div>
                    <FacebookLogin
                        appId="2816679821983874"
                        autoLoad
                        callback={handleFacebookResponse}
                        render={renderProps => (
                            <input 
                                type="button" 
                                className="oAuthButton facebookButton" 
                                value='LOGIN IN WITH FACEBOOK'
                                onClick = {renderProps.onClick}
                            />
                        )}
                    />

                </div>
                <div className="oAuthButtonContainer" >
                    <div className="buttonIcon twitterIcon">
                        <AiOutlineTwitter size='2rem' color='white'/>
                    </div>
                    <input 
                        type="button" 
                        className="oAuthButton twitterButton" 
                        value='LOGIN IN WITH TWITTER'
                    />
                </div>
                <div className="oAuthButtonContainer">
                    <div className="buttonIcon googleIcon">
                        <FaGoogle size='2rem' color='white'/>
                    </div>
                    <input 
                        type="button" 
                        className="oAuthButton googleButton" 
                        value='LOGIN IN WITH GOOGLE'
                    />
                </div>
            </div>
        </div>
    )
}

export default Login