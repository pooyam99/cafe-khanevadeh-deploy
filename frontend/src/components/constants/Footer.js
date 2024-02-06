import React from "react";
import { Box, Link, Stack, Tooltip, Typography } from "@mui/material";
import { COLORS, FONTS } from "../../styles/Theme";
import PhoneIcon from "@mui/icons-material/Phone";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const hoverTitle = (title) => (
  <h style={{ fontFamily: FONTS.VZB, color: COLORS.tertiary }}>{title}</h>
);

const Footer = () => {
  return (
    <Box
      sx={styles.container}
      component="footer"
    >
      <Box sx={{ width: { sm: "35%", xs: '100%' }, mb: { sm: 0, xs: 3 } }}>
        <Typography align="right" sx={styles.text}>
          آدرس: اصفهان، گلدشت، قلعه‌سفید، بلوار ولی‌عصر، نبش بن‌بست لادن
          <br />
          <br />
          تماس:
          <br />
          <Typography sx={[styles.text, { direction: 'ltr', display: 'flex', justifyContent: "flex-end", mt: 0.5 }]}>
            031 4224 0800 <PhoneIcon sx={{ ml: "3px" }} />
          </Typography>
          <Typography sx={[styles.text, { direction: 'ltr', display: 'flex', justifyContent: "flex-end" }]}>
            0913 331 6280 <SmartphoneIcon sx={{ ml: "3px" }} />
          </Typography>
        </Typography>
      </Box>
      <Box sx={{ display: { sm: 'flex', xs: 'none' } }}>
        <img
          src={require("../../assets/misc/logo-lg.png")}
          alt="Logo Full"
          height="180"
          style={{ opacity: 0.6, }}
        />
      </Box>
      <Box sx={{ width: { sm: "35%", xs: '100%' } }}>
        <Typography align="right" sx={styles.text}>
          شبکه‌های اجتماعی:
        </Typography>
        <Stack direction="row" gap={1} sx={styles.socials}>
          <Link
            underline="none"
            color="inherit"
            target="_blank"
            href="https://www.instagram.com/family_coffee_shop_1401/"
          >
            <Tooltip disableFocusListener title={hoverTitle("اینستاگرام")}>
              <InstagramIcon fontSize="inherit" sx={styles.iconHover} />
            </Tooltip>
          </Link>
          <Link
            underline="none"
            color="inherit"
            target="_blank"
            href="https://wa.me/qr/ZMOIQQK6BQRRG1"
          >
            <Tooltip disableFocusListener title={hoverTitle("واتس اپ")}>
              <WhatsAppIcon fontSize="inherit" sx={styles.iconHover} />
            </Tooltip>
          </Link>
          <Link
            underline="none"
            color="inherit"
            target="_blank"
            href="https://t.me/pooyam99/"
          >
            <Tooltip disableFocusListener title={hoverTitle("تلگرام")}>
              <TelegramIcon fontSize="inherit" sx={styles.iconHover} />
            </Tooltip>
          </Link>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;

const styles = {
  container: {
    mt: 2.5,
    mb: 10,
    paddingY: { sm: 5, xs: 3 },
    paddingX: { sm: 6, xs: 4 },
    direction: "rtl",
    flexDirection: { sm: 'row', xs: 'column' },
    border: "3px solid",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    borderColor: COLORS.secondary,
    bgcolor: COLORS.primary,
    display: "flex",
    justifyContent: "space-between",
    overflow: 'hidden',
  },
  text: {
    fontFamily: FONTS.VZR,
    fontSize: 20,
    color: COLORS.gray,
  },
  socials: {
    direction: "row",
    fontSize: 40,
    color: COLORS.gray,
    mt: 1,
  },
  iconHover: {
    "&:hover": {
      color: COLORS.lightWhite,
    },
    transition: "color 250ms",
  },
};
