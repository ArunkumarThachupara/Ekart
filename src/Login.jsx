import React, {useState,useContext} from "react";
// import Footer from "./Footer";
import './register.css';
import './login.css';
import { useNavigate } from "react-router-dom";
import { UserAuthContext } from './UserAuth';
import axios from 'axios';
function Login(){
    const navigate = useNavigate();
    const { loginUser } = useContext(UserAuthContext);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
      function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === name + '=') {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
            }
          }
        }
        return cookieValue;
      }
      
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
        const { email, password } = formData;
        try {
          const response = await axios.post(
            'http://localhost:8000/api/customer/login/',
            {
              email: email,  // Assuming you use email as the username for login
              password: password,
            },
            {
              headers: {
                'X-CSRFToken': getCookie('csrftoken'), // Function to get the CSRF token from cookies
              },
            }
          );
    
          // Check if the login was successful based on the response data
          if (response.status === 200) {
              // Call your loginUser function or set user state
              // You should handle user authentication in your context or component
              // Example: loginUser(response.data.token);
              loginUser(email,password);
              navigate('/btsfashion');
          } else {
              // Handle login failure
              alert('Invalid email or password');
          }
        } catch (error) {
          // Handle API request error
          console.error(error);
          alert('Error occurred while logging in');
      }
        // const { email, password } = formData;
    
        // if (loginUser(email, password)) {
        //   navigate('/btsfashion');
        // } else {
        //   // Handle login failure
        //   alert('Invalid email or password');
        // }
      };
    return <div>
        <div className="container">
            <div className="login">
                <h1>Login</h1>
                <div>
                    <input
                    type="text"
                    name="email"
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleInputChange}
                    />
                </div>
                <div>
                    <input
                    type="password"
                    name="password"
                    placeholder='Password'
                    value={formData.password}
                    onChange={handleInputChange}
                    />
                </div>
                <button type="submit" onClick={handleSubmit}>Sign In</button>
            </div>
            <div className="login">
                <h1>New Customer</h1>
                <p>Sign up for early Sale access plus tailored new arrivals,<br></br> trends and promotions. 
                <br></br>To opt out, click unsubscribe in our emails.</p>
                <button onClick={() => navigate('/register')}>Register</button>
            </div>
        {/* <Footer></Footer> */}
        </div>
    </div>
}

export default Login;