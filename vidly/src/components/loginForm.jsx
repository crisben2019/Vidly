import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { Redirect } from 'react-router-dom';

import auth from '../services/authService';

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

   doSubmit = async () => {
      try {
         await auth.login(this.state.data.username, this.state.data.password);
         const {state} = this.props.location;
         
         window.location = state ? state.from.pathname : '/';
      } catch (ex) {
         if (ex.response && ex.response.status === 400) {
            const errors = { ...this.state.errors };
            errors.username = ex.response.data;
            this.setState({ errors });
         }
      }
   }

   render() {
      if(auth.getCurrentUser()){
         return <Redirect to="/" />
      }
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