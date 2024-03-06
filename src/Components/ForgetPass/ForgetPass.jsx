import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet'

   export default function ForgetPass() {

  const navigate = useNavigate();
  const [backendError, setBackendError] = useState(null);

  async function forgetpass(values) {
    try {
      const { data } = await axios.post('https://yomnaelshorbagy.onrender.com/forgetPassword', values);
      console.log(data);
      console.log(data.message);
      if (data && data.message === 'Please check your email for the verification code') {
        console.log(data);
        console.log(data.message);
        navigate('/verifycode');
      } else {
        setBackendError('An error occurred. Please try again.'); 
      }
    } catch (error) {
      handleLoginError(error);
    }
  }
  
  const handleLoginError = (error) => {
    console.error('Error in Forget password function:', error);
    if (error.response) {
      if (error.response.status === 404) {
        setBackendError('User not found.');
      } else {
        setBackendError(error.response.data.data.message || 'An error occurred. Please try again.');
      }
    } else if (error.request) {
      setBackendError('No response received from the server. Please try again.');
    } else {
      setBackendError('An error occurred. Please try again.');
    }
  };
  

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid Email').required('Email is required'),
  });

  const ForgetForm = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: forgetpass,
  });

  return (<>
  <Helmet>
  <title>Forget password </title>
  <meta name="description" content="Your page description" />
   </Helmet>

<div className="container">
      <h1 className='text-center mt-5'>Forget Password</h1>
      <Form className="w-75 mx-auto my-5 p-4 border rounded shadow bg-light" onSubmit={ForgetForm.handleSubmit}>
        {backendError && <Alert variant="danger">{backendError}</Alert>}

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={ForgetForm.values.email}
            onBlur={ForgetForm.handleBlur}
            onChange={ForgetForm.handleChange}
            placeholder="Enter your email"
            className="rounded-pill"
          />
          {ForgetForm.errors.email && ForgetForm.touched.email ? (
            <Alert variant="danger">{ForgetForm.errors.email}</Alert>
          ) : null}
        </Form.Group>
        {/* <Form.Group className="mb-1"> */}

        <Button type="submit" variant="info" className="w-100 rounded-pill">
          Forget Password
        </Button>

        <div className="text-center mt-3">
          <Link to="/verifycode" className="text-info">Verify Code</Link>
        </div>
        {/* </Form.Group> */}

      </Form>
    </div>
    </>
  );
}



