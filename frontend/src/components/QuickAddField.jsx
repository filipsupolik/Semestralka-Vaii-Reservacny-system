import PropTypes from "prop-types";
import { TextField, Button } from "@mui/material";

const QuickAddField = ({
  label,
  value,
  onChange,
  onAdd,
  isLoading = false,
  autoFocus = false,
}) => (
  <div className="mt-2 flex gap-2">
    <TextField
      fullWidth
      size="small"
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoFocus={autoFocus}
    />
    <Button
      variant="outlined"
      onClick={onAdd}
      disabled={!value.trim() || isLoading}
    >
      Add
    </Button>
  </div>
);

QuickAddField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

export default QuickAddField;
