import { COLORS, FONTS } from "./Theme";

const GlobalStyles = {
  toaster: {
    direction: "rtl",
    fontFamily: FONTS.VZM,
    fontSize: '16px',
    border: "3px solid",
    borderRadius: '20px',
    color: COLORS.lightWhite,
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.primary,
  }
}

export { GlobalStyles }