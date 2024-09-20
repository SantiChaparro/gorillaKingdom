import React, { useEffect, useState } from "react";
import {
    Box, Typography, styled, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, TablePagination, IconButton,
    Button
} from "@mui/material";
import { usePaymentsStore } from "../../store/usePaymentsStore";
import PaymentFilter from "../../Components/paymentsFilters/PaymentFilter";
import dayjs from 'dayjs';
import Paymentdetails from "../../Components/paymentDetails/Paymentdetails";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Aquí el resto del código...

const AllPayments = () => {
    const { payments, fetchPayments, fetchAllPayments } = usePaymentsStore();
    const [filters, setFilters] = useState({ month: '', dni: '', nombre: '' });
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedDetail, setSelectedDetail] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filteredPayments, setFilteredPayments] = useState([]);

    useEffect(() => {
        fetchAllPayments();
    }, [filters, fetchAllPayments]);

    useEffect(() => {
        const applyFilters = () => {
            setFilteredPayments(payments); // Aplica los filtros aquí
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
            <CustomTitle>pagos</CustomTitle>
            <PaymentFilter onFilterChange={onFilterChange} />
            <ContentContainer>
                {filteredPayments.length > 0 && (
                    <CustomTableContainer>
                        <Table>
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
                                        sx={{ cursor: 'pointer' }}
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
            </ContentContainer>
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

                <Typography sx={{ color: 'white', marginTop: '10px' }}>{pageLabel}</Typography>
            </PaginationContainer>

            <Paymentdetails
                open={openDetail}
                handleModalClose={handleModalClose}
                selectedDetail={selectedDetail}
                
            />
        </MainContainer>
    );
};

export default AllPayments;

// Estilos
const MainContainer = styled(Box)(({ theme }) => ({
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black',
    boxSizing: 'border-box',
    padding: '15px',
}));

const CustomTitle = styled(Typography)(({ theme }) => ({
    marginTop: '100px',
    fontFamily: "Bebas Neue",
    fontWeight: '400',
    fontSize: '3em',
    color: 'white',
    marginBottom: '30px',
}));

const ContentContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    flex: '1',
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
    boxSizing: 'border-box',
    marginTop: '50px',
}));

const CustomTableCell = styled(TableCell)(({ theme }) => ({
    fontSize: '16px',
    color: 'white',
    textAlign: 'center',
    whiteSpace: 'nowrap',
}));

const CustomTableContainer = styled(TableContainer)(({ theme }) => ({
    width: '100%',
    maxHeight: '400px',
    overflowY: 'auto',
    boxSizing: 'border-box',
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '20px',
    marginBottom: '100px',
}));


