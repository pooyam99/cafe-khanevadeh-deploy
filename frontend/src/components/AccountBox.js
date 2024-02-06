import { Box, Link, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom';
import { COLORS, FONTS } from "../styles/Theme";
import React, { useState } from 'react'
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const AccountBox = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <Box display="none" flexDirection="row-reverse">
        {isLoggedIn ?
          <Stack
            sx={styles.accountBox}
            gap={1}
            divider={<Box sx={styles.divider} />}
          >
            <Link component="button" underline="none" color={COLORS.secondary} sx={{ paddingLeft: 2.5, width: 80 }} onClick={() => setIsLoggedIn(false)}>
              <PersonIcon />
              <Typography sx={styles.loginText}>پنل کاربری</Typography>
            </Link>
            <Link component="button" underline="none" color={COLORS.secondary} sx={{ paddingRight: 2.5 }}>
              <ShoppingCartOutlinedIcon />
              <Typography sx={styles.loginText}>سبد سفارش</Typography>
            </Link>
          </Stack>
          :
          <Link component={RouterLink} to='login' underline="none" color={COLORS.secondary} sx={[styles.accountBox, styles.loginBox]} onClick={() => setIsLoggedIn(true)} >
            <PersonIcon />
            <Typography sx={styles.loginText}>ورود / ثبت‌نام</Typography>
          </Link>
        }
      </Box>
  )
}

export default AccountBox

const styles = {
  divider: {
    bgcolor: COLORS.primary,
    width: "3px",
    height: "100%",
    alignSelf: "center",
  },
  accountBox: {
    display: "flex",
    flexDirection: "row-reverse",
    borderRadius: 10,
    bgcolor: COLORS.bg,
    width: 180,
    height: 75,
  },
  loginBox: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontFamily: FONTS.VZR,
    fontSize: 12,
  },
}