import { Box, Button, Container, TextField, Typography, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FemaleOcto from "../assets/FemaleOcto.png";
import Nav from "./Nav";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); //loading state

  // Function to handle the search button click
  const handleClick = () => {
    if (userName !== "") {
      setLoading(true);
      setTimeout(() => {
        navigate(`./profile/${userName}`);
      }, 1000); // 1 second time delay
    }
  };
// Return the JSX of the Home component
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#303030",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Nav />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          paddingX: "100px",
        }}
      >
        <img
          src={FemaleOcto}
          alt="Female Octopus"
          style={{ width: "40%", height: "auto", borderRadius: "8px" }}
        />
        <Container
          component="form"
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
          // Handle the form submission
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleClick();
          }}
        >
          <Typography variant="h5" sx={{ color: "white", marginBottom: 2 }}>
            Github Profile Finder
          </Typography>
          <TextField
            label="Search GitHub Profiles"
            variant="outlined"
            value={userName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setUserName(event.target.value);
            }}
            fullWidth
            aria-label="Search GitHub Profiles"
            // Styling for the text field
            sx={{
              color: "white",
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
            }}
          />
          <Button
          // Styling for the search button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#000000",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#808080",
                color: "#ffffff",
              },
              marginTop: 1,
            }}
            onClick={handleClick}
            fullWidth
            disabled={loading}
          >
  
            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Search"}
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;