import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const FormDialog = ({
  open,
  onClose,
  title,
  children,
  onSubmit,
  submitLabel,
  isSubmitting = false,
  maxWidth = "sm",
}) => (
  <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>{children}</DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button
        onClick={onSubmit}
        variant="contained"
        color="primary"
        disabled={isSubmitting}
      >
        {submitLabel}
      </Button>
    </DialogActions>
  </Dialog>
);

FormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool,
  maxWidth: PropTypes.string,
};

export default FormDialog;
