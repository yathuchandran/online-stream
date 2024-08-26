import React, { useState } from "react";
import "./navbar.css";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { keySerch } from "../../Api/Api";

function NavBar({setAllMovies}) {
  const LoginName = localStorage.getItem("sLoginName");
  const navigate = useNavigate();
const [search,setSeach]=useState("")

  const handleCreateMovie = () => {
    navigate("/addmovie"); // Navigate to the Add Movie page
  };

  const handleLogout = () => {
    localStorage.removeItem("sLoginName"); // Clear the login information
    // navigate("/login"); // Navigate to the login page after logging out
  };


  const handlesubmit= async()=>{
    const res=await keySerch(search)
    
    setAllMovies(res)
    setSeach("")

  }


  return (
    <div className="navbar">
      <img
        className="logo"
        src="https://www.pngall.com/wp-content/uploads/2018/06/Cinema-PNG-Image-HD.png"
        alt="Netflix logo"
      />

      <Box sx={{ display: "flex", alignItems: "center", flexGrow: 5 }}>
        <Button
          variant="text"
          sx={{
            marginRight: "auto",
            color: "#fff", // Ensure the text color is visible
            backgroundColor: "transparent", // Set background to transparent
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)", // Add slight hover effect
            },
          }}
          onClick={handleCreateMovie} // Handle button click
        >
          Add Movie
        </Button>
      </Box>

      {/* Search Field with Button */}
      <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
        <TextField

          variant="outlined"
          placeholder="Search..."
          onChange={(e)=>setSeach(e.target.value) } 
          sx={{
            // width: "160px", // Reduced width
            input: { color: "#fff", height: "2.5rem" }, // Set the text color inside the search field
            fieldset: { borderColor: "rgba(255, 255, 255, 0.5)" }, // Set border color
            "& .MuiOutlinedInput-root": {
              height: "2.5rem", // Ensure the height matches the button
              "&:hover fieldset": {
                borderColor: "rgba(255, 255, 255, 0.8)", // Hover border color
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#fff", height: "1.5rem" }} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          sx={{
            marginLeft: 1,
            height: "2.5rem", // Match the height with the TextField
            backgroundColor: "rgba(255, 255, 255, 0.1)", // Transparent background
            color: "#fff",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)", // Slightly darker on hover
            },
          }}
          onClick={handlesubmit} // Handle search button click
        >
          Search
        </Button>
      </Box>

      <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
        {/* <Tooltip title="Open settings">
          <IconButton sx={{ p: 0 }}>
            <Stack direction="row" spacing={2}  alignItems="center">
              <Avatar>{LoginName}</Avatar>
            </Stack>
          </IconButton>
        </Tooltip> */}

        {/* Logout Button */}
        {LoginName && (
  <Button
    variant="text"
    sx={{
      color: "#fff",
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)", // Add slight hover effect
      },
      marginLeft: 2,
    }}
    onClick={handleLogout}
  >
    Logout
  </Button>
)}

      </Box>
    </div>
  );
}

export default NavBar;
