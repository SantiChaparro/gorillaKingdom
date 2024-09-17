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
          color: "white",
          "& fieldset": {
            borderColor: "blue",
          },
          "&:hover fieldset": {
            borderColor: "blue",
          },
          "&.Mui-focused fieldset": {
            borderColor: "blue",
          },
        },
        "& .MuiInputBase-input": {
          color: "white",
        },
        "& .MuiInputLabel-root": {
          color: "white",
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
