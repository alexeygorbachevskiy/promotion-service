import Big from "big.js";

export const toREM = px =>
  `${Big(`${px}`.replace("px", "")).div(16).round(4).toString()}rem`;

const FALLBACK_FONTS =
  ", -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

export const FONT_FAMILY = {
  graphik: `Graphik${FALLBACK_FONTS}`,
  monospace: "'Roboto Mono', Monaco, Consolas, monospace, sans-serif",
};

export const PALETTE = {
  white: "#ffffff",
  black: "#000000",
  red: "#e24444",
  green: "#50d86a",
  blue: "#4447e2",
  pink: "#ea4c89",
  lightPink: "#ffcece",
  lightPurple: "#f0deff",
  lightGreen: "#deffe5",
  lightOrange: "#fff6de",

  vk: "#5181b8",
  twitter: "#1da1f2",
  facebook: "#4267b2",
};

PALETTE.getText = ({ theme }) => (theme.isDarkMode ? PALETTE.white : "#282B31");

PALETTE.getHeaderBackground = ({ theme }) =>
  theme.isDarkMode ? "#1c1c24" : PALETTE.white;

PALETTE.getAlertBackground = ({ theme }) =>
  theme.isDarkMode ? "#343444" : PALETTE.white;

PALETTE.getPageBackground = ({ theme }) =>
  theme.isDarkMode ? "#131419" : "#EAEDF2";

PALETTE.getBorderColor = ({ theme }) =>
  theme.isDarkMode ? "#262631" : "#cbcfd7";

PALETTE.getNotSelectedTextColor = ({ theme }) =>
  theme.isDarkMode ? "#5f5f6e" : "#a6adb1";

PALETTE.getEmptyItemBackground = ({ theme }) =>
  theme.isDarkMode ? "#2d2d3a" : "#dde1e8";

PALETTE.getEmptyImageBackground = ({ theme }) =>
  theme.isDarkMode ? "#343444" : "#CBCFD7";

export const SIZE = {
  header: 80,
  radius: 4,
  customScrollbarWidth: 8,
};

export const Z_INDEX = {
  navHeader: 1,
  overlay: 5,
  popup: 7,
  alerts: 8,
};

export const SCREEN_WIDTH = {
  desktopLarge: 1440,
  desktopMedium: 1366,
  desktopSmall: 1200,
  tabletLarge: 1000,
  tabletSmall: 768,
  mobileLarge: 720,
  mobileMedium: 420,
};

export const customScrollbar = ({ $isScrollWrapperHovered }) => `
      &::-webkit-scrollbar {
        width: ${SIZE.customScrollbarWidth}px;
        height: ${SIZE.customScrollbarWidth}px;
      }
      
      &::-webkit-scrollbar-corner { opacity: 0;}

      &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: #aaa;
        display: ${
          typeof $isScrollWrapperHovered === "boolean" &&
          !$isScrollWrapperHovered &&
          `none`
        };
      }
      
      &::-webkit-scrollbar-thumb:hover {
         background-color: #777;
      }
      
       // &::-webkit-scrollbar-track:hover {
      //   background-color: ${PALETTE.white};
      // }
`;
