import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTS } from '../../styles/Theme'
import { useForceUpdate } from '../hooks/useForceUpdate'

const MessageItem = ({ id, name, phoneNum, message, onDelete, ...props }) => {
  const handleClick = async () => {
    try {
      await fetch(`http://localhost:4000/message/${id}`, { method: 'DELETE' })
      onDelete()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box sx={styles.notifItem} {...props}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <Typography sx={styles.notifTitle}>{name}، به شماره {phoneNum}</Typography>
        <Button sx={styles.deleteBtn} onClick={handleClick} >حذف</Button>
      </Box>
      <Typography sx={styles.notifDesc}>{message}</Typography>
    </Box>
  )
}

const Messages = () => {
  const [MessageData, setMessageData] = useState([])
  const [forceUpdate, refresh] = useForceUpdate()

  useEffect(() => {
    const controller = new AbortController()
    const getData = async () => {
      try {
        const response = await fetch('http://localhost:4000/message', { signal: controller.signal })
        if (response.ok) {
          const result = await response.json()
          setMessageData(result)
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

  return (
    <Box sx={styles.container}>
      {MessageData.map((item) => (
        <MessageItem
          key={item.id}
          id={item.id}
          name={item.name}
          phoneNum={item.phoneNum}
          message={item.message}
          onDelete={forceUpdate}
        />
      ))}
    </Box>
  )
}

export default Messages

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
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    '&:hover': {
      color: 'red',
      bgcolor: COLORS.lightGray,
    }
  },
}