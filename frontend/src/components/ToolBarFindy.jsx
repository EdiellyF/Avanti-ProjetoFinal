"use client"

import { useState, useContext } from "react"
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { Menu as MenuIcon, AccountCircle, Add, Search, Logout } from "@mui/icons-material"
import { AuthContext } from "../context/AuthContext"
import LogoFindy from "../public/logoFindy.png"

function ToolBarFindy() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const { token, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleMenuClose()
    navigate("/")
  }

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return
    }
    setDrawerOpen(open)
  }

  const menuItems = [
  ]

  const filteredMenuItems = menuItems.filter((item) => !item.requiresAuth || (item.requiresAuth && token))

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={LogoFindy} alt="Logo Findy" style={{ height: 40, marginRight: 8 }} />
      </Box>
      <Divider />
      <List>
        {filteredMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {!token ? (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/login">
                <ListItemText primary="Entrar" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/cadastrar">
                <ListItemText primary="Cadastrar" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemText primary="Sair" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  )

  return (
    <AppBar position="fixed" color="background">
      <Toolbar>
        {isMobile && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <img src={LogoFindy} alt="Logo Findy" style={{ height: 40, marginRight: 8 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              display: { xs: "none", sm: "block" },
            }}
          >
          </Typography>
        </Box>

        {!isMobile && (
          <Box sx={{ flexGrow: 1, display: "flex", ml: 4 }}>
            {filteredMenuItems.map((item) => (
              <Button
                key={item.text}
                component={Link}
                to={item.path}
                sx={{
                  color: "white",
                  display: "block",
                  mx: 1,
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        )}

        <Box sx={{ flexGrow: 1 }} />

        {!isMobile && (
          <Box sx={{ display: "flex" }}>
            <Button color="inherit" component={Link} to="/buscar" startIcon={<Search />}>
              Buscar
            </Button>

            {token ? (
              <>
                <Button color="inherit" component={Link} to="/item/novo" startIcon={<Add />} sx={{ ml: 1 }}>
                  Novo Item
                </Button>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar sx={{ width: 32, height: 32, bgcolor: "secondary.main" }}>
                    <AccountCircle />
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem component={Link} to="/perfil" onClick={handleMenuClose}>
                    Perfil
                  </MenuItem>
                  <MenuItem component={Link} to="/meus-itens" onClick={handleMenuClose}>
                    Meus Itens
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Logout fontSize="small" sx={{ mr: 1 }} />
                    Sair
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box>
                <Button color="inherit" component={Link} to="/login">
                  Entrar
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  component={Link}
                  to="/cadastrar"
                  sx={{
                    ml: 1,
                    borderColor: "white",
                    "&:hover": {
                      borderColor: "white",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  Cadastrar
                </Button>
              </Box>
            )}
          </Box>
        )}
      </Toolbar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawer}
      </Drawer>
    </AppBar>
  )
}

export default ToolBarFindy
