import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

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
   
   doSubmit = ()=>{
      console.log('Submit', this.state.data);
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