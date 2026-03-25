import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const MenuItemDialog = ({ open, onClose, item, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    onAddToCart(item, quantity);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs">
      <DialogTitle>{item.title}</DialogTitle>
      <DialogContent>
        <img
          src={item.image}
          alt={item.title}
          style={{ width: "100%", borderRadius: "8px" }}
        />
        <Typography variant="h6" style={{ marginTop: "16px" }}>
          Price: ${item.price}
        </Typography>
        <Typography variant="body1" style={{ marginTop: "8px" }}>
          Ingredients: {item.ingredients.join(", ")}
        </Typography>
      </DialogContent>
      <DialogActions
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          padding: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#f0f0f0",
            borderRadius: "32px",
          }}
        >
          <IconButton onClick={handleDecrease}>
            <Remove />
          </IconButton>
          <Typography>{quantity}</Typography>
          <IconButton onClick={handleIncrease}>
            <Add />
          </IconButton>
        </div>
        <Button variant="contained" color="error" onClick={handleAddToCart}>
          Add {quantity * item.price} €
        </Button>
      </DialogActions>
    </Dialog>
  );
};

MenuItemDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default MenuItemDialog;
