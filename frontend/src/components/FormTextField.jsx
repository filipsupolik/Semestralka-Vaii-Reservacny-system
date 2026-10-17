import PropTypes from "prop-types";
import { TextField } from "@mui/material";

const FormTextField = ({ error, helperText, className = "", ...rest }) => (
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
