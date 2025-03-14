import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

interface SearchBarProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({ setSearchQuery }: SearchBarProps) {
  const handleInputChange = (event: any) => {
    setSearchQuery(event.target.value);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100px", // Full viewport height to center vertically
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          width: "60%",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for lights, fans, sensor..."
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "25px",
              "&:hover fieldset": {
                borderColor: "primary.main",
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
              },
            },
          }}
          onChange={handleInputChange}
        />
      </Box>
    </Box>
  );
}
