import React from "react";
import "../../styles/App.css";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Typography, Link } from "@mui/material";
import { Input } from '../StyledComponents'
import { FONTS, COLORS } from "../../styles/Theme";

const Login = () => {
  return (
    <Box className="App">
      <Box sx={styles.container}>
        <Typography sx={styles.login}>ورود به اکانت</Typography>
        <form style={styles.loginForm}>
          <Input
            type='text'
            placeholder="ایمیل"
          />
          <Input
            type='password'
            placeholder="رمز عبور"
          />
          <Button component={RouterLink} to='/' sx={styles.submitBtn}>ورود</Button>
        </form>
        <Typography sx={styles.text}>
          رمز عبور خود را فراموش کرده‌اید؟
          <Link component={RouterLink} underline="none" sx={[styles.text, {color: COLORS.secondary}]}> {` بازیابی رمز`}</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;

const styles = {
  container: {
    direction: 'rtl',
    border: "3px solid",
    borderRadius: 12,
    borderColor: COLORS.secondary,
    bgcolor: COLORS.primary,
    paddingY: 5,
    paddingX: 3,
    width: 300,
    gap: '9px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  login: {
    fontFamily: FONTS.Entezar,
    fontSize: 40,
    color: COLORS.white,
    mt: -2,
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    gap: '9px'
  },
  submitBtn: {
    border: 'none',
    color: 'black',
    backgroundColor: COLORS.secondary,
    fontFamily: FONTS.VZB,
    fontSize: 13,
    height: '36',
    borderRadius: '10px',
    "&:hover": {
      backgroundColor: COLORS.tertiary,
    },
  },
  text: {
    fontFamily: FONTS.VZR,
    fontSize: 13,
    color: COLORS.lightGray,
  },
}
