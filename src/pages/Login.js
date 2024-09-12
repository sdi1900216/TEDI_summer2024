import React, {  useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { FaUserAstronaut, FaLock  } from "react-icons/fa"
import validateLogin from './ValidateLogin';

import { LoginAccount, checkActiveSession, Logout } from '../appwrite/api.ts';
import '../appwrite/config.js'
import { useUserContext } from '../context/authcontext.tsx';



export default function Login() {

    const {checkAuthUser, isPending: isUserLoading} = useUserContext();
    const navigate= useNavigate();

    const [values, setValues] = useState( { email:'', password:''})
    const [errors, setErrors]= useState({})
    const [isSubmitting, setIsSubmitting] = useState(false);
 

    const handleInput = (event) => {
        setValues(({ ...values, [event.target.name]: event.target.value}));
       }
    const handleSubmit= async (event)=> {
        //κάνε το validation
        event.preventDefault();
        console.log("Login button clicked!");
        console.log("Current form values (before validation):", values);

        
    // Έλεγχος αν υπάρχει ενεργή συνεδρία
    const existingSession = await checkActiveSession();
    if (existingSession) {
        console.log("User already logged in with active session.");
        // Μπορείς να κάνεις redirect στο Home 
        Logout();
        return;
    }

        const validationErrors = validateLogin(values);
        console.log("Validation errors:", validationErrors);  
        setErrors(validationErrors);

        if(Object.keys(validationErrors).length >0) {
            console.log("Entered here, at error >0 if:", validationErrors); 
            return;
        }
        //αν δεν υπάρχουν λάθη, κανε session
        setIsSubmitting(true);
        try {
            const session = await LoginAccount({
              email: values.email,
              password: values.password
            });
        
            if (!session) {
              console.log("Login failed!");
              return;
            } else {
                console.log("Login successful!");
            }
        
            const isLoggedIn = await checkAuthUser();
            if (isLoggedIn) {
              navigate('/Home');
            }
          } catch (error) {

              console.error('Error during login:', error);
              return;
    
          } finally {
            setIsSubmitting(false);
          }
    }

    return (
        
        <div className="wrapper">
            <form action='' onSubmit={handleSubmit}> 
                <h1> <strong>Welcome!</strong> </h1>
                <div className="input-box">
                    <input type='text'  placeholder='Email' name='email' onChange={handleInput} required/>
                    {errors.email && <span className='text'> {errors.email} </span>} 
                    <FaUserAstronaut className='icon' />
                </div>
                <div className="input-box">
                    <input type='password'  placeholder='Password' name='password' onChange={handleInput} required/>
                    {errors.password && <span className='text'> {errors.password} </span>} 
                    <FaLock className='icon'/>
                </div>
                <button type="submit"disabled={isSubmitting}> 
                    {isSubmitting ? 'Submitting...' : ""}
                    {isUserLoading ? ('Logging In...' ): 'Log in' } 

                </button>
                <div className='register-link'>
                    <p> First time here?  <Link to='/Signup'><strong>Sign Up </strong></Link></p>
                </div>
            </form>
            
        </div>
    )
}