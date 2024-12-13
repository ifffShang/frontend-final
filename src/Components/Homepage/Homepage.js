import React, { useState } from 'react';
import { registerUser, loginUser } from '../../api';
import "./Homepage.css";
import Logo from "../../assets/images/Catlover.jpg"
import HomeImage from "../../assets/images/homepage.jpg"
import { Link } from 'react-router-dom';

const Homepage = () => {
    const [credentials, setCredentials] = useState({ username: '', password: ''});
    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const handleSignUp = async () => {
        try {
            const response = await registerUser(credentials);
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || "Sign-up failed");
        }
    };

    const handleSignIn = async () => {
        try {
            const response = await loginUser(credentials);
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || "Login failed");
        }
    };


    return (
        <div className='home'>
            <div className='home_top'>
                <div className='home_left'>
                    <img src={HomeImage} alt='homepage_background'></img>
                </div>

                <div className='home_right'>
                    <img className='logo' src={Logo} alt='logo'></img>
                    <h1 className='home_right_title'>Cat lovers are here</h1>
                    <h2 className='home_right_subtitle'>Join Catlover today!</h2>
                    <div className='home_right_buttons'>
                        <button className='btn_secondary'>
                            <Link to="/register">Sign up with email</Link>
                        </button>
                    <p className='policies'>
                            By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
                    </p>
                </div>
                    <div className='home_right_buttons'>
                        <h3>Already have an account?</h3>
                        <button className='btn_secondary'>
                            <Link to="/login">Sign in</Link>
                        </button>
                        {/* link to the home page */}
                        <button className='btn_primary'>
                        <Link to="/VisitorMain">Browse as a visitor</Link>
                            
                            </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage