import { Box, Button, ButtonGroup, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTS } from '../../styles/Theme'
import { Input, TextArea } from '../StyledComponents'
import { useForceUpdate } from '../hooks/useForceUpdate'

const NotifItem = ({ id, title, description, onDelete, onEdit, ...props }) => {
  const handleClick = async () => {
    try {
      await fetch(`http://localhost:4000/notifications/${id}`, { method: 'DELETE' })
      onDelete()
    } catch (error) {
      console.error(error)
    }
  }
  const handleEdit = async () => {
    onEdit(id, title, description)
  }

  return (
    <Box sx={styles.notifItem} {...props}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <Typography sx={styles.notifTitle}>{title}</Typography>
        <ButtonGroup variant="contained">
          <Button sx={styles.deleteBtn} onClick={handleEdit} >ویرایش</Button>
          <Button sx={styles.deleteBtn} onClick={handleClick} >حذف</Button>
        </ButtonGroup>
      </Box>
      <Typography sx={styles.notifDesc}>{description}</Typography>
    </Box>
  )
}

const Notifications = () => {
  const [NotifData, setNotifData] = useState([])
  const [forceUpdate, refresh] = useForceUpdate()

  useEffect(() => {
    const controller = new AbortController()
    const getData = async () => {
      try {
        const response = await fetch('http://localhost:4000/notifications', { signal: controller.signal })
        if (response.ok) {
          const result = await response.json()
          setNotifData(result)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getData()
    return () => {
      controller.abort()
    }
  }, [refresh])

  const [idToEdit, setIdToEdit] = useState()
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const handleNew = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:4000/notifications', {
        method: 'POST',
        body: JSON.stringify({ id: new Date().getTime(), title, description }),
        headers: { 'Content-Type': 'application/json' }
      })
      forceUpdate()
      setIdToEdit(null)
      setTitle('')
      setDesc('')
    } catch (error) {
      console.error(error)
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:4000/notifications/${idToEdit}`, { 
        method: 'PUT',
        body: JSON.stringify({ title, description }),
        headers: { 'Content-Type': 'application/json' }
      })
      forceUpdate()
      setIdToEdit(null)
      setTitle('')
      setDesc('')
    } catch (error) {
      console.error(error)
    }
  }

  const onEdit = (id, title, description) => {
    try {
      setIdToEdit(id)
      setTitle(title)
      setDesc(description)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box sx={styles.container}>
      {NotifData.map((item) => (
        <NotifItem
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
          onDelete={forceUpdate}
          onEdit={onEdit}
        />
      ))}
      <React.Fragment>
        <Typography sx={styles.newNotif}>درج اعلان جدید</Typography>
        <form style={styles.notifForm} onSubmit={idToEdit ? handleEdit : handleNew}>
          <Input type='text' placeholder='عنوان' value={title} onChange={handleTitleChange} />
          <TextArea type='text' placeholder='متن' rows={5} value={description} onChange={handleDescChange} />
          <Button sx={styles.submitBtn} type='submit'>
            {idToEdit ? 'ویرایش اعلان' : 'ثبت اعلان'}
          </Button>
        </form>
      </React.Fragment>
    </Box>
  )
}

export default Notifications

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 5,
    textAlign: 'center',
    gap: 1,
  },
  notifItem: {
    flexDirection: 'row',
    border: '1px solid',
    borderColor: COLORS.lightGray,
    borderRadius: 4,
    width: '100%'
  },
  notifTitle: {
    fontFamily: FONTS.VZB,
    fontSize: 18,
    color: 'black',
    bgcolor: COLORS.lightGray,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    width: 'fit-content',
    paddingX: 1
  },
  notifDesc: {
    textAlign: 'right',
    fontFamily: FONTS.VZR,
    fontSize: { sm: 18, xs: 14 },
    color: COLORS.lightGray,
    lineHeight: 1.2,
    padding: 1
  },
  deleteBtn: {
    padding: 0,
    color: 'red',
    bgcolor: COLORS.lightGray,
    fontFamily: FONTS.VZB,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 0,
    '&:hover': {
      color: 'red',
      bgcolor: COLORS.lightGray,
    },
    '&:nth-child(1)': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 12,
      paddingX: 0.5,
      borderLeft: '1.5px solid',
      borderColor: COLORS.primary,
      color: 'black',
    },
    '&:nth-child(2)': {
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    }
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
  }
}