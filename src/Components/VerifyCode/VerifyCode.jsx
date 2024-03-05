
import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Alert} from 'react-bootstrap';
import { Helmet } from 'react-helmet'

 export default function VerifyCode() {

  const navigate = useNavigate();
  const [backendError, setBackendError] = useState(null);

  async function verifycode(values ) {
    try {
      const { data } = await axios.post('http://localhost:5000/verifyCode', values);

      if (data && data.message === 'Code verification successful') {
        navigate('/home');

      } else if (data.message === 'Invalid code or email') {
        setBackendError(data.message);
      }

    } catch (error) {
      handleLoginError(error);
    }
  }

  const handleLoginError = (error) => {
    console.error('Error in VerifiedCode function:', error);
    if (error.response) {
      setBackendError(error.response.data.data.message);
    } else if (error.request) {
      setBackendError('No response received from the server. Please try again.');
    } else {
      setBackendError('An error occurred. Please try again.');
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid Email').required('Email is required'),
  });

  const verifycodeForm = useFormik({
    initialValues: {
      email: '',
      resetCode: '',
    },
    validationSchema,
    onSubmit: verifycode,
  });

  return (
    <>
      <Helmet>
  <title>Verifycode</title>
  <meta name="description" content="Your page description" />
   </Helmet>

        <div className="container">
      <h1 className='text-center mt-5'>Verify Code</h1>
      <Form className="w-75 mx-auto my-5 p-4 border rounded shadow bg-light" onSubmit={verifycodeForm.handleSubmit}>
        {backendError && <Alert variant="danger">{backendError}</Alert>}

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={verifycodeForm.values.email}
            onBlur={verifycodeForm.handleBlur}
            onChange={verifycodeForm.handleChange}
            placeholder="Enter your email"
            className="rounded-pill"
          />
          {verifycodeForm.errors.email && verifycodeForm.touched.email ? (
            <Alert variant="danger">{verifycodeForm.errors.email}</Alert>
          ) : null}
        </Form.Group>

        <Form.Group controlId="resetCode" className="mb-3">
          <Form.Label>Verify Code</Form.Label>
          <Form.Control
            type="text"
            name="resetCode"
            value={verifycodeForm.values.resetCode}
            onBlur={verifycodeForm.handleBlur}
            onChange={verifycodeForm.handleChange}
            placeholder="Enter verification code"
            className="rounded-pill"
          />
          {verifycodeForm.errors.resetCode && verifycodeForm.touched.resetCode ? (
            <Alert variant="danger">{verifycodeForm.errors.resetCode}</Alert>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-1">
        <Button type="submit" variant="info" className="w-100 rounded-pill mb-3">
          Verified
        </Button>

        <div className="text-center">
          <Link to="/resetpass" className="text-info">Reset Password</Link>
        </div>
        </Form.Group>

      </Form>
    </div>
    </>
  );
}


