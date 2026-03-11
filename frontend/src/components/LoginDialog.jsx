import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";

function LoginDialog({ isOpen, handleClose }) {
  const handleSubmit = () => {};

  if (!isOpen) return null;
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Log in</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField label="Email" variant="standard" margin="normal" />
          <TextField
            label="Password"
            variant="standard"
            margin="normal"
            type="password"
          />
          <Button type="submit" variant="contained">
            Log in
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;
