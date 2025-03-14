import {
  AppBar,
  Box,
  MenuItem,
  Toolbar,
  Typography,
  Avatar,
  Container,
  IconButton,
  Menu,
  Select,
  SelectChangeEvent,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext"; // Import Context
// useContext to get user info
import { AuthContext } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function NavBar() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  // const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const themeContext = useContext(ThemeContext);
  const authContext = useContext(AuthContext); // Get user info

  const { user, logout  } = authContext;
  // const userPhoto = jwtDecode(localStorage.getItem("credential")).picture;
  if (!themeContext) {
    throw new Error("NavBar must be used within a ThemeProviderWrapper");
  }

  const { themeMode, toggleTheme } = themeContext;

  const handleChangeTheme = (event: SelectChangeEvent) => {
    toggleTheme(event.target.value as "dark" | "light" | "purple");
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1100,
        marginBottom: 2,
        opacity: 0.5,
        transition: "opacity 0.3s ease-in-out",
        "&:hover": {
          opacity: 1,
        },
      }}
    >
      <AppBar
        position="static"
        sx={{
          px: 2,
        }}
      >
        <Toolbar disableGutters>
          <Container
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <EditIcon />
            <MenuItem onClick={() => navigate("/")}>
              <Typography>Home</Typography>
            </MenuItem>
            <MenuItem onClick={() => navigate("/about")}>
              <Typography>About</Typography>
            </MenuItem>
          </Container>

          {/* Chọn theme */}
          <Select
            value={themeMode}
            onChange={handleChangeTheme}
            sx={{
              color: "white",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "gray",
              },
            }}
          >
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
            <MenuItem value="purple">Purple</MenuItem>
          </Select>
          {user ? (
            <>
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar alt={user.username} src={user.avatar} />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => navigate("/account")}>
                  <Typography sx={{ textAlign: "center" }}>
                    Trang cá nhân
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => navigate("/login")}>
                  <Typography sx={{ textAlign: "center" }}>
                    Đăng xuất
                  </Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button variant="outlined" onClick={() => navigate("/login")}>
              <Typography>Login</Typography>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
