import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Link, ActionFunctionArgs, redirect, useSubmit, useActionData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserRegisterInputs, UserRegisterInputsKeys } from "../../types/domain/UserRegisterInputs";
import { DefaultDataError } from "../../types/vendor/DefaultDataError";
import { RequestError } from "../../types/vendor/RequestError";
import { getTokenData, isAuthenticated } from "../../util/auth";
import { requestBackend } from "../../util/request";
import './styles.css';


const UserRegisterForm = () => {

  const { register, handleSubmit, setValue, setError, formState: { errors } } = useForm<UserRegisterInputs>();
  const [wasSubmited, setWasSubmited] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = (data: UserRegisterInputs) => {
    const password = data.password;
    const confirmPassword = data.confirmPassword;
    console.log(password, confirmPassword);
    if(password !== confirmPassword) {
      console.log('Passwords are diferent');
      setError("password", {
        message: "Passwords must be the same"
      });
      setError("confirmPassword", {
        message: "Passwords must be the same"
      });
      return;
    }
    console.log(data);
    const config: AxiosRequestConfig = {
      method: 'post',
      url: '/users',
      data
    }
    requestBackend(config)
      .then((responpe) => {
        toast.success('User creted with success');
        navigate('login');
      })
      .catch((e) => {
        console.log(e);
        toast.error('Error in create new user');
      });
  }

  const getInputClassName = (fieldName: UserRegisterInputsKeys) => {
    return wasSubmited ? ((errors[fieldName]?.message) ? 'is-invalid' : 'is-valid') : '';
  }

  return (
    <div className="col-12" id="user-register-form-container">
      <h1 className="mb-4">Create Account</h1>
      <h1 className="mb-4">{ getTokenData()?.user_name }</h1>

      <Form method="post" id="user-register-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
              { ...register('email', {
                required: 'Required field',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: `Invalid email`
                }
              })}
            type="email"
            id="email"
            name="email"
            placeholder="Choose your best email"
            className={`form-control ${getInputClassName("email")}`}
          ></input>

          <div className="invalid-feedback d-block">
            { errors.email?.message }
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            { ...register('password', {
              required: 'Required field',
              minLength: {
                value: 6,
                message: 'Password should have at least 6 letters'
              }
            }) }
            type="password"
            id="password"
            name="password"
            className={`form-control ${getInputClassName("password")}`}
            placeholder="Password"
          ></input>
          <div className="invalid-feedback d-block">
            { errors.password?.message }
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
          <input
            { ...register('confirmPassword', {
              required: 'Required field',
              minLength: {
                value: 6,
                message: 'Password should have at least 6 letters'
              }
            }) }
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={`form-control ${ getInputClassName("confirmPassword") }`}
            placeholder="Confirm your password"
          ></input>

          <div className="invalid-feedback d-block">
            { errors.confirmPassword?.message }
          </div>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary" onClick={() => setWasSubmited(true)}>Create account</button>
        </div>
        <p>Already have an account? <Link to={"login"}>Click here</Link> to login</p>
      </Form>
    </div>
  );
}

export default UserRegisterForm;
