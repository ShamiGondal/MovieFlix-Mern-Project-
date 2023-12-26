import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import robotImg from '../assests/robot.png';

const Signup = (props) => {
  const localhost = `https://movieflix-server-side-deployment-production.up.railway.app`
  // const localhost = `http://localhost:4000`
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;

    if (password !== cpassword) {
      props.showAlert("Passwords don't match", 'danger');
      return;
    }

    try {
      const response = await fetch(`${localhost}/api/auth/createUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const json = await response.json();

      if (json.token) {
        localStorage.setItem('token', json.token);
        navigate('/login'); // Redirect to the login page
        props.showAlert('Account Created Successfully', 'success');
      } else {
        props.showAlert(json.message || 'Invalid Credentials', 'danger');
      }
    } catch (error) {
      console.error('Error during signup:', error.message);
      props.showAlert('An error occurred during signup', 'danger');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-center align-items-center ">
        <lord-icon
          src="https://cdn.lordicon.com/xaveftpj.json"
          trigger="hover"
          style={{ width: '150px', height: '150px' }}
        ></lord-icon>
      </div>
      <div className="container bg-white rounded-2 shadow-sm pb-5 px-5 mt-2 mb-5">
        <h1 className="fs-2 text-center fw-bold mb-5 pt-3">Signup your Account</h1>
        <div className="row">
          <div className="col">
            <div className=" bg-light rounded-5 mt-3 p-4 ">
              <h1 className="fs-md-4 fs-lg-4 fs-5 mx-5">Hey, Welcome to the MovieFlix</h1>
              <img className="w-75 rounded-5 " src={robotImg} alt="" />
            </div>
          </div>
          <div className="col">
            <form onSubmit={handleSubmit}>
              <div className="form-group my-2">
                <label htmlFor="text">Name</label>
                <input
                  type="text"
                  className="form-control my-2"
                  id="name"
                  name="name"
                  aria-describedby="emailHelp"
                  value={credentials.name}
                  onChange={onChange}
                  placeholder="Enter your name"
                />
                <label htmlFor="text">Email address</label>
                <input
                  type="email"
                  className="form-control my-2"
                  id="email"
                  name="email"
                  aria-describedby="emailHelp"
                  value={credentials.email}
                  onChange={onChange}
                  placeholder="Enter your email"
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group my-3">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control my-2"
                  id="password"
                  name="password"
                  minLength={5}
                  required
                  value={credentials.password}
                  onChange={onChange}
                  placeholder="Enter your password"
                />
                <label htmlFor="cpassword">Confirm Password</label>
                <input
                  type="password"
                  className="form-control my-2"
                  id="cpassword"
                  name="cpassword"
                  minLength={5}
                  required
                  value={credentials.cpassword}
                  onChange={onChange}
                  placeholder="Confirm your password"
                />
              </div>
              <button type="submit" className="btn btn-primary rounded-5 px-3">
                Signup
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
