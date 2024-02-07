import React, { useState } from 'react'
import { Box, Button, ListSubheader, Typography, } from '@mui/material';
import { COLORS, FONTS } from '../../styles/Theme';
import { ReserveInput, ReserveSelect, SelectItem } from '../StyledComponents'

const Reserve = () => {
  const regex = new RegExp('^(\\+98|0)?9\\d{9}$');

  const [type, setType] = useState('');
  const [time, setTime] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };
  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };
  const handleNumChange = (e) => {
    if (regex.test(e.target.value)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    setPhoneNum(e.target.value)
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ time, type, phoneNum })
    try {
      await fetch('https://admin.anidlws.xyz/api/reserves', {
        method: 'POST',
        body: JSON.stringify({ data: { type, time, phoneNum } }),
        headers: { 'Content-Type': 'application/json' }
      })
      setType('')
      setTime('')
      setPhoneNum('')
      setIsValid(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.reserve}>رزرو</Typography>
      <Box sx={styles.mainBox}>
        <Box sx={styles.rightContainer}>
          <Typography sx={styles.title}>سالن مبلمان</Typography>
          <img
            src={"https://admin.anidlws.xyz/uploads/reserve_1_7990b7c8c8.jpg"}
            alt='Sofa'
            width='100%'
            height='360'
            style={{ borderRadius: 15 }}
          />
          <Box sx={styles.rulesBox}>
            <Typography sx={[styles.title, { fontSize: 25 }]}>شرایط رزرو</Typography>
            <Typography sx={styles.text}>
              ● رزرو هزینه‌ای ندارد.<br />
              ● رزرو باید نهایتا تا روز قبل صورت گیرد.<br />
              ● رزور به‌صورت تلفنی امکان‌پذیر است (به پایین صفحه مراجعه کنید).<br />
              ● ساعات قابل رزرو: روز از ساعت ۹ الی ۱۲، شب از ساعت ۱۸ الی ۲۳.<br />
              ● رزرو دربست به همراه میز بیلیارد برای جشن تولد یا میهمانی خانوادگی امکان‌پذیر است.<br />
              ● درصورتی که تا ۳۰ دقیقه پس از ساعت موعود تشریف نیاورید، رزرو شما لغو شده و سالن در اختیار مشتریان حضوری قرار خواهد گرفت.<br />
              ● درخواست تهیهٔ کیک تولد توسط کافه امکان‌پذیر است.
            </Typography>
          </Box>
        </Box>
        <Box sx={styles.leftContainer}>
          <Typography sx={styles.title}>میز بیلیارد</Typography>
          <img
            src={"https://admin.anidlws.xyz/uploads/reserve_2_d13472d679.jpg"}
            alt='Billiard'
            width='100%'
            height='360'
            style={{ borderRadius: 15 }}
          />
          <Box sx={styles.rulesBox}>
            <Typography sx={[styles.title, { fontSize: 25 }]}>شرایط رزرو</Typography>
            <Typography sx={styles.text}>
              ● رزرو هزینه‌ای ندارد.<br />
              ● رزرو فقط برای همان روز اما در تمامی ساعات روز امکان‌پذیر است.<br />
              ● رزرو نهایتا برای یک ساعت امکان‌پذیر است.<br />
              ● رزور به‌صورت تلفنی امکان‌پذیر است (به پایین صفحه مراجعه کنید).<br />
              ● ساعات قابل رزرو: شب از ساعت ۱۷ الی ۲۳.<br />
              ● رزرو دربست به همراه مبلمان برای جشن یا میهمانی خانوادگی امکان‌پذیر است.<br />
              ● درصورتی که تا ۱۰ دقیقه پس از ساعت موعود تشریف نیاورید، رزرو شما لغو شده و میز در اختیار مشتریان حضوری قرار خواهد گرفت.<br />
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={styles.reserveBox}>
        <Typography sx={styles.title}>رزرو کنید</Typography>
        <form style={styles.reserveForm} onSubmit={handleSubmit}>
          <ReserveSelect
            id='type-select'
            value={type}
            onChange={handleTypeChange}
            displayEmpty
          >
            <SelectItem disabled value=''>
              <em>نوع</em>
            </SelectItem>
            <SelectItem value={'سالن مبلمان'}>سالن مبلمان</SelectItem>
            <SelectItem value={'میز بیلیارد'}>میز بیلیارد</SelectItem>
            <SelectItem value={'دربست'}>دربست</SelectItem>
          </ReserveSelect>
          <ReserveSelect
            id='time-select'
            value={time}
            onChange={handleTimeChange}
            displayEmpty
          >
            <SelectItem disabled value=''>
              <em>زمان</em>
            </SelectItem>
            <ListSubheader sx={styles.selectDivider}>روز</ListSubheader>
            <SelectItem value={"ساعت ۹"}>ساعت ۹</SelectItem>
            <SelectItem value={"ساعت ۱۰"}>ساعت ۱۰</SelectItem>
            <SelectItem value={"ساعت ۱۱"}>ساعت ۱۱</SelectItem>
            <ListSubheader sx={styles.selectDivider}>شب</ListSubheader>
            <SelectItem value={"ساعت ۱۸"}>ساعت ۱۸</SelectItem>
            <SelectItem value={"ساعت ۱۹"}>ساعت ۱۹</SelectItem>
            <SelectItem value={"ساعت ۲۰"}>ساعت ۲۰</SelectItem>
            <SelectItem value={"ساعت ۲۱"}>ساعت ۲۱</SelectItem>
            <SelectItem value={"ساعت ۲۲"}>ساعت ۲۲</SelectItem>
          </ReserveSelect>
          <ReserveInput placeholder='شماره همراه' type='number' value={phoneNum} onChange={handleNumChange} />
          <Button variant='outlined' sx={styles.submitBtn} disabled={!isValid || !type || !time} type='submit'>ثبت رزرو</Button>
        </form>
      </Box>
    </Box>
  )
}

