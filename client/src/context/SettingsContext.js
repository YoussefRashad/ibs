import React, { useState } from "react";

import { storeStorage } from "src/utils/storage";

const SettingsContext = React.createContext();

const defaultSettings = {
   theme: "light",
};

export const SettingsProvider = ({ children, settings }) => {
   const [currentSettings, setCurrentSettings] = useState(
      settings || defaultSettings
   );

   const saveSettings = (settings) => {
      setCurrentSettings(settings);
      storeStorage("settings", settings);
   };

   return (
      <SettingsContext.Provider
         value={{ settings: currentSettings, saveSettings }}
      >
         {children}
      </SettingsContext.Provider>
   );
};

export const SettingsConsumer = SettingsContext.Consumer;

export default SettingsContext;
