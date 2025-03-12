import React, { useEffect, useState } from "react";
import {
    Box, Typography, styled, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow,Paper,
    Button
} from "@mui/material";
import { usePaymentsStore } from "../../store/usePaymentsStore";
import PaymentFilter from "../../Components/paymentsFilters/PaymentFilter";
import dayjs from 'dayjs';
import Paymentdetails from "../../Components/paymentDetails/Paymentdetails";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { height, maxHeight, maxWidth } from "@mui/system";
import Cookies from 'js-cookie';  // Importa js-cookie
import {jwtDecode} from 'jwt-decode';  // Importa jwt-decode


// Aquí el resto del código...

const AllPayments = () => {
    const { payments, fetchPayments, fetchAllPayments } = usePaymentsStore();
    const [filters, setFilters] = useState({ month: '', dni: '', nombre: '' });
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedDetail, setSelectedDetail] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [TenantId, setTenantId] = useState("");
    console.log(filteredPayments);
    console.log(filters.month);
    console.log(filters.dni);
    console.log(TenantId);
    

    useEffect(() => {
       
        const token = Cookies.get('token');  
      
        

        if (token) {
            try {
                // Decodificar el token usando jwt-decode
                const decodedToken = jwtDecode(token);
               
                
                
                // Extraer el tenantId (asegúrate de que 'tenantId' esté en el token)
                const tenantIdFromToken = decodedToken.TenantId;
                
                // Guardar tenantId en el estado
                setTenantId(tenantIdFromToken);
            } catch (error) {
                console.error('Error decodificando el token:', error);
            }
        } else {
            console.warn('Token no encontrado en la cookie.');
        }
    }, []);
    
    
    useEffect(() => {
        if(TenantId){
            fetchAllPayments(TenantId);
        }
        
    }, [filters, fetchAllPayments,TenantId]);

    useEffect(() => {
        const applyFilters = () => {
            let filtered = payments;

            // Filtrar por mes si el mes está seleccionado
            if (filters.month) {
                filtered = filtered.filter(payment => (
                   // console.log(payment)
                    
                    dayjs(payment.fecha_pago).month() + 1 === parseInt(filters.month)
                ) 
                    
                );
                console.log(filtered);
                
            }

            // Filtrar por DNI si está disponible
            if (filters.dni) {
                filtered = filtered.filter(payment => payment.UserDni === filters.dni);
            }

            setFilteredPayments(filtered);
        };

        applyFilters();
    }, [payments, filters]);

    const onFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleModalOpen = (payment) => {
        setSelectedDetail(payment);
        setOpenDetail(true);
    };

    const handleModalClose = () => {
        setOpenDetail(false);
    };

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const paginatedPayments = filteredPayments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const pageLabel = `${page * rowsPerPage + 1}-${Math.min((page + 1) * rowsPerPage, filteredPayments.length)} of ${filteredPayments.length}`;

    return (
        <MainContainer>
            
           
            <ContentContainer>
            <CustomTitle>Pagos</CustomTitle>
            <PaymentFilter onFilterChange={onFilterChange} />
                {filteredPayments.length > 0 && (
                    <CustomTableContainer component={Paper} elevation={4}>
                        <Table sx={{width:'100%', boxSizing:'border-box'}}>
                            <TableHead>
                                <TableRow>
                                    <CustomTableCell>Fecha</CustomTableCell>
                                    <CustomTableCell>Monto</CustomTableCell>
                                    <CustomTableCell>Medio</CustomTableCell>
                                    <CustomTableCell>Cliente</CustomTableCell>
                                    <CustomTableCell>Dni</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedPayments.map(payment => (
                                    <TableRow
                                        key={payment.id}
                                        onClick={() => handleModalOpen(payment)}
                                        sx={{ cursor: 'pointer', 
                                            '&:not(:last-child) td': {
                                                borderBottom: '2px solid #ca99ef', // Línea divisoria violeta entre filas
                                              },
                                        }}
                                    >
                                        <CustomTableCell>{dayjs(payment.fecha_pago).format('DD-MM-YYYY')}</CustomTableCell>
                                        <CustomTableCell>$ {payment.monto}</CustomTableCell>
                                        <CustomTableCell>{payment.medio_pago}</CustomTableCell>
                                        <CustomTableCell>{payment.User.nombre}</CustomTableCell>
                                        <CustomTableCell>{payment.UserDni}</CustomTableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CustomTableContainer>
                )}
                  <PaginationContainer>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        onClick={() => handleChangePage(page - 1)}
                        disabled={page === 0}
                        sx={{
                            color: 'white',
                            backgroundColor: 'darkgrey',
                            boxShadow: '0px 4px 8px rgba(255, 255, 255, 0.3)',  // Relieve más claro
                            marginRight: '10px',
                            '&:hover': {
                                backgroundColor: 'grey',
                                boxShadow: '0px 4px 8px rgba(255, 255, 255, 0.6)',  // Más relieve al hacer hover
                            }
                        }}
                    >
                        <ArrowBackIosIcon />
                    </Button>
                    <Button
                        onClick={() => handleChangePage(page + 1)}
                        disabled={(page + 1) * rowsPerPage >= filteredPayments.length}
                        sx={{
                            color: 'white',
                            backgroundColor: 'darkgrey',
                            boxShadow: '0px 4px 8px rgba(255, 255, 255, 0.3)',  // Relieve más claro
                            '&:hover': {
                                backgroundColor: 'grey',
                                boxShadow: '0px 4px 8px rgba(255, 255, 255, 0.6)',  // Más relieve al hacer hover
                            }
                        }}
                    >
                        <ArrowForwardIosIcon />
                    </Button>
                </Box>

                <Typography sx={{ color: 'black',}}>{pageLabel}</Typography>
            </PaginationContainer>
            </ContentContainer>
          

            {openDetail && (
                <Paymentdetails
                    open={openDetail}
                    handleModalClose={handleModalClose}
                    selectedDetail={selectedDetail}
                />
                )}
        </MainContainer>
    );
};

export default AllPayments;

// Estilos
const MainContainer = styled(Box)(({ theme }) => ({
    maxWidth: '100vw',
    height: '100vh',
    minHeight:'100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'white',
    boxSizing: 'border-box',
    padding: '15px',

    [theme.breakpoints.up('md')]: {
        width: 'calc(100vw - 240px)',
        height:'100vh',
        marginLeft: '240px',
        padding: '0',
        
      },
}));

const CustomTitle = styled(Typography)(({ theme }) => ({
    //marginTop: '50px',
    fontFamily: "Nunito",
    fontWeight: '600',
    fontSize: '45px',
    color: 'black',
  
}));

const ContentContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    height:'100%',
    marginTop:'50px',
    padding: '0',
    display: 'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    //marginTop: '50px',

    [theme.breakpoints.up('md')]: {
        maxWidth:'50%',
        height:'100vh',
        justifyContent:'space-between',
       
      },
}));

const CustomTableCell = styled(TableCell)(({ theme }) => ({
    fontSize: '16px',
    color: 'black',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  
}));

const CustomTableContainer = styled(TableContainer)(({ theme }) => ({
    width: '100%',
    maxHeight: '400px',
    minHeight:'auto',
    overflowY: 'auto',
    overflowX:'auto',
    display:'flex',
    flexDirection:'column',
    marginTop:'15px',
    
 


    [theme.breakpoints.up('md')]: {
      
        
       
      },
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  
}));


