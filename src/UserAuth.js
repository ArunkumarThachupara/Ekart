// UserAuth.js
import React, { useState } from 'react';
import axios from 'axios';
export const UserAuthContext = React.createContext();

export const UserAuthProvider = ({ children,setIsAuthenticated }) => {
  // const [users, setUsers] = useState([
  //   { email: 'user1@example.com', password: 'password1', firstName: 'User', lastName: 'One' },
  //   { email: 'user2@example.com', password: 'password2', firstName: 'User', lastName: 'Two' },
  // ]);
  const [currentUser, setCurrentUser] = useState(null);

  // const registerUser = (userData) => {
  //   setUsers([...users, userData]);
  // };
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
  
  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/customer/login/',
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'X-CSRFToken': getCookie('csrftoken'),
          },
        }
      );
  
      if (response.status === 200) {
        const userData = response.data.user; // Assuming the user data is returned in the 'user' field
        setCurrentUser(userData);
        console.log("currentUser: ",currentUser);
        setIsAuthenticated(true);
        return true;
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error(error);
      alert('Error occurred while logging in');
    }
    return false;
  };
  

  const logoutUser = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  return (
    <UserAuthContext.Provider
      value={{
        currentUser,
        // registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

