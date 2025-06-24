import { useReducer, useState } from "react"
import { motion } from "framer-motion";
import api from "../../axios";

const initialState = {
    email: '',
    username: '',
    password: '',
    confirmpassword: '',
}

const signUpReducer = (state, action) => {
    switch (action.type){
        case "UPDATE_FIELD":
            return {...state, [action.field]: action.value};
        case "RESET":
            return initialState
    }
}

const SignUp = ({onSwitchToLogin})=>{
    const [signupstate, dispatch] = useReducer(signUpReducer, initialState)
    const [error, setError] = useState({type: null, message: ''});
    const handleChange = (e)=>{
       dispatch({
        type: "UPDATE_FIELD",
        field: e.target.id,
        value: e.target.value,
    }) 
    }
    const handleSubmit =async (e) =>{
        
        e.preventDefault()
        setError({type: null, message: ''})
        if(signupstate.password !== signupstate.confirmpassword){
            setError({
                type: 'password',
                message: 'Passwords do not match!'
            });
            return;
        }
        try {
            const response = await api.post('signup/', {
                email: signupstate.email, 
                username: signupstate.username,
                password: signupstate.password
            });
            dispatch({type: "RESET"})
            onSwitchToLogin()
        }catch (err){
            setError({
                type: 'api',
                message: err.response?.data?.message || 'Signup failed. Please try again.' 
            })
        }
    };

    return (
    <div className="min-h-screen flex items-center justify-center bg-[#2C3930]">
        <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{
            type: "spring",
            stiffness: 400,
            damping: 15,
            bounce: 0.5,
            }}
            className="bg-[#F8EDE3] p-8 rounded-xl shadow-lg w-full max-w-md border border-[#D0B49F]/30"
        >
            <h2 className="text-3xl font-bold mb-8 text-center text-[#99BC85]">Sign Up</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-5">
                <label htmlFor="email" className="block text-[#7D6E83] text-sm font-medium mb-2">
                Email
                </label>
                <input
                type="email"
                id="email"
                value={signupstate.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#D0B49F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D9C59] focus:border-transparent bg-white/80 text-[#4A4A4A]"
                placeholder="Enter your email"
                />
            </div>
            <div className="mb-5">
                <label htmlFor="username" className="block text-[#7D6E83] text-sm font-medium mb-2">
                Username
                </label>
                <input
                type="text"
                id="username"
                value={signupstate.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#D0B49F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D9C59] focus:border-transparent bg-white/80 text-[#4A4A4A]"
                placeholder="Choose a username"
                />
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block text-[#7D6E83] text-sm font-medium mb-2">
                Password
                </label>
                <input
                type="password"
                id="password"
                value={signupstate.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border border-[#D0B49F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D9C59] focus:border-transparent bg-white/80 text-[#4A4A4A]
                    ${error.type === 'password' ? 'border-2 border-red-500': 'border border-[#D0B49]'}`}
                placeholder="Enter a password"
                />
            </div>
            <div className="mb-7">
                <label htmlFor="confirmPassword" className="block text-[#7D6E83] text-sm font-medium mb-2">
                Confirm Password
                </label>
                <input
                type="password"
                id="confirmpassword"
                value={signupstate.confirmpassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 border border-[#D0B49F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D9C59] focus:border-transparent bg-white/80 text-[#4A4A4A]
                ${error.type === 'password' ? 'border-2 border-red-500':'border border-[#D0B49F]'}`}
                placeholder="Confirm your password"
                />
            </div>
            {error.type === 'password' && (
                <p className = 'text-red-500 text-sm mb-4'>{error.message}</p>
            )}

            {error.type === 'api' && (
                <p className="text-red-500 text-sm mb-4">{error.message}</p>
            )}
            <button
                type="submit"
                className="w-full bg-[#5D9C59] text-white py-3 px-4 rounded-lg hover:bg-[#4A7A47] transition-colors duration-300 font-medium shadow-sm"
            >
                Sign Up
            </button>
            </form>
            <div className="mt-6 text-center">
            <p className="text-[#7D6E83]">
                Already have an account?{" "}
                <button onClick={onSwitchToLogin} className="text-[#5D9C59] font-medium hover:underline focus:outline-none">
                Login
                </button>
            </p>
            </div>
        </motion.div>
        </div>
    )
}

export default SignUp