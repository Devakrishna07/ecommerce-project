import React, { useState, useEffect } from 'react';
import '../styles/LoginAndSignup.css';

const LoginAndSignup = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData,setFormData] = useState({
                 
           username:"",
           email:"",
           password:"",
    });

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    useEffect(() => {
        setTimeout(() => {
            setIsLogin(true);
        }, 200);
    }, []);

    //Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

     // Handle form submit for login/signup
     const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? "/login/" : "/register/";

        try {
            const response = await axios.post(API_URL + endpoint, formData);
            if (isLogin) {
                localStorage.setItem("accessToken", response.data.access); // Store JWT Token
                alert("Login successful!");
                window.location.href = "/dashboard"; // Redirect after login
            } else {
                alert("Signup successful! You can now log in.");
                setIsLogin(true);
            }
        } catch (error) {
            alert(error.response?.data?.error || "Something went wrong");
        }
    };


    return (
        <div id="container" className={isLogin ? 'container sign-in' : 'container sign-up'}>
            <div className="row">
                <div className="col align-items-center flex-col sign-up">
                    <div className="form-wrapper align-items-center">
                        <div className="form sign-up">
                            <div className="input-group">
                                <i className='bx bxs-user'></i>
                                <input type="text" placeholder="Username" />
                            </div>
                            <div className="input-group">
                                <i className='bx bx-mail-send'></i>
                                <input type="email" placeholder="Email" />
                            </div>
                            <div className="input-group">
                                <i className='bx bxs-lock-alt'></i>
                                <input type="password" placeholder="Password" />
                            </div>
                            <div className="input-group">
                                <i className='bx bxs-lock-alt'></i>
                                <input type="password" placeholder="Confirm password" />
                            </div>
                            <button>
                                Sign up
                            </button>
                            <p>
                                <span>
                                    Already have an account?
                                </span>
                                <b onClick={toggleForm} className="pointer">
                                    Sign in here
                                </b>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col align-items-center flex-col sign-in">
                    <div className="form-wrapper align-items-center">
                        <div className="form sign-in">
                            <div className="input-group">
                                <i className='bx bxs-user'></i>
                                <input type="text" placeholder="Username" />
                            </div>
                            <div className="input-group">
                                <i className='bx bxs-lock-alt'></i>
                                <input type="password" placeholder="Password" />
                            </div>
                            <button>
                                Sign in
                            </button>
                            <p>
                                <b>
                                    Forgot password?
                                </b>
                            </p>
                            <p>
                                <span>
                                    Don't have an account?
                                </span>
                                <b onClick={toggleForm} className="pointer">
                                    Sign up here
                                </b>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row content-row">
                <div className="col align-items-center flex-col">
                    <div className="text sign-in">
                        <h2>
                            Welcome
                        </h2>
                    </div>
                    <div className="img sign-in">
                    </div>
                </div>
                <div className="col align-items-center flex-col">
                    <div className="img sign-up">
                    </div>
                    <div className="text sign-up">
                        <h2>
                            Join with us
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginAndSignup;
