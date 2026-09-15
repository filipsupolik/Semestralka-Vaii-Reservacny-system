import { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

function LoginDialog({ isOpen, handleClose, onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isRestaurantOwner, setIsRestaurantOwner] = useState(false);

  const resetForm = () => {
    setIsRegistering(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
    setIsRestaurantOwner(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/auth/${isRegistering ? "register" : "login"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            isRegistering
              ? {
                  firstName,
                  lastName,
                  email,
                  password,
                  phoneNumber,
                  role: isRestaurantOwner ? "RESTAURANT_OWNER" : "CUSTOMER",
                }
              : { email, password },
          ),
        },
      );

      if (!response.ok) {
        throw new Error(
          `${isRegistering ? "Registration" : "Login"} failed with status ${response.status}`,
        );
      }

      const data = await response.json();
      console.log(
        `${isRegistering ? "Registration" : "Login"} successful:`,
        data,
      );

      resetForm();

      if (isRegistering) {
        return;
      } else {
        onLogin(data);
      }
    } catch (error) {
      console.error(
        `${isRegistering ? "Registration" : "Login"} failed:`,
        error,
      );
    }
  };

  if (!isOpen) return null;
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{isRegistering ? "Register" : "Log in"}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} direction="column">
            {isRegistering && (
              <>
                <TextField
                  label="First name"
                  variant="standard"
                  margin="normal"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  required
                />
                <TextField
                  label="Last name"
                  variant="standard"
                  margin="normal"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  required
                />
              </>
            )}
            <TextField
              label="Email"
              variant="standard"
              margin="normal"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <TextField
              label="Password"
              variant="standard"
              margin="normal"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            {isRegistering && (
              <TextField
                label="Phone number"
                variant="standard"
                margin="normal"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                required
              />
            )}
            {isRegistering && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isRestaurantOwner}
                    onChange={(event) =>
                      setIsRestaurantOwner(event.target.checked)
                    }
                  />
                }
                label="Register as restaurant owner"
              />
            )}
            <DialogActions>
              <Button type="submit" variant="contained">
                {isRegistering ? "Register" : "Log in"}
              </Button>
              <Button onClick={handleClose} variant="outlined">
                Cancel
              </Button>
            </DialogActions>
            <Button
              type="button"
              variant="text"
              onClick={() => setIsRegistering((current) => !current)}
            >
              {isRegistering
                ? "Already have an account? Log in"
                : "Don't have an account? Register"}
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}

LoginDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default LoginDialog;
