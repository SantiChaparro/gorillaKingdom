import React from "react";
import { TextField, MenuItem } from "@mui/material";

const PaymentModeSelector = ({ selectedPaymentmode, handlePaymentModeChange }) => {
  return (
    <TextField
      select
      label="Modo de Pago"
      value={selectedPaymentmode}
      onChange={handlePaymentModeChange}
      fullWidth
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor:'white',
          color: "black",
          "& fieldset": {
            borderColor: "black",
          },
          "&:hover fieldset": {
            borderColor: "#ca99ef",
            border:'2px solid #ca99ef'
          },
          "&.Mui-focused fieldset": {
            borderColor: "#ca99ef",
          },
        },
        "& .MuiInputBase-input": {
          color: "black",
        },
        "& .MuiInputLabel-root": {
          color: "black",
        },
        marginTop: 3, // Para dar algo de separación con la tabla
      }}
    >
      <MenuItem value="">
        <em>Seleccionar</em>
      </MenuItem>
      <MenuItem value="Efectivo">Efectivo</MenuItem>
      <MenuItem value="Transferencia">Transferencia</MenuItem>
      <MenuItem value="Débito">Débito</MenuItem>
      <MenuItem value="Crédito">Crédito</MenuItem>
    </TextField>
  );
};

export default PaymentModeSelector;
