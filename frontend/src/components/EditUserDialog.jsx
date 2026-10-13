import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Switch,
  Typography,
  Box,
} from "@mui/material";
import { userService } from "../services";
import { ROLES } from "../constants/roles";

const EditUserDialog = ({ open, onClose, user, currentUserEmail, onSaved }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "CUSTOMER",
    isActive: true,
  });
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (open && user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        role: user.role || "CUSTOMER",
        isActive: user.isActive ?? true,
      });
      setError(null);
    }
  }, [open, user]);

  const isSelf = user?.email === currentUserEmail;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError("First and last name are required");
      return;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }

    setIsSaving(true);
    try {
      await userService.updateUser(user.userId, formData);
      onSaved();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <Box component="form" className="mt-4">
          <TextField
            fullWidth
            label="First name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="mt-4 mb-2"
            required
          />
          <TextField
            fullWidth
            label="Last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="mt-4 mb-2"
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-4 mb-2"
            required
          />
          <TextField
            fullWidth
            label="Phone number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="mt-4 mb-2"
          />
          <FormControl fullWidth className="mt-4 mb-2">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              label="Role"
            >
              {ROLES.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isActive: e.target.checked,
                  }))
                }
                disabled={isSelf}
              />
            }
            label={formData.isActive ? "Active" : "Inactive"}
          />
          {isSelf && (
            <Typography variant="caption" color="text.secondary">
              You cannot deactivate your own account
            </Typography>
          )}
          {error && (
            <Typography color="error" className="mt-2">
              {error}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={isSaving}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditUserDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object,
  currentUserEmail: PropTypes.string,
  onSaved: PropTypes.func.isRequired,
};

export default EditUserDialog;
