import React, {useState,useEffect} from "react";
import {useUsersStore} from '../../../store/useUsersStore';
import { Box, Typography , Card, Button, TextField} from '@mui/material';



const EditUsers = () => {

    const { users , fetchUsers , modifyUser} = useUsersStore();
    const [isEditing , setIsEditing] = useState(null);
    const [preEditUser , setPreEditUser] = useState(null);
    const [activeUsers , setActiveUsers] = useState([]);
    const [userLoaded , setUserLoaded] = useState(false); 
    const [values , setValues] = useState({
        nombre: "",
        dni: "",
        fecha_nacimiento: "",
        domicilio: "",
        mail: "",
        telefono: ""
    })

    console.log(preEditUser);
    console.log(values);
    console.log(activeUsers);


    useEffect(() => {
       fetchUsers()
       
    }, []);

    useEffect(()=>{
        fetchinActiveUsers()
    },[users])

    


    const fetchinActiveUsers = async() => {
        
        const filteredUsers = users.filter(user => user.activo === true);
        setActiveUsers(filteredUsers);
        console.log(activeUsers);
    };

    console.log(users);
    const handleEdit = (index, user) => {
        setPreEditUser(user); // Guarda el usuario antes de la edición
        setValues({
            nombre: user.nombre,
            dni: user.dni,
            fecha_nacimiento: user.fecha_nacimiento,
            domicilio: user.domicilio,
            mail: user.mail,
            telefono: user.telefono,
            activo: user.activo
        }); // Inicializa los valores de los campos de texto con los valores del usuario
        setIsEditing(index);
    };

    const handleCancelEdit = () => {
        setIsEditing(false)
    }

    const handlesave = async(dni) => {

        const dataToUpdate = compareObjects(preEditUser,values)
        console.log(dataToUpdate);

       await modifyUser(dni,dataToUpdate);

        setIsEditing(null);

       await fetchUsers();
        


        
    };

    const handleFieldChange = (event) => {
        const {name , value} = event.target;

        setValues(prevValues => ({...prevValues,[name]:value}))
    };

    const compareObjects = (obj1, obj2) => {
        const dataToUpdate = {};
        for (let key in obj1) {
            if (obj1[key] !== obj2[key]) {
                if (obj2.hasOwnProperty(key)) {
                    dataToUpdate[key] = obj2[key];
                }
            }
        }
       
        return dataToUpdate;
    };

    const handleDelete = async(dni) => {

        await modifyUser(dni,{activo:false})
        await fetchUsers()
        //await fetchinActiveUsers()

    };

    return (
        <Box>
            {activeUsers.map((user,index) => {
                return (
                    <Card key={user.dni}>
                        {isEditing === index ? (
                            <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
                                <TextField 
                                label="Nombre" 
                                value={values.nombre}
                                onChange={handleFieldChange}
                                name="nombre"
                                />
                                <TextField 
                                label="DNI" 
                                value={values.dni}
                                onChange={handleFieldChange} 
                                name="dni"
                                disabled
                                />
                                <TextField 
                                label="Fecha nacimiento" 
                                value={values.fecha_nacimiento}
                                onChange={handleFieldChange}
                                name="fecha_nacimiento"
                                />
                                <TextField 
                                label="Domicilio" 
                                value={values.domicilio}
                                onChange={handleFieldChange}
                                name="domicilio"
                                />
                                <TextField 
                                label="Mail" 
                                value={values.mail}
                                onChange={handleFieldChange}
                                name="mail"
                                />
                                <TextField 
                                label="Telefono" 
                                value={values.telefono}
                                onChange={handleFieldChange}
                                name="telefono"
                                />
                                {/* Otros campos aquí */}
                                <Button onClick={()=> handlesave(user.dni)}>Guardar</Button>
                                <Button onClick={() => handleCancelEdit()}>Cancelar</Button>
                            </Box>
                        ) : (
                            <Box sx={{ display: "flex", gap: "2em" }}>
                                <Typography>{user.nombre}</Typography>
                                <Typography>{user.dni}</Typography>
                                <Button onClick={() => handleEdit(index,user)}>Editar</Button>
                                <Button onClick={()=>{handleDelete(user.dni)}}>Eliminar</Button>
                            </Box>
                        )}
                    </Card>
                );
            })}
        </Box>
    );
    


};


export default EditUsers;