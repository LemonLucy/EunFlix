import { useState } from 'react';
import './Login.css';
import PropTypes from 'prop-types';

const Register = ({ toggleCard }) => {
    const [email,setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const onSubmit=() =>{
        if (password !== confirmPassword) {
            setError("Passwords do not match");
        } else {
            setError("");
            console.log("User registered:", { email, password });
        }
    }

    return (
        <div className="login-card" id="register">
        <h1>Sign Up</h1>
        <div className="input">
            <input id="register-email" type="email" placeholder="Email" 
            onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="register-email"></label>
        </div>
        <div className="input">
            <input id="register-password" type="password" placeholder="Password" 
            onChange={(e) => setPassword(e.target.value)}/>
            <label htmlFor="register-password"></label>
        </div>
        <div className="input">
            <input id="confirm-password" type="password" placeholder="Confirm Password" 
            onChange={(e) => setConfirmPassword(e.target.value)}/>
            <label htmlFor="confirm-password"></label>
        </div>
        {error && <p className="error-message">{error}</p>}
        <span className="checkbox remember">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms" className="read-text">
            I have read <b>Terms and Conditions</b>
            </label>
        </span>
        <button onClick={onSubmit}>Register</button>
        <a href="#" className="account-check" onClick={toggleCard}>
            Already have an account? <b>Sign in</b>
        </a>
        </div>
    );
};
Register.propTypes = {
    toggleCard: PropTypes.func.isRequired,  // Prop validation added here
  };
  

export default Register;
