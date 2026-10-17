import { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { authService } from "../services";
import {
  PHONE_REGEX,
  PHONE_PLACEHOLDER,
  PASSWORD_MIN_LENGTH,
} from "../constants/validation";

function LoginDialog({ isOpen, handleClose, onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isRestaurantOwner, setIsRestaurantOwner] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setIsRegistering(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
    setIsRestaurantOwner(false);
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (isRegistering) {
      if (password.length < PASSWORD_MIN_LENGTH) {
        setError(`Password must be at least ${PASSWORD_MIN_LENGTH} characters`);
        return;
      }
      if (phoneNumber.trim() && !PHONE_REGEX.test(phoneNumber.trim())) {
        setError("Invalid phone number format");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      if (isRegistering) {
        await authService.register({
          firstName,
          lastName,
          email,
          password,
          phoneNumber: phoneNumber.trim() || PHONE_PLACEHOLDER,
          role: isRestaurantOwner ? "RESTAURANT_OWNER" : "CUSTOMER",
        });
        resetForm();
        return;
      }

      const loggedUser = await authService.login(email, password);
      resetForm();
      onLogin(loggedUser);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseDialog = () => {
    setError(null);
    handleClose();
  };

  if (!isOpen) return null;
  return (
    <Dialog open={isOpen} onClose={handleCloseDialog}>
      <DialogTitle>{isRegistering ? "Register" : "Log in"}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            {isRegistering && (
              <>
                <TextField
                  label="First name"
                  variant="standard"
                  className="mt-4 mb-2"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  required
                />
                <TextField
                  label="Last name"
                  variant="standard"
                  className="mt-4 mb-2"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  required
                />
              </>
            )}
            <TextField
              label="Email"
              variant="standard"
              className="mt-4 mb-2"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <TextField
              label="Password"
              variant="standard"
              className="mt-4 mb-2"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              helperText={
                isRegistering
                  ? `At least ${PASSWORD_MIN_LENGTH} characters`
                  : undefined
              }
              required
            />
            {isRegistering && (
              <TextField
                label="Phone number (optional)"
                variant="standard"
                className="mt-4 mb-2"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
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
            {error && (
              <Typography color="error" role="alert">
                {error}
              </Typography>
            )}
            <DialogActions>
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                {isSubmitting
                  ? "Please wait..."
                  : isRegistering
                    ? "Register"
                    : "Log in"}
              </Button>
              <Button onClick={handleCloseDialog} variant="outlined">
                Cancel
              </Button>
            </DialogActions>
            <Button
              type="button"
              variant="text"
              onClick={() => {
                setIsRegistering((current) => !current);
                setError(null);
              }}
            >
              {isRegistering
                ? "Already have an account? Log in"
                : "Don't have an account? Register"}
            </Button>
          </div>
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
