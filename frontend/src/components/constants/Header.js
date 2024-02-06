import React, { useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Stack, Typography, Drawer, Button } from "@mui/material";
import { COLORS, FONTS } from "../../styles/Theme";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <Box sx={styles.container}>
      <Stack
        gap={2}
        sx={styles.tabs}
        direction='row'
        divider={<Box sx={styles.tabDivider} />}
      >
        {tabs.map((item) => (
          <Link component={RouterLink} to={item.link} underline="none" color={COLORS.secondary}>
            <Typography sx={styles.tabItem}>{item.title}</Typography>
          </Link>
        ))}
      </Stack>
      <Button sx={styles.drawerBtn} onClick={() => setIsDrawerOpen(true)} >
        <MenuOpenIcon sx={{ fontSize: 40 }} />
      </Button>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box sx={styles.drawerBox} role='presentation'>
          <Typography sx={{ textAlign: 'center', fontFamily: FONTS.VZR, color: COLORS.secondary }}>صفحه مورد نظر را انتخاب کنید</Typography>
          <Stack
            gap={2}
            sx={styles.drawerTabs}
            direction='column'
          >
            {tabs.map((item) => (
              <Button component={RouterLink} to={item.link} variant="outlined" sx={styles.drawerItem} onClick={() => setIsDrawerOpen(false)}>
                <Typography sx={styles.tabItem}>{item.title}</Typography>
              </Button>
            ))}
          </Stack>
        </Box>
      </Drawer>
      <Link component={RouterLink} to="/" sx={{ display: 'flex' }}>
        <img
          src={require("../../assets/misc/logo-sm.png")}
          alt="Logo"
          width="80"
        />
      </Link>
    </Box>
  );
};

export default Header;

const tabs = [
  {
    title: "صفحه اصلی",
    link: "/",
  },
  {
    title: "منو",
    link: "menu",
  },
  {
    title: "رزرو",
    link: "reserve",
  },
  {
    title: "تماس با ما",
    link: "contact",
  },
];

const styles = {
  container: {
    mt: { sm: 10, xs: 2.5 },
    mb: 2.5,
    direction: "rtl",
    border: "3px solid",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderColor: COLORS.secondary,
    bgcolor: COLORS.primary,
    padding: 2,
    height: 75,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: 'hidden',
  },
  tabs: {
    mr: 3,
    display: { sm: 'flex', xs: 'none' }
  },
  tabDivider: {
    bgcolor: COLORS.secondary,
    opacity: 0.6,
    width: "2px",
    height: "15px",
    alignSelf: "center",
  },
  tabItem: {
    fontFamily: FONTS.VZB,
    fontSize: 20,
  },
  drawerBtn: {
    mr: 1,
    display: { sm: 'none', xs: 'flex' },
    padding: 1,
    borderRadius: 15,
    color: COLORS.secondary,
    bgcolor: COLORS.bg,
  },
  drawerBox: {
    p: 2,
    width: '250px',
    height: '100%',
    bgcolor: COLORS.primary,
  },
  drawerTabs: {
    direction: 'rtl',
    padding: 2,
  },
  drawerItem: {
    textAlign: 'right',
    color: COLORS.secondary,
    borderColor: COLORS.secondary,
    borderRadius: 5,
    "&:hover": {
      borderColor: COLORS.secondary,
      backgroundColor: 'rgb(223, 168, 57, 0.03)'
    },
  },
};
