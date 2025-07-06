import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import { Button } from "@mui/material";
import axios from "axios";

const providers = [{ id: "credentials", name: "Email and Password" }];

const signIn = async (provider, formData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await axios.post(
      "https://blog-backend-t8ey.onrender.com/api/users/login",
      { email, password }
    );
    localStorage.setItem("token", res.data.token);
    alert("Login successful!");
    window.location.href = "/blog-application/";
  } catch (error) {
    alert(error.response?.data?.message || "Login failed");
  }
};

function Login() {
  const theme = useTheme();

  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slots={{
          submitButton: (props) => (
            <Button {...props} variant="outlined" sx={{border: "1px solid #000", color: "#000", "&:hover":{color: "#fff"}}}>
              Log in now
            </Button>
          ),
        }}
        slotProps={{
          emailField: { autoFocus: true },
          form: { noValidate: true },
        }}
      />
    </AppProvider>
  );
}

export default Login;
