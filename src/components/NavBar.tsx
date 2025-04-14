import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const pages =[{name:'Home', link:'/'}, {name:'Resources', link:'/resources'}]

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{color: "white", mr: 2}}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "white" }}>
            Curbside
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' , marginLeft: 0} }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                sx={{ my: 2, color: 'white', display: 'block' }}
                href={page.link}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Button color="inherit" sx={{color: "white"}} href="/admin">Admin</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
