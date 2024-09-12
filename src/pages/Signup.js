
import React, {useState} from 'react'
import { FaUserAstronaut, FaRocket, FaAndroid, FaLock, /*FaPhoneAlt */ } from "react-icons/fa";
import validateSignup from './ValidateSignup';
//import { LoginAccount } from '../appwrite/api.ts';
import '../appwrite/config.js'

import { useNavigate} from 'react-router-dom'
import { useCreateUserAccountMut } from '../react-query/queries.ts';
import { useUserContext } from '../context/authcontext.tsx';

export default function Signup() {


    const {mutateAsync: CreateUserAccount, isPending: isCreatingUser}= useCreateUserAccountMut();
    const {checkAuthUser, isPending: isUserLoading} = useUserContext();
    const navigate= useNavigate();

    const [values, setValues] = useState( { firstname:'', lastname:'', email:'',/* phone:'', */ password:''})
    const [errors, setErrors]= useState({})
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value}));
        console.log("Current form values:", values);  // Θα εμφανίσει τα νέα values
    };

    const handleSubmit= async (event)=> {
        //κάνε το validation
        event.preventDefault();
        console.log("Submit button clicked!");
        const validationErrors = validateSignup(values);
        console.log("Validation errors:", validationErrors);  
        setErrors(validationErrors);

        if(Object.keys(validationErrors).length >0) {
            console.log("Found validation errors:", validationErrors); 
            return;
        }
        //αν δεν υπάρχουν λάθη, φτιάξε τα στοιχεία του χρήστη
        setIsSubmitting(true);
        try {
            const newUser = {
                firstname: values.firstname,
                lastname: values.lastname,
                email: values.email,
                //phone: values.phone,
                password: values.password
                
            };
            console.log("Creating user with:", newUser); // Debugging
            const newAccount = await CreateUserAccount(newUser);
            console.log('User created successfully:', newAccount);

        } catch (error) {
            console.error('Error creating user account:', error);

        } finally {
            setIsSubmitting(false);
        }
        /*
         const session = await LoginAccount({
                email: values.email,
                password: values.password,
         })
         if(!session) {
            return;
         }
         const isLoggedIn= await checkAuthUser();
         if(isLoggedIn) {
            setValues({ firstname: '', lastname: '', email: '', password: '' });
            navigate('/Login');
         } else {
            return;
         } */
    }


 //θεωρούμε πως το account name δεν έχει φίλτρα όπως τα πεδία email, password οπότε δεν έχει error messages πέρα από το required field

    return (
        <div>
                    <div className="wrapper">
            <form action='' onSubmit={handleSubmit}> 
                <h1> <strong>Sign Up</strong> </h1>
                <div className="input-box">
                    <input type='text'  placeholder='First name' name='firstname' onChange={handleInput}  value={values.firstname} required/>
                    <FaAndroid  className='icon'/>
                </div>
                <div className="input-box">
                    <input type='text'  placeholder='Last name' name='lastname' onChange={handleInput} value={values.lastname} required/>
                    <FaRocket className='icon'/>
                </div>
                <div className="input-box">
                    <input type='text'  placeholder='Email' name='email' onChange={handleInput} value={values.email} required/>
                    {errors.email && <span className='text'> {errors.email} </span>} 
                    <FaUserAstronaut className='icon'/>
                </div>
                <div className="input-box">
                    <input type='password'  placeholder='Password' name='password' onChange={handleInput} value={values.password} required/>
                    {errors.password && <span className='text'> {errors.password} </span>} 
                    <FaLock className='icon'/>
                </div>
            
                    <button type="submit" disabled={isSubmitting}>
                    {isCreatingUser ? ('Submitting...' ): 'Sign Up' }
                    </button>
                
            </form>            
        </div>
        </div>
    )
}