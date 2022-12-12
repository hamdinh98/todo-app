import React, { useState } from 'react';
import './Login.style.css';
import Navbar from "../navbar/Navbar.component";
import {useNavigate} from "react-router-dom";

 interface LoginFormProps {
    onSubmit: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({onSubmit}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(username, password);
        navigate('/list');
    };

    return (
        <form onSubmit={handleSubmit}>
                <label className="login-label">
                    username:
                    <input
                        className="login-input"
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </label>
                <label className="login-label">
                    password:
                    <input
                        className="login-input"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </label>
                <button className="login-button" type="submit">login</button>
            </form>
    );
};

export default LoginForm ;
export type { LoginFormProps };
