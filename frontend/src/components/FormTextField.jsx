import PropTypes from "prop-types";
import { TextField } from "@mui/material";

const FormTextField = ({
  error,
  helperText,
  className = "mt-4 mb-2",
  ...rest
}) => (
  <TextField
    fullWidth
    error={!!error}
    helperText={error || helperText}
    className={className}
    {...rest}
  />
);

FormTextField.propTypes = {
  error: PropTypes.string,
  helperText: PropTypes.string,
  className: PropTypes.string,
};

export default FormTextField;
