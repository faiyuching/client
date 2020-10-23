import { createContext } from 'react';

export const Contexts = createContext({
  screenSize: "sm",
  device:"iOS",
  language:"",
  isLoggedIn: false,
  user: {}
});