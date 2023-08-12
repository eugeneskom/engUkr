import { createContext } from 'react';

const UserContext = createContext({
  userStatus: 'notRegistered',
  handleIsLoggedIn: (isLoggedIn:boolean) => {},
});

export default UserContext;