import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Alert} from 'react-bootstrap';
import { tokeContext } from '../Context/tokenContext.js';
import { Helmet } from 'react-helmet'

export default function Login() {
  let { setToken } = useContext(tokeContext);

  const navigate = useNavigate();
  const [backendError, setBackendError] = useState(null);

  async function login(values ) {
    try {
      const { data } = await axios.post('https://yomnaelshorbagy.onrender.com/users/signin', values);


      if (data && data.message === 'welcome') {
        navigate('/home');
        storeToken(data.token);
        setToken(data.token);
      } else if (data.message === 'Invalid password') {
        setBackendError(data.message);
      }
        else if (data.message === 'please verify your account first ') {
        setBackendError(data.message);
      }  else if (data.message === 'u need to register first') {
        setBackendError(data.message);
      }
    } catch (error) {
      handleLoginError(error);
    }
  }

  const handleLoginError = (error) => {
    console.error('Error in login function:', error);
    if (error.response) {
      setBackendError(error.response.data.data.message);
    } else if (error.request) {
      console.log(error)
      setBackendError('No response received from the server. Please try again.');
    } else {
      setBackendError('An error occurred. Please try again.');
    }
  };

  const storeToken = (token) => {
    localStorage.setItem('token', token);
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid Email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: login,
  });

  return (<>
      <Helmet>
  <title>Login Page </title>
  <meta name="description" content="Your page description" />
   </Helmet>

     <div className="container">
      <h1 className='text-center mt-5'>Log in</h1>
      <Form className="w-75 mx-auto my-5 p-4 border rounded shadow bg-light" onSubmit={loginForm.handleSubmit}>
        {backendError && <Alert variant="danger">{backendError}</Alert>}

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={loginForm.values.email}
            onBlur={loginForm.handleBlur}
            onChange={loginForm.handleChange}
            placeholder="Enter your email"
          />
          {loginForm.errors.email && loginForm.touched.email ? (
            <Alert variant="danger">{loginForm.errors.email}</Alert>
          ) : null}
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={loginForm.values.password}
            onBlur={loginForm.handleBlur}
            onChange={loginForm.handleChange}
            placeholder="Enter your password"
          />
          {loginForm.errors.password && loginForm.touched.password ? (
            <Alert variant="danger">{loginForm.errors.password}</Alert>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-1">
        <Button type="submit" variant="info" className="w-100 mb-3">
          Log In
        </Button>

        <div className="text-center">
          <p className="mb-1">New Here? <Link to="/register" className="text-info">Register</Link></p>
          <p className="mb-0"><Link to="/ForgetPass" className="text-info">Forget Password</Link></p>
        </div>
        </Form.Group>

      </Form>
    </div>
    </>
  );
}

