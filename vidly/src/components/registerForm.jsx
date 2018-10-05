import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import * as userService from '../services/userService';
import auth from '../services/authService';

class RegisterForm extends Form {
   state = {
      data: { username: '', password: '', name: '', agreeTerms: true },
      errors: {}
   }

   schema = {
      username: Joi.string().email().required().label('Username'),
      password: Joi.string().min(5).max(20).required().label('Password'),
      name: Joi.string().required(),
      agreeTerms: Joi.any().valid(true).required().label('Agree terms')
   };
   
   doSubmit = async ()=>{
      try{
         const response = await userService.register(this.state.data);
         auth.loginWithJWT(response.headers['x-auth-token']);
         window.location = '/';
      }catch(ex){
         if(ex.response && ex.response.status === 400){
            const errors = {...this.state.errors};
            errors.username = ex.response.data;
            this.setState({errors});
         }
      }

   }

   render() {
      return (
         <div>
            <h1>Register</h1>
            <form onSubmit={this.handleSubmit}>
               {this.renderInput('username', 'Username')}
               {this.renderInput('password', 'Password', 'password')}
               {this.renderInput('name', 'Name')}
               {this.renderCheckBox('agreeTerms', <span>I agree the <a>use of terms</a>.</span>)}
               {this.renderButton('Register')}
            </form>
         </div>
      );
   }
}
 
export default RegisterForm;