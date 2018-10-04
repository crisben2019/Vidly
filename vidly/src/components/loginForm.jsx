import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

class LoginForm extends Form {
   state = {
      data: { username: '', password: '', agreeTerms: true },
      errors: {}
   }

   schema = {
      username: Joi.string().min(6).max(20).required().label('Username'),
      password: Joi.string().min(6).max(20).required().label('Password'),
      agreeTerms: Joi.any().valid(true).required().label('Agree terms')
   };
   
   doSubmit = ()=>{
      console.log('Submit', this.state.data);
   }

   render() {
      return (
         <div>
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
               {this.renderInput('username', 'Username')}
               {this.renderInput('password', 'Password', 'password')}
               {this.renderCheckBox('agreeTerms', <span>I agree the <a>use of terms</a>.</span>)}
               {this.renderButton('Login')}
            </form>
         </div>
      );
   }
}

export default LoginForm;