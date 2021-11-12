import React, { useState } from "react";
import PropTypes from "prop-types";

import { storeStorage } from "src/utils/storage";

const UserContext = React.createContext();

export const UserProvider = ({ children, user }) => {
   const [currentUser, setCurrentUser] = useState(user);

   const saveUser = (user) => {
      console.log(user);
      setCurrentUser(user);
      storeStorage("user", user);
   };

   return (
      <UserContext.Provider value={{ user: currentUser, saveUser }}>
         {children}
      </UserContext.Provider>
   );
};

UserProvider.propTypes = {
   children: PropTypes.node.isRequired,
};

export const UserConsumer = UserContext.Consumer;

export default UserContext;
