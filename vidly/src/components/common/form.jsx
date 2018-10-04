import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Checkbox from './checkbox';
import DropDownList from './dropDownList';

class Form extends Component {
   state = {
      data: {},
      errors: {}
   }

   validateProperty = input => {
      const obj = { [input.name]: input.type === 'checkbox' ? input.checked : input.value };
      const schema = { [input.name]: this.schema[input.name] };
      const { error } = Joi.validate(obj, schema);
      return error ? error.details[0].message : null;
   }

   validate = () => {
      const options = { abortEarly: false };
      const { error } = Joi.validate(this.state.data, this.schema, options);
      if (!error) {
         return null;
      }
      console.log(error);
      const errors = {};
      error.details.map(d => 
         errors[d.path[0]] = d.message
      );
      return errors;
   }

   handleSubmit = e => {
      e.preventDefault();
      const errors = this.validate();
      this.setState({ errors: errors || {} });
      if (errors) return;
      this.doSubmit();
   }

   handleChange = ({ currentTarget: input }) => {
      const errors = { ...this.state.errors };
      const errorMessage = this.validateProperty(input);
      if (errorMessage) {
         errors[input.name] = errorMessage;
      } else {
         delete errors[input.name];
      }
      const data = { ...this.state.data };
      if (input) {
         data[input.name] = input.type === 'checkbox' ? input.checked : input.value;
      }
      this.setState({ errors, data });
   }

   renderButton(label) {
      return <button disabled={this.validate() ? 'disabled' : ''} type="submit" className="btn btn-primary">{label}</button>;
   }

   renderInput(name, label, type = 'text') {
      return <Input name={name} label={label} value={this.state.data[name]} onChange={this.handleChange} error={this.state.errors[name]} type={type} />;
   }

   renderCheckBox(name, label) {
      return (
         <Checkbox name={name} value={this.state.data[name]} onChange={this.handleChange} error={this.state.errors[name]}>
            {label}
         </Checkbox>
      );
   }

   renderDropDownList(name, label, data) {
      return (
         <DropDownList 
            name={name} 
            label={label} 
            value={this.state.data[name]} 
            defaultValue={this.state.data[name]} 
            onChange={this.handleChange} 
            error={this.state.errors[name]} 
            data={data}
         />
      );
   }
}

export default Form;