import { useContext } from "react";
import UserContext from "src/context/UserContext";

export default () => {
   const context = useContext(UserContext);

   return context;
};
