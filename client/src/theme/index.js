import { colors, createMuiTheme } from "@material-ui/core";
import { softShadows, strongShadows } from "./shadows";
import typography from "./typography";

const baseConfig = {
   typography,
   overrides: {
      MuiLinearProgress: {
         root: {
            borderRadius: 3,
            overflow: "hidden",
         },
      },
      MuiListItemIcon: {
         root: {
            minWidth: 32,
         },
      },
      MuiChip: {
         root: {
            backgroundColor: "rgba(0,0,0,0.075)",
         },
      },
   },
};

const themeConfigs = [
   {
      name: "light",
      overrides: {
         MuiInputBase: {
            input: {
               "&::placeholder": {
                  opacity: 1,
                  color: colors.blueGrey[600],
               },
            },
         },
      },
      palette: {
         type: "light",
         action: {
            active: colors.blueGrey[600],
         },
         background: {
            default: colors.common.white,
            dark: "#f4f6f8",
            paper: colors.common.white,
         },
         primary: {
            main: colors.indigo[600],
         },
         secondary: {
            main: "#5850EC",
         },
         text: {
            primary: colors.blueGrey[900],
            secondary: colors.blueGrey[600],
         },
      },
      shadows: softShadows,
   },
   {
      name: "dark",
      palette: {
         type: "dark",
         action: {
            active: "rgba(255, 255, 255, 0.54)",
            hover: "rgba(255, 255, 255, 0.04)",
            selected: "rgba(255, 255, 255, 0.08)",
            disabled: "rgba(255, 255, 255, 0.26)",
            disabledBackground: "rgba(255, 255, 255, 0.12)",
            focus: "rgba(255, 255, 255, 0.12)",
         },
         background: {
            default: "#282C34",
            dark: "#1c2025",
            paper: "#282C34",
         },
         primary: {
            main: "#8a85ff",
         },
         secondary: {
            main: "#8a85ff",
         },
         text: {
            primary: "#e6e5e8",
            secondary: "#adb0bb",
         },
      },
      shadows: strongShadows,
   },
];

export const createTheme = (settings) => {
   let themeConfig = themeConfigs.find(
      (theme) => theme.name === settings.theme
   );

   if (!themeConfig) {
      console.warn(new Error(`The theme ${settings.theme} is not valid`));
   }

   let theme = createMuiTheme({ ...themeConfig, ...baseConfig });

   return theme;
};
