import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { paperStyle } from "./AuthStyles";
import { singUpValidations } from "./validations";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { handleSubmit, handleChange, touched, values, errors } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: singUpValidations,
    onSubmit: async ({ username, email, password }, bag) => {
      try {
        const res = await axios.post(
          "http://localhost:8080/api/webuser/register",
          {
            email,
            password,
            username,
          }
        );
        navigate("/verify", {
          state: email,
        });
      } catch (error) {
        bag.setErrors({ general: error.response.data.msg });
      }
    },
  });

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid textAlign="center" marginBottom={2}>
          <Typography variant="h5" fontWeight="bold">
            Sign Up
          </Typography>
          <Typography variant="caption">
            Please fill this from to create an account!
          </Typography>
        </Grid>
        <Grid>
          {errors.general && <Alert severity="error">{errors.general}</Alert>}
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="username"
            label="Username"
            variant="standard"
            placeholder="Enter you username"
            onChange={handleChange}
            value={values.username}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
          />
          <TextField
            fullWidth
            name="email"
            label="Email"
            variant="standard"
            placeholder="Enter you email"
            onChange={handleChange}
            value={values.email}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            type="password"
            name="password"
            label="Password"
            variant="standard"
            placeholder="Enter you password"
            onChange={handleChange}
            value={values.password}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            type="password"
            name="confirmPassword"
            fullWidth
            label="Confirm Password"
            variant="standard"
            placeholder="Enter you comfirm password"
            onChange={handleChange}
            value={values.confirmPassword}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />
          <Grid marginTop={3}>
            <Button
              fullWidth
              textAlign="center"
              type="submit"
              variant="contained"
              color="primary"
            >
              Sign Up
            </Button>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};
