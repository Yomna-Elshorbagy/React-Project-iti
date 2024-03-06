
// import React, { useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Form, Button, Alert} from 'react-bootstrap';

//  export default function ResetPassword() {

//   const navigate = useNavigate();
//   const [backendError, setBackendError] = useState<string | null>(null);

//   async function resetpassword(values : any) {
//     try {
//       const { data } = await axios.post('http://localhost:5000/resetPassword', values);
//         console.log(data)
//       if (data && data.message === 'reset success') {
//         navigate('/login');

//       } else if (data.message === 'User email is missing') {
//         setBackendError(data.message);
//       }
//         else if (data.message === 'User not found') {
//       setBackendError(data.message);
//     }
//     } catch (error) {
//       handleLoginError(error);
//     }
//   }

//   const handleLoginError = (error: any) => {
//     console.error('Error in resetpassword function:', error);
//     if (error.response) {
//       setBackendError(error.response.data.data.message);
//     } else if (error.request) {
//       setBackendError('No response received from the server. Please try again.' as string | null);
//     } else {
//       setBackendError('An error occurred. Please try again.'as string | null);
//     }
//   };


//   const validationSchema = Yup.object({
//     email: Yup.string().email('Invalid Email').required('Email is required'),
//     password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/, 'Password must be strong').required('Password is required'),
//   });

//   const loginForm = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//     },
//     validationSchema,
//     onSubmit: resetpassword,
//   });

//   return (
//     <Form className="w-50 mx-auto my-5" onSubmit={loginForm.handleSubmit}>
//       {backendError && <Alert variant="danger">{backendError}</Alert>}

//       <Form.Group controlId="email" className="mb-1">
//         <Form.Label>Email</Form.Label>
//         <Form.Control
//           type="text"
//           name="email"
//           value={loginForm.values.email}
//           onBlur={loginForm.handleBlur}
//           onChange={loginForm.handleChange}
//         />
//         {loginForm.errors.email && loginForm.touched.email ? (
//           <Alert variant="danger">{loginForm.errors.email}</Alert>
//         ) : null}
//       </Form.Group>

//       <Form.Group controlId="password" className="mb-1">
//         <Form.Label>Password</Form.Label>
//         <Form.Control
//           type="password"
//           name="password"
//           value={loginForm.values.password}
//           onBlur={loginForm.handleBlur}
//           onChange={loginForm.handleChange}
//         />
//         {loginForm.errors.password && loginForm.touched.password ? (
//           <Alert variant="danger">{loginForm.errors.password}</Alert>
//         ) : null}
//       </Form.Group>

//       <Form.Group className="mb-1">
//         <Button type="submit" variant="info" className="d-block ms-auto">
//           Change password
//         </Button>
//         <Link to="/login">Log in</Link>

//       </Form.Group>
//     </Form>
//   );
// }



import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';


export default function ResetPassword() {

    const navigate = useNavigate();
    const [backendError, setBackendError] = useState(null);

    async function reset(values) {
      try {
          const { data } = await axios.post('https://yomnaelshorbagy.onrender.com/resetPassword', values);
          console.log('data', data);
  
          if (data.message === 'reset success') {
              navigate('/login');
          } else {
              setBackendError(data.message || 'An error occurred. Please try again.');
          }
      } catch (error) {
          if (error.response && error.response.status === 404) {
              setBackendError('User not found. Please check your email and try again.');
          } else {
              handleLoginError(error);
          }
      }
  }
  
    const handleLoginError = (error) => {
      console.error('Error in login function:', error);
      if (error.response && error.response.data && error.response.data.data && error.response.data.data.message) {
          setBackendError(error.response.data.data.message);
          console.log(error)

      } else if (error.request) {
          setBackendError('No response received from the server. Please try again.');
      } else {
          setBackendError('An error occurred. Please try again.' );
      }
  };
  
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid Email').required('Email is required'),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{5,8}$/, 'Password must be strong').required('Password is required'),
    });

    const resetForm = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: reset,
    });

    return (
        <>

<div className="container">
      <h1 className='text-center mt-5'>Reset Password</h1>
      <Form className="w-75 mx-auto my-5 p-4 border rounded shadow bg-light" onSubmit={resetForm.handleSubmit}>
        {backendError && <Alert variant="danger">{backendError}</Alert>}

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={resetForm.values.email}
            onBlur={resetForm.handleBlur}
            onChange={resetForm.handleChange}
            placeholder="Enter your email"
            className="rounded-pill"
          />
          {resetForm.errors.email && resetForm.touched.email ? (
            <Alert variant="danger">{resetForm.errors.email}</Alert>
          ) : null}
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={resetForm.values.password}
            onBlur={resetForm.handleBlur}
            onChange={resetForm.handleChange}
            placeholder="Enter new password"
            className="rounded-pill"
          />
          {resetForm.errors.password && resetForm.touched.password ? (
            <Alert variant="danger">{resetForm.errors.password}</Alert>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-1">

        <Button type="submit" variant="info" className="w-100 rounded-pill mb-3">
          Reset Password
        </Button>
        </Form.Group>

      </Form>
    </div>

        </>

    );
}

