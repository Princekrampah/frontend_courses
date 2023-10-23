import React, { useState } from 'react'
import { AppBar, IconButton, Toolbar, Drawer, Button, Avator, useMediaQuery, Avatar } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useStyle from "./styles"
import  { SideBar }  from ".."

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  // class as hook
  const classes = useStyle();
  const isMobile = useMediaQuery("(max-width:600px)")
  const theme = useTheme();
  const isAuthenticated = true;

  return (
   <>
   <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        {isMobile && (
          <IconButton
          color="inherit"
          edge="start"
          style={{outline: "none"}}
          onClick={() => setMobileOpen((previousMobileOpen) => !previousMobileOpen)}
          className={classes.menuButton}
          >
            <Menu />
          </IconButton>
        )}
        <IconButton color="inherit" sx={{ml: 1}} onClick={() => {}}>
          {theme.palette.mode === "mode"? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        {!isMobile && "Search..."}
        <div>
          {!isAuthenticated ? (
            <Button color='inherit' onClick={() => {}}>
              Login &nbsp; <AccountCircle />
            </Button>
          ) : (
            <Button 
            color='inherit' 
            component={Link} 
            to={`/profile/122`}
            className={classes.linkButton}
            onClick={() => {}}
            >
              {isAuthenticated && <>My Movies &nbsp;</>}
              <Avatar 
              style={{ width: 30, height: 30}}
              alt='Profile'
              src='https://st2.depositphotos.com/1104517/11965/v/450/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg'
              />
            </Button>
          )}
        </div>
        {isMobile && "Search..."}
      </Toolbar>
   </AppBar>
   <div>
    <nav className={classes.drawer}>
            {isMobile? (
              <Drawer
              variant="temporary"
              anchor='right'
              open={mobileOpen}
              // we use this to avoid: its againt
              // react guide lines "You should not change state using the previous state"
              // that's why we have the callback function.
              onClose={() => setMobileOpen((previousMobileOpen) => !previousMobileOpen)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
              >
                <SideBar setMobileOpen={setMobileOpen} />
              </Drawer>
            ) : (
              <Drawer classes={{ paper: classes.drawerPaper }} variant='permanent' open>
                <SideBar setMobileOpen={setMobileOpen}/>
              </Drawer>
            )}
    </nav>
   </div>
   </>
  )
}

export default NavBar