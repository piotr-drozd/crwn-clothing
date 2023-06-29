import "./sign-in-form.component.scss"
import FormInput from "../form-input/form-input.component"
import { useState } from "react"
import {signInAuthWithEmailAndPassword,
        signInWithGooglePopup, 
        createUserDocumentFromAuth,
        } from '../../utils/firebase.utils'
import Button from '../../components/button/button.component';

const defaultFormFields = {
    email : '',
    password: '',
}

const SignInForm = () => {

const [formFields, setFormFields] = useState(defaultFormFields);
const {email, password} = formFields;

const resetFormFields = () => {
    setFormFields(defaultFormFields)
}

const signInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
};

const handleChange = (event) => {
    const {name, value} = event.target
    setFormFields({...formFields, [name] : value})
}

const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const { user } = await signInAuthWithEmailAndPassword(email, password);
        console.log(user);
        resetFormFields();
    } catch (error) {
        switch(error.code) {
            case 'auth/wrong-password':
                alert('incorrect password for email')
                break;
            case 'auth/user-not-found':
                alert('no user associated with this email')
                break;
            default:
                console.log(error);
        } 
    }
}

return (
    <div className='sign-up-container'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit = {() => { }}>
            <FormInput
                label='Email'
                required
                type='email'
                name='email'
                value={email}
                onChange = {handleChange}
            />
            <FormInput
                label='Password'
                required
                type='password'
                name='password'
                value={password} 
                onChange = {handleChange}
            />
            <div className = 'buttons-container'>
                <Button type='submit' onClick={handleSubmit}>Sign In</Button>
                <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
            </div>        
        </form>

    </div>
)
}

export default SignInForm;