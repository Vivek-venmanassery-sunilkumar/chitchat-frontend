import {useReducer} from 'react';

const initialstate = {
    username: '',
    password: '',
}

function loginReducer(state, action) {
    switch(action.type){
        case 'SET_FIELD':
            return {
                ...state,
                [action.field]: action.value,
            };
        case 'RESET':
            return initialstate;
        default:
            return state
    }
}
export default function LoginForm(){
    const [state, dispatch] = useReducer(loginReducer, initialstate);
    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div>
                <label htmlFor="username">Username</label>
                <input
                type="username"
                id="username"
                value={state.username}
                onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                type="password"
                id='password'
                name='password'
                value={state.password}
                onChange={handleChange}
                 />
            </div>
            <button type='submit'>
                Login
            </button>
        </form>
    );  
}