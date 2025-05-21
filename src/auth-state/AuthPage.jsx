import { useState } from "react"
import LoginForm from "./login-page/LoginForm"
import SignUp from "./signup-page/SignUp"

const AuthPage = ()=>{
    const [isLogin, setIsLogin] = useState(true)

    const switchToSignUp = () => setIsLogin(false)
    const switchToLogin = () => setIsLogin(true)

    return (
        isLogin ? <LoginForm onSwitchToSignup = {switchToSignUp}/> : <SignUp onSwitchToLogin = {switchToLogin}/>
    )
}

export default AuthPage