export default Reserve

const styles = {
  container: {
    direction: "rtl",
    border: "3px solid",
    borderRadius: 5,
    borderColor: COLORS.secondary,
    bgcolor: COLORS.primary,
    padding: { sm: 3, xs: 1 },
    alignContent: 'center',
    justifyContent: 'center',
  },
  reserve: {
    textAlign: "center",
    fontFamily: FONTS.Entezar,
    fontSize: 40,
    color: COLORS.white,
  },
  mainBox: {
    marginY: 2,
    display: 'flex',
    flexDirection: { sm: 'row', xs: 'column' },
    justifyContent: 'space-between',
  },
  rightContainer: {
    width: { sm: '49%', xs: '100%' },
    mb: { sm: 0, xs: 2 },
  },
  leftContainer: {
    width: { sm: '49%', xs: '100%' },
  },
  title: {
    mt: -0.75,
    fontFamily: FONTS.Entezar,
    fontSize: 30,
    color: COLORS.lightGray,
    textAlign: 'center',
    mb: 1
  },
  text: {
    fontFamily: FONTS.VZR,
    fontSize: { sm: 18, xs: 15 },
    color: COLORS.lightGray,
  },
  rulesBox: {
    flexDirection: 'column',
    border: '2px dashed',
    borderColor: COLORS.gray,
    borderRadius: 5,
    padding: 2,
    mt: { sm: 2, xs: 0.5 },
  },
  reserveBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginY: 5
  },
  reserveForm: {
    display: 'flex',
    flexDirection: 'column',
    width: 250,
    gap: 7.5,
  },
  selectDivider: {
    textAlign: 'right',
    fontFamily: FONTS.VZB,
    bgcolor: 'gray',
    color: 'white',
  },
  submitBtn: {
    borderColor: COLORS.secondary,
    color: COLORS.secondary,
    fontFamily: FONTS.VZB,
    fontSize: 20,
    height: 50,
    borderRadius: '20px',
    "&:hover": {
      borderColor: COLORS.secondary,
      backgroundColor: 'rgb(223, 168, 57, 0.03)'
    },
    "&.Mui-disabled": {
      borderColor: COLORS.darkGray,
      color: COLORS.darkGray,
    }
  }
};