import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTS } from '../../styles/Theme'
import { Input, ReserveSelect, SelectItem } from '../StyledComponents'
import { useForceUpdate } from '../hooks/useForceUpdate'

const Menu = () => {
  const [MenuData, setMenuData] = useState([])
  const [forceUpdate, refresh] = useForceUpdate()

  const [idToEdit, setIdToEdit] = useState()
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const controller = new AbortController()
    const getData = async () => {
      try {
        const response = await fetch('http://localhost:4000/menu', { signal: controller.signal })
        if (response.ok) {
          const result = await response.json()
          setMenuData(result)
        }
      } catch (error) {

      }
    }
    getData()
    return () => {
      controller.abort()
    }
  }, [refresh])

  const List = { items: MenuData.filter((item) => item.type === type) }


  const handleTypeChange = (e) => {
    setType(e.target.value);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleNew = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:4000/menu', {
        method: 'POST',
        body: JSON.stringify({ id: new Date().getTime(), type, title, desc: description, price }),
        headers: { 'Content-Type': 'application/json' }
      })
      forceUpdate()
      setIdToEdit(null)
      setTitle('')
      setDesc('')
      setPrice('')
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/menu/${id}`, { method: 'DELETE' })
      forceUpdate()
    } catch (error) {
      console.error(error)
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:4000/menu/${idToEdit}`, {
        method: 'PUT',
        body: JSON.stringify({ type, title, desc: description, price }),
        headers: { 'Content-Type': 'application/json' }
      })
      forceUpdate()
      setIdToEdit(null)
      setTitle('')
      setDesc('')
      setPrice('')
    } catch (error) {
      console.error(error)
    }
  }

  const onEdit = (id, title, description, price) => {
    try {
      setIdToEdit(id)
      setTitle(title)
      setDesc(description)
      setPrice(price)
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <Box sx={styles.container}>
      <ReserveSelect
        id='type-select'
        value={type}
        onChange={handleTypeChange}
        displayEmpty
        sx={{ width: { sm: 200, xs: '100%' } }}
      >
        <SelectItem disabled value=''>
          <em>دسته</em>
        </SelectItem>
        <SelectItem value={'coffee'}>قهوه‌بار</SelectItem>
        <SelectItem value={'chocolate'}>شکلات‌بار</SelectItem>
        <SelectItem value={'food'}>غذا و دسر</SelectItem>
        <SelectItem value={'drink'}>نوشیدنی، بستنی و کیک</SelectItem>
      </ReserveSelect>

      <Stack gap={1}>
        {List.items.map((item) => (
          <Box sx={styles.menuItemBox}>
            <Box sx={styles.menuItem}>
              <Box sx={styles.menuItemTitleBox}>
                <Typography sx={styles.menuItemTitle}>{item.title}</Typography>
                {item.desc ? <Typography sx={styles.menuItemDesc}>({item.desc})</Typography> : null}
              </Box>
              <Typography sx={styles.menuItemPrice}>{item.price}</Typography>
            </Box>
            <Box>
              <Button sx={styles.editBtn} onClick={() => onEdit(item.id, item.title, item.desc, item.price)}>ویرایش</Button>
              <Button sx={styles.deleteBtn} onClick={() => handleDelete(item.id)}>حذف</Button>
            </Box>
            <Divider sx={styles.divider} />
          </Box>
        ))}
      </Stack>

      <React.Fragment>
        <Typography sx={styles.newNotif}>درج خوراک جدید</Typography>
        <form style={styles.notifForm} onSubmit={idToEdit ? handleEdit : handleNew}>
          <Input type='text' placeholder='عنوان' value={title} onChange={handleTitleChange} />
          <Input type='text' placeholder='توضیحات' value={description} onChange={handleDescChange} />
          <Input type='text' placeholder='قیمت' value={price} onChange={handlePriceChange} />
          <Button sx={styles.submitBtn} type='submit'>
            {idToEdit ? 'ویرایش خوراک' : 'ثبت خوراک'}
          </Button>
        </form>
      </React.Fragment>
    </Box>
  )
}

export default Menu

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 5,
    gap: 1,
  },
  menuItemBox: { 
    display: 'flex', 
    flexDirection: { sm: 'row', xs: 'column'},
    justifyContent: 'space-between',
    gap: 1 
  },
  menuItem: {
    display: 'flex',
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: '8px 15px',
    borderRadius: 10,
    bgcolor: COLORS.bg,
    boxShadow: '0 3px 15px 1px inset',
    borderBottom: '1px solid rgb(255, 255, 255, 0.2)'
  },
  menuItemTitleBox: {
    display: { sm: 'flex', xs: 'inline-block' },
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
  divider: {
    display: { sm: 'none', xs: 'flex' },
    borderColor: COLORS.gray,
    width: 150,
    alignSelf: 'center',
  },
  newNotif: {
    mt: 2,
    textAlign: 'center',
    fontFamily: FONTS.VZB,
    fontSize: { sm: 18, xs: 14 },
    color: COLORS.secondary,
  },
  notifForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '7px'
  },
  submitBtn: {
    border: 'none',
    color: 'black',
    backgroundColor: COLORS.secondary,
    fontFamily: FONTS.VZB,
    fontSize: 13,
    height: 30,
    width: 100,
    borderRadius: '10px',
    "&:hover": {
      backgroundColor: COLORS.tertiary,
    },
  },
  deleteBtn: {
    border: '1px solid',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderColor: COLORS.secondary,
    color: COLORS.secondary,
    fontFamily: FONTS.VZR,
    paddingRight: 0,
    '&:hover': {
      bgcolor: 'rgb(223, 168, 57, 0.03)',
      borderColor: COLORS.secondary,
      color: COLORS.secondary,
    }
  },
  editBtn: {
    border: '1px solid',
    borderLeft: 'none',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    borderColor: COLORS.secondary,
    color: COLORS.secondary,
    fontFamily: FONTS.VZR,
    '&:hover': {
      bgcolor: 'rgb(223, 168, 57, 0.03)',
      borderColor: COLORS.secondary,
      color: COLORS.secondary,
    }
  }
}