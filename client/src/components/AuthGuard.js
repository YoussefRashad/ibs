import React, { useEffect } from "react";
import { useHistory } from "react-router";
import PropTypes from "prop-types";

import useUser from "src/hooks/useUser";

function AuthGuard({ children }) {
   const history = useHistory();
   const { user } = useUser();
   const roles = ["admin", "support"];

   useEffect(() => {
      if (!user) {
         history.push("/auth/login");
         return;
      }
      if (!roles.includes(user.role)) {
         history.push("/401");
      }
   }, [history, roles, user]);

   return <>{children}</>;
}

AuthGuard.propTypes = {
   children: PropTypes.node,
};

export default AuthGuard;
