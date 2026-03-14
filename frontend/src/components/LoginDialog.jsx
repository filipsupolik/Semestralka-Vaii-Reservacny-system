import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Stack,
} from "@mui/material";

function LoginDialog({ isOpen, handleClose }) {
  const handleSubmit = () => {};

  if (!isOpen) return null;
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Log in</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} direction="column">
            <TextField label="Email" variant="standard" margin="normal" />
            <TextField
              label="Password"
              variant="standard"
              margin="normal"
              type="password"
            />
            <DialogActions>
              <Button type="submit" variant="contained">
                Log in
              </Button>
              <Button onClick={handleClose} variant="outlined">
                Cancel
              </Button>
            </DialogActions>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;
