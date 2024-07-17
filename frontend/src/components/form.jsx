import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',

    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isLogin) {
            axios
                .post('http://localhost:8000/api/login/', {
                    username: formData.username,
                    password: formData.password,
                })
                .then((response) => {
                    alert('Login Successful', response.data);
                })
                .catch((error) => {
                    alert('There was an error logging in!', error);
                });
        } else {
            axios
                .post('http://localhost:8000/api/register/', 
                    {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                })
                .then((response) => {
                    alert('Registration Successful', response.data);
                })
                .catch((error) => {
                    alert('There was an error registering!', error);
                });
        }
    };

    return (
        <div>
            <h4>{isLogin ? 'Login' : 'Register'}</h4>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <>

                        <input
                            type="text"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            name="username"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            name="email"
                            required
                        />
                        <input type="password" placeholder='password' onChange={handleChange} name='password' required/>
                    </>
                )}

                {isLogin && (
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.user_login}
                        onChange={handleChange}
                        required
                    />
                )}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Switch to Register' : 'Switch to Login'}
            </button>
        </div>
    );
};

export default Form;