import axios from "axios"
import { useState } from "react";

const AuthPage = (props) => {
    const [username, setUsername] = useState();
    const [secret, setSecret] = useState();
    const [email, setEmail] = useState();
    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();

    const onLogin = (e) => {
        e.preventDefault();
        // const { value } = e.target[0];
        axios.post(
            "http://localhost:3001/login",
            { username, secret}
        )
        .then((r) => props.onAuth({...r.data, secret}))
        .catch((e) => console.log(JSON.stringify(e.response.data)));
    };

    const onSignup = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/signup", {
            username,
            secret,
            email,
            first_name,
            last_name
        })
        .then((r) => props.onAuth({...r.data, secret}))
        .catch((e) => console.log(JSON.stringify(e.response.data)));
    }

    return (
        <div className="background">
            <form onSubmit={onLogin} className="form-card">
                <div className="form-title">Welcome 👋</div>
                <div className="form-subtitle">Set a username to get started</div>

                <div className="auth">
                    <input 
                        className="auth-input" 
                        placeholder="Username" 
                        type="text" 
                        name="username" 
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input 
                        className="auth-input"
                        placeholder="Password" 
                        type="password" 
                        name="password" 
                        onChange={(e) => setSecret(e.target.value)}
                    />
                    <button className="auth-button" type="submit">Login</button>
                </div>
            </form>

            <form onSubmit={onSignup} className="form-card">
                <div className="form-title">or SignUp</div>
                <div className="form-subtitle">Create Account and Let's Chat</div>
                <div className="auth">
                    <input
                        type="text"
                        name="username"
                        className="auth-input"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        name="secret"
                        className="auth-input"
                        placeholder="Password"
                        onChange={(e) => setSecret(e.target.value)}
                    />
                    <input
                        type="text"
                        name="email"
                        className="auth-input"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        name="first_name"
                        className="auth-input"
                        placeholder="First name"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        type="text"
                        name="last_name"
                        className="auth-input"
                        placeholder="Last name"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <button className="auth-button" type="submit">SignUp</button>
                 </div>
            </form>
        </div>
    );
};

export default AuthPage;