import { Avatar, Divider } from "@mui/material";
// import LockIcon from "@material-ui/icons/Lock";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Radio,
  Typography,
  Container,
  Table,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginButton from "../../components/LoginButton";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: "background.default" }}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          padding: 2,
          pt: 10,
          minHeight: "100vh",
        }}
      >
        <Avatar
          sx={{
            backgroundColor: "secondary.main",
            color: "secondary",
          }}
        >
          {/* <LockIcon /> */}
        </Avatar>
        <TextField
          variant="outlined"
          label="username"
          sx={{
            width: "100%", // Full width of parent
            maxWidth: "500px", // Limit maximum width
            minWidth: "200px", // Ensure it doesn't shrink too much
          }}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="password"
          sx={{
            width: "100%", // Full width of parent
            maxWidth: "500px", // Limit maximum width
            minWidth: "200px", // Ensure it doesn't shrink too much
          }}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* or login via OAuth */}
        <Button
          variant="contained"
          sx={{
            width: "100%", // Full width of parent
            maxWidth: "500px", // Limit maximum width
            minWidth: "200px", // Ensure it doesn't shrink too much
          }}
        >
          Login
        </Button>
        <Divider sx={{ width: "100%", color: "text.primary" }}> OR </Divider>
        <LoginButton />
        
      </Container>
    </Box>
  );
}
