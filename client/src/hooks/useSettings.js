import { useContext } from "react";
import SettingsContext from "src/context/SettingsContext";

export default () => {
   const context = useContext(SettingsContext);

   return context;
};
