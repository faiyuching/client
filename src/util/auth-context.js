import { createContext } from 'react';

export const AuthContext = createContext({
  screenSize: "xs",
  device:"iOS",
  language:"",
  isLoggedIn: false,
  user: {}
});

// export const deviceContext = createContext({
//   screenSize: "xs",
//   device:"iOS",
//   language:""
// });