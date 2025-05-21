import { useReducer } from "react"
import { motion } from "framer-motion"

const initialState = {
    username: '', 
    password: '',
}

const loginFormReducer = (state, action) => {
    switch(action.type){
        case 'UPDATE_FIELD':{
            return (
                {
                    ...state,
                    [action.field]: action.value,
                }
            )
        }
        case 'RESET': {
            return initialState;
        }
        default:
            return state
    }
}

const LoginForm = ({onSwitchToSignup}) => {
    const [loginstate, dispatch] = useReducer(loginFormReducer, initialState);

    const handleChange = (e)=>{
        dispatch({
            type: "UPDATE_FIELD",
            field: e.target.id,
            value: e.target.value,
        });
    };
    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch({type: "RESET"});
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
            <h2 className="text-3xl font-bold mb-8 text-center text-[#99BC85]">Login</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-5">
                <label htmlFor="username" className="block text-[#7D6E83] text-sm font-medium mb-2">
                Username
                </label>
                <input
                type="text"
                id="username"
                value={loginstate.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#D0B49F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D9C59] focus:border-transparent bg-white/80 text-[#4A4A4A]"
                placeholder="Enter your username"
                />
            </div>
            <div className="mb-7">
                <label htmlFor="password" className="block text-[#7D6E83] text-sm font-medium mb-2">
                Password
                </label>
                <input
                type="password"
                id="password"
                value={loginstate.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#D0B49F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D9C59] focus:border-transparent bg-white/80 text-[#4A4A4A]"
                placeholder="Enter your password"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-[#5D9C59] text-white py-3 px-4 rounded-lg hover:bg-[#4A7A47] transition-colors duration-300 font-medium shadow-sm"
            >
                Login
            </button>
            </form>
            <div className="mt-6 text-center">
            <p className="text-[#7D6E83]">
                Don't have an account?{" "}
                <button
                onClick={onSwitchToSignup}
                className="text-[#5D9C59] font-medium hover:underline focus:outline-none"
                >
                Sign up
                </button>
            </p>
            </div>
        </motion.div>
    </div>
    )
}


export default LoginForm