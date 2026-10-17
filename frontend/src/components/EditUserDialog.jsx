import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
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
import {
  EMAIL_REGEX,
  PHONE_REGEX,
  PHONE_PLACEHOLDER,
} from "../constants/validation";
import FormDialog from "./FormDialog";
import FormTextField from "./FormTextField";

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
        phoneNumber:
          user.phoneNumber === PHONE_PLACEHOLDER ? "" : user.phoneNumber || "",
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
    if (!EMAIL_REGEX.test(formData.email.trim())) {
      setError("Invalid email format");
      return;
    }
    const phoneNumber = formData.phoneNumber.trim();
    if (phoneNumber && !PHONE_REGEX.test(phoneNumber)) {
      setError("Invalid phone number format");
      return;
    }

    setIsSaving(true);
    try {
      await userService.updateUser(user.userId, {
        ...formData,
        email: formData.email.trim(),
        phoneNumber: phoneNumber || PHONE_PLACEHOLDER,
      });
      onSaved();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <FormDialog
      open={open}
      onClose={onClose}
      title="Edit User"
      onSubmit={handleSubmit}
      submitLabel="Save Changes"
      isSubmitting={isSaving}
    >
      <Box component="form" className="mt-4 flex flex-col gap-4">
        <FormTextField
          label="First name"
          name="firstName"
          placeholder="John"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
        <FormTextField
          label="Last name"
          name="lastName"
          placeholder="Doe"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
        <FormTextField
          label="Email"
          name="email"
          type="email"
          placeholder="john.doe@example.com"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <FormTextField
          label="Phone number (optional)"
          name="phoneNumber"
          placeholder="+421 900 123 456"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
        <FormControl fullWidth>
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
    </FormDialog>
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
