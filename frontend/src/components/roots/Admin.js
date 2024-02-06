import { Box, Container, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material'
import React, { useState } from 'react'
import { COLORS, FONTS } from '../../styles/Theme'
import { Menu, Messages, Notifications, Reserves } from '../panels'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('notifs')

  return (
    <Box className="App">
      <Container maxWidth="lg" sx={{ minHeight: "100vh" }}>
        <Box sx={styles.container}>
          <Box sx={styles.sideBar}>
            <List>
              <ListItem sx={{ padding: 0 }}>
                <ListItemButton sx={{ color: COLORS.secondary }} onClick={() => setActiveTab('notifs')}>
                  <ListItemText sx={styles.itemText} primary="اعلانات" />
                </ListItemButton>
              </ListItem>
              <Divider sx={{ borderColor: COLORS.secondary }} />
              <ListItem sx={{ padding: 0 }}>
                <ListItemButton sx={{ color: COLORS.secondary }} onClick={() => setActiveTab('menu')}>
                  <ListItemText sx={styles.itemText} primary="منو" />
                </ListItemButton>
              </ListItem>
              <Divider sx={{ borderColor: COLORS.secondary }} />
              <ListItem sx={{ padding: 0 }}>
                <ListItemButton sx={{ color: COLORS.secondary }} onClick={() => setActiveTab('reserves')}>
                  <ListItemText sx={styles.itemText} primary="رزروها" />
                </ListItemButton>
              </ListItem>
              <Divider sx={{ borderColor: COLORS.secondary }} />
              <ListItem sx={{ padding: 0 }}>
                <ListItemButton sx={{ color: COLORS.secondary }} onClick={() => setActiveTab('messages')}>
                  <ListItemText sx={styles.itemText} primary="پیغام‌ها" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
          <Box sx={styles.mainBox}>
            {activeTab === 'notifs' && <Notifications />}
            {activeTab === 'menu' && <Menu />}
            {activeTab === 'reserves' && <Reserves />}
            {activeTab === 'messages' && <Messages />}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Admin

const styles = {
  container: {
    display: 'flex',
    mt: { sm: 10, xs: 2.5 },
    mb: 2.5,
    direction: "rtl",
    border: "3px solid",
    borderRadius: 5,
    borderColor: COLORS.secondary,
    bgcolor: COLORS.primary,
    overflow: 'hidden',
  },
  sideBar: {
    width: { sm: 200, xs: 'fit-content' },
    borderLeft: "3px solid",
    borderColor: COLORS.secondary,
  },
  itemText: {
    '.MuiListItemText-primary': {
      fontFamily: FONTS.VZB,
      fontSize: 20,
      textAlign: 'right',
    }
  },
  mainBox: {
    padding: { sm: 3, xs: 1 },
    width: '100%',
    overflow: 'auto'
  },
}