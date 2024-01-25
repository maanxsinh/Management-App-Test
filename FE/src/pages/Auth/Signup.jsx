import { Box, Button, Typography, styled } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  passwordInput,
  resetUserInf,
  signupThunk,
  userNameInput,
} from "../../Reducer/authSlice";
import { setSnackbar } from "../../utils/commonUtils";
import SnackbarComponent from "../../components/Snackbar";

const Signup = () => {
  const [cfPassword, setCfPassword] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInf = useSelector((state) => state.login.userInf);
  const dataSignup = useSelector((state) => state.login.data);

  const handleSignup = () => {
    const userName = userInf?.userName;
    const password = userInf?.password;
    if (password !== cfPassword) {
      setSnackbar("warning", "Password do not match!", dispatch);
    } else {
      dispatch(signupThunk({ userName, password }));
      if (dataSignup?.errCode === 1) {
        setSnackbar("warning", "User already exists");
      } else {
        setSnackbar("success", "Sign up successfull", dispatch);
        dispatch(resetUserInf());
        navigate("/login");
      }
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <Container>
        <Typography sx={{ fontWeight: 600, fontSize: "32px", margin: "30px" }}>
          Signup
        </Typography>
        <Input
          placeholder="Username"
          onChange={(e) => dispatch(userNameInput(e.target.value))}
        />
        <Input
          placeholder="Create Password"
          type="password"
          onChange={(e) => dispatch(passwordInput(e.target.value))}
        />
        <Input
          placeholder="Confirm Password"
          type="password"
          onChange={(e) => setCfPassword(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ width: "314px", margin: "15px" }}
          onClick={() => handleSignup()}>
          Signup
        </Button>
        <Typography sx={{ margin: "15px 0", display: "flex" }}>
          {" "}
          Already have an account?
          <TypoClick onClick={() => navigate("/login")}>&nbsp;Login</TypoClick>
        </Typography>
        <SnackbarComponent />
      </Container>
    </Box>
  );
};

export default Signup;

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.2)",
  height: "439px",
  width: "386px",
  display: "flex",
  // justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  borderRadius: "10px",
}));

const Input = styled("input")(({ theme }) => ({
  border: "none",
  height: "39px",
  width: "284px",
  backgroundColor: "#eee",
  margin: "8px 0",
  padding: "0 15px",
}));
const TypoClick = styled(Typography)(({ theme }) => ({
  color: "var(--myBlue)",
  cursor: "pointer",
}));
