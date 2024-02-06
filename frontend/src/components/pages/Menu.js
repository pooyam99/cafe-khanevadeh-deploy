import React, { useEffect, useState } from 'react'
import { Box, Grid, Stack, Typography } from '@mui/material';
import { COLORS, FONTS } from '../../styles/Theme';
import CoffeeIcon from '@mui/icons-material/Coffee';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import LocalBarIcon from '@mui/icons-material/LocalBar';

const Menu = () => {
  const [MenuData, setMenuData] = useState([])

  useEffect(() => {
    const controller = new AbortController()
    const getData = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/menu-items', { signal: controller.signal })
        if (response.ok) {
          const result = await response.json()
          setMenuData(result.data)
        }
      } catch (error) {

      }
    }
    getData()
    return () => {
      controller.abort()
    }
  }, [])


  const MenuLists = {
    coffees: MenuData.filter((item) => item.attributes.type === 'coffee'),
    chocolates: MenuData.filter((item) => item.attributes.type === 'chocolate'),
    foods: MenuData.filter((item) => item.attributes.type === 'food'),
    drinks: MenuData.filter((item) => item.attributes.type === 'drink'),
  }


  return (
    <Box sx={styles.container}>
      <Typography sx={styles.welcome}>منو</Typography>
      <Typography sx={styles.message}>قیمت‌ها به تومان می‌باشند</Typography>
      <Box sx={styles.mainBox}>
        <Grid container rowSpacing={4} columnSpacing={2}>


          <Grid item sm={6} xs={12}>
            <Box sx={styles.categoryBox}>
              <CoffeeIcon sx={styles.categoryIcon} />
              <Typography sx={styles.categoryTitle}>قـــهـــوه بــــــار</Typography>
            </Box>
            <Stack gap={1}>
              {MenuLists.coffees.map((item) => (
                <Box sx={styles.menuItem}>
                  <Box sx={styles.menuItemTitleBox}>
                    <Typography sx={styles.menuItemTitle}>{item.attributes.title}</Typography>
                    {item.attributes.description ? <Typography sx={styles.menuItemDesc}>({item.attributes.description})</Typography> : null}
                  </Box>
                  <Typography sx={styles.menuItemPrice}>{item.attributes.price}</Typography>
                </Box>
              ))}
            </Stack>
          </Grid>


          <Grid item sm={6} xs={12}>
            <Box sx={styles.categoryBox}>
              <LocalCafeIcon sx={styles.categoryIcon} />
              <Typography sx={styles.categoryTitle}>شـــکــــلات بــــــار</Typography>
            </Box>
            <Stack gap={1}>
              {MenuLists.chocolates.map((item) => (
                <Box sx={styles.menuItem}>
                  <Box sx={[styles.menuItemTitleBox, { display: { sm: 'flex', xs: 'inline-block' } }]}>
                    <Typography sx={styles.menuItemTitle}>{item.attributes.title}</Typography>
                    {item.attributes.description ? <Typography sx={styles.menuItemDesc}>({item.attributes.description})</Typography> : null}
                  </Box>
                  <Typography sx={styles.menuItemPrice}>{item.attributes.price}</Typography>
                </Box>
              ))}
            </Stack>
          </Grid>


          <Grid item sm={6} xs={12}>
            <Box sx={styles.categoryBox}>
              <LunchDiningIcon sx={[styles.categoryIcon, { ml: 0.4 }]} />
              <Typography sx={styles.categoryTitle}>غـــــذا و دســـــر</Typography>
            </Box>
            <Stack gap={1}>
              {MenuLists.foods.map((item) => (
                <Box sx={styles.menuItem}>
                  <Box sx={styles.menuItemTitleBox}>
                    <Typography sx={styles.menuItemTitle}>{item.attributes.title}</Typography>
                    {item.attributes.description ? <Typography sx={styles.menuItemDesc}>({item.attributes.description})</Typography> : null}
                  </Box>
                  <Typography sx={styles.menuItemPrice}>{item.attributes.price}</Typography>
                </Box>
              ))}
            </Stack>
          </Grid>


          <Grid item sm={6} xs={12}>
            <Box sx={styles.categoryBox}>
              <LocalBarIcon sx={styles.categoryIcon} />
              <Typography sx={styles.categoryTitle}>نوشیدنی، بستنی و کیک</Typography>
            </Box>
            <Stack gap={1}>
              {MenuLists.drinks.map((item) => (
                <Box sx={styles.menuItem}>
                  <Box sx={[styles.menuItemTitleBox, { display: { sm: 'flex', xs: 'inline-block' } }]}>
                    <Typography sx={styles.menuItemTitle}>{item.attributes.title}</Typography>
                    {item.attributes.description ? <Typography sx={styles.menuItemDesc}>({item.attributes.description})</Typography> : null}
                  </Box>
                  <Typography sx={styles.menuItemPrice}>{item.attributes.price}</Typography>
                </Box>
              ))}
            </Stack>
          </Grid>


        </Grid>
      </Box>
    </Box>
  )
}

export default Menu

const styles = {
  container: {
    direction: "rtl",
    border: "3px solid",
    borderRadius: 5,
    borderColor: COLORS.secondary,
    bgcolor: COLORS.primary,
    padding: { sm: 3, xs: 1 },
    alignItems: "center",
    justifyContent: "space-between",
    overflow: 'hidden',
  },
  welcome: {
    textAlign: "center",
    fontFamily: FONTS.Entezar,
    fontSize: 40,
    color: COLORS.white,
    mb: 0.5,
  },
  message: {
    textAlign: "center",
    fontFamily: FONTS.VZM,
    fontSize: 16,
    color: COLORS.lightGray,
    mb: { sm: 2, xs: 1 },
  },
  mainBox: {
    direction: "rtl",
  },
  categoryBox: {
    display: 'flex',
    mb: 1,
  },
  categoryTitle: {
    fontFamily: FONTS.VZB,
    fontSize: 25,
    color: COLORS.secondary,
  },
  categoryIcon: {
    fontSize: 40,
    color: 'white',
  },
  menuItem: {
    display: 'flex',
    alignItems: "center",
    justifyContent: "space-between",
    padding: '8px 15px',
    borderRadius: 10,
    bgcolor: COLORS.bg,
    boxShadow: '0 3px 15px 1px inset',
    borderBottom: '1px solid rgb(255, 255, 255, 0.2)'
  },
  menuItemTitleBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
  },
  menuItemTitle: {
    fontFamily: FONTS.YekanR,
    fontSize: 16,
    color: COLORS.white,
    textShadow: '2px 4px 5px black',
    wordWrap: 'initial',
  },
  menuItemDesc: {
    fontFamily: FONTS.YekanR,
    fontSize: 12,
    color: COLORS.gray,
    textShadow: '2px 4px 5px black',
  },
  menuItemPrice: {
    direction: 'ltr',
    fontFamily: FONTS.VZB,
    fontSize: 16,
    color: COLORS.secondary,
    textShadow: '2px 4px 5px black',
  },
};