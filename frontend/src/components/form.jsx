import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        user_name: '',
        email: '',
        phone_number: '',
        password: '',
        gender: '',
        date_of_birth: '',
        user_login: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isLogin) {
            axios
                .post('http://localhost:8000/api/login/', {
                    user_login: formData.user_login,
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
                .post('http://localhost:8000/api/register/', {
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    user_name: formData.user_name,
                    email: formData.email,
                    phone_number: formData.phone_number,
                    password: formData.password,
                    gender: formData.gender,
                    date_of_birth: formData.date_of_birth,
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
                            placeholder="First Name"
                            value={formData.first_name}
                            onChange={handleChange}
                            name="first_name"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={formData.last_name}
                            onChange={handleChange}
                            name="last_name"
                        />
                        <input
                            type="text"
                            placeholder="Username"
                            value={formData.user_name}
                            onChange={handleChange}
                            name="user_name"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            name="email"
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            name="phone_number"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            name="password"
                        />
                        <input
                            type="date"
                            placeholder="Date of Birth"
                            value={formData.date_of_birth}
                            onChange={handleChange}
                            name="date_of_birth"
                        />
                    </>
                )}

                {isLogin && (
                    <input
                        type="text"
                        name="user_login"
                        placeholder="Username or Email"
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