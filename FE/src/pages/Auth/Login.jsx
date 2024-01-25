import { Box, Button, Typography, styled } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginThunk,
  passwordInput,
  userNameInput,
} from "../../Reducer/authSlice";
import { setSnackbar } from "../../utils/commonUtils";
import SnackbarComponent from "../../components/Snackbar";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInf = useSelector((state) => state.login.userInf);
  const dataLogin = useSelector((state) => state.login.data);

  const handleLogin = () => {
    const userName = userInf?.userName;
    const password = userInf?.password;
    dispatch(loginThunk({ userName, password }));
    if (dataLogin?.errCode === 1) {
      setSnackbar("warning", "Wrong Username Or Password!", dispatch);
    } else {
      navigate("/");
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
          Login
        </Typography>
        <Input
          placeholder="Username"
          onChange={(e) => dispatch(userNameInput(e.target.value))}
        />
        <Input
          placeholder="Password"
          type="password"
          onChange={(e) => dispatch(passwordInput(e.target.value))}
        />
        <TypoClick sx={{ margin: "15px 0" }}> Forgot password?</TypoClick>
        <Button
          variant="contained"
          sx={{ width: "314px" }}
          onClick={() => handleLogin()}>
          Login
        </Button>
        <Typography sx={{ margin: "15px 0", display: "flex" }}>
          {" "}
          Don't have an account?
          <TypoClick onClick={() => navigate("/signup")}>
            &nbsp;Signup
          </TypoClick>
        </Typography>
        <SnackbarComponent />
      </Container>
    </Box>
  );
};

export default Login;

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.2)",
  height: "400px",
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

// const Button = styled("button")(({ theme }) => ({
//   border: "none",
//   height: "40px",
//   width: "143px",
//   backgroundColor: "#eee",
//   margin: "8px 0",
//   padding: "0 15px",
// }));
