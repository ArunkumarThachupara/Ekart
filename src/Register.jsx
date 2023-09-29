import React, { useContext,useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import './register.css';
import Footer from './Footer';
import { UserAuthContext } from './UserAuth';
import axios from 'axios';

function Register() {
  const navigate   = useNavigate();
  const { registerUser } = useContext(UserAuthContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
            
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you can perform actions like sending data to a server or validating input.
    try {
      const response = await axios.post('http://localhost:8000/api/customer/register/', formData);

      // Check if the registration was successful based on the response data
      if (response.status === 201) {
          // You can handle successful registration here
          // For example, redirect to login page
          navigate('/login');
      } else {
          // Handle registration failure
          alert('Registration failed. Please try again.');
      }
    } catch (error) {
      // Handle API request error
      console.error(error);
      alert('Error occurred while registering');
      }
  };
    // console.log('Registration data:', formData);
    // registerUser(formData);
    // // Reset fields after submission if needed
    // setFormData({
    //   firstName: '',
    //   lastName: '',
    //   email: '',
    //   password: '',
    // });
  //   navigate('/login');
  // };


  return (
    <div>
      <div className='register'>
      <h1>Register</h1>
        <div>
            <input
              type="text"
              name="firstName"
              placeholder='First Name'
              value={formData.firstName}
              onChange={handleInputChange}
            />
        </div>
        <div>

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
            />
        </div>
        <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
        </div>
        <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
        </div>
        <p>Sign up for early Sale access plus tailored new arrivals,<br></br> trends and promotions. 
        <br></br>To opt out, click unsubscribe in our emails.</p>
        <div>
          <button type="submit" onClick={handleSubmit}>Register</button>
        </div>
        <div>
          <button onClick={() => navigate('/login')}>Already a user? Login</button>
        </div>
      </div>
      <Footer></Footer>
    </div>

  );
}

export default Register;
