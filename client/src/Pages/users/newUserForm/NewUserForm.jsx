import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box } from "@mui/material";

const validationSchema = Yup.object({
  dni: Yup.number().typeError('El DNI debe ser un número').required('El DNI es requerido'),
  nombre: Yup.string().required("El nombre es requerido"),
  fecha_nacimiento: Yup.string().required("La fecha de nacimiento es requerida"),
  telefono: Yup.string().required("El teléfono es requerido"),
  mail: Yup.string().email("Formato de correo electrónico inválido").required("El correo electrónico es requerido"),
  domicilio: Yup.string().required("El domicilio es requerido"),
  rol: Yup.string().required("El rol es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
});

const NewUserForm = () => {
  const initialValues = {
    dni: "",
    nombre: "",
    fecha_nacimiento: "",
    telefono: "",
    mail: "",
    domicilio: "",
    rol: "",
    password: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <Box width="100%" display="flex" justifyContent="center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange // Habilita la validación en tiempo real
      >
        {(formikProps) => (
          <Form>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Box sx={{ marginBottom: 2, display: "flex" }}>
                <Box sx={{ marginRight: 2 }}>
                  <Field name="dni">
                    {({ field, meta }) => (
                      <TextField
                        {...field}
                        label="DNI"
                        error={meta.touched && !!meta.error}
                        helperText={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                </Box>
                <Box>
                  <Field name="nombre">
                    {({ field, meta }) => (
                      <TextField
                        {...field}
                        label="Nombre"
                        error={meta.touched && !!meta.error}
                        helperText={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                </Box>
              </Box>

              <Box sx={{ marginBottom: 2, display: "flex" }}>
                <Box sx={{ marginRight: 2 }}>
                  <Field name="fecha_nacimiento">
                    {({ field, meta }) => (
                      <TextField
                        {...field}
                        label="Fecha de nacimiento"
                        error={meta.touched && !!meta.error}
                        helperText={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                </Box>
                <Box>
                  <Field name="telefono">
                    {({ field, meta }) => (
                      <TextField
                        {...field}
                        label="Teléfono"
                        error={meta.touched && !!meta.error}
                        helperText={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                </Box>
              </Box>

              <Box sx={{ marginBottom: 2, display: "flex" }}>
                <Box sx={{ marginRight: 2 }}>
                  <Field name="mail">
                    {({ field, meta }) => (
                      <TextField
                        {...field}
                        label="Correo electrónico"
                        error={meta.touched && !!meta.error}
                        helperText={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                </Box>
                <Box>
                  <Field name="domicilio">
                    {({ field, meta }) => (
                      <TextField
                        {...field}
                        label="Domicilio"
                        error={meta.touched && !!meta.error}
                        helperText={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                </Box>
              </Box>

              <Box sx={{ marginBottom: 2, display: "flex" }}>
                <Box sx={{ marginRight: 2 }}>
                  <Field name="rol" as="select">
                    {({ field, meta }) => (
                      <TextField
                        {...field}
                        select
                        label="Rol"
                        error={meta.touched && !!meta.error}
                        helperText={meta.touched && meta.error}
                        sx={{width:"224px"}}
                      >
                        <option value="">Seleccione...</option>
                        <option value="cliente">Cliente</option>
                        <option value="master">Master</option>
                      </TextField>
                    )}
                  </Field>
                </Box>
                <Box>
                  <Field name="password">
                    {({ field, meta }) => (
                      <TextField
                        {...field}
                        type="password"
                        label="Contraseña"
                        error={meta.touched && !!meta.error}
                        helperText={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                </Box>
              </Box>

              <Box mt={2}>
                <Button type="submit" disabled={formikProps.isSubmitting} variant="contained">
                  Enviar
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default NewUserForm;
