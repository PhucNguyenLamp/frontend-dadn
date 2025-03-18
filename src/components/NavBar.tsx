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
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext"; // Import Context

export default function NavBar() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  // const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("no theme");
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
            <HomeIcon />
            <MenuItem onClick={() => navigate("/")}>
              <Typography>Home</Typography>
            </MenuItem>
            <MenuItem onClick={() => navigate("/statistics")}>
              <Typography>Statistics</Typography>
            </MenuItem>
            <MenuItem onClick={() => navigate("/logs")}>
              <Typography>Logs</Typography>
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
              height: "40px",
            }}
          >
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
            <MenuItem value="purple">Purple</MenuItem>
          </Select>
          <>
            <IconButton onClick={handleOpenUserMenu}>
              <Avatar alt={"user"} src={"/mila.webp"} />
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}
