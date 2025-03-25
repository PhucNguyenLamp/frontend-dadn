import {
  Paper,
  Typography,
  Box,
  Container,
  Avatar
} from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Account() {
  const { user } = useContext(AuthContext);
  return (
    <Box sx={{ backgroundColor: "background.default" }}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
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
      <Paper>
      <Typography variant="h2">ACCOUNT</Typography>
      <Typography variant="h4">Name: {user?.username}</Typography>
      <Typography variant="h4">Email: {user?.email}</Typography>
      </Paper>
      </Container>
    </Box>
  );
}
