import { Box, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { api } from '../../usercomponents/config/api';


export const Clients = () => {
    const [clients, setClients] = useState([]);
    const jwt = localStorage.getItem("jwt");
    useEffect(() => {
        const fetchClients = async () => {
          
          try {
            const response = await api.get("/api/allusers", {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            });
            setClients(response.data);
          } catch (error) {
            console.error("Error fetching bookings:", error);
          }
        };
      
        fetchClients();
      }, []);
      
  return (
    <Box>
    <Card className='mt-2'>
        <CardHeader title={"All Clients"} sx={{pt:2, alignItems:"center"}}/>
        {clients.length === '0'?(<p>No Bookings Found!</p>):(
          <TableContainer component={Paper}>
           <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead sx={{
                    backgroundColor: '#6b6767',
                    '& .MuiTableCell-root': {
                        fontFamily: 'Roboto, sans-serif', 
                        fontSize: '16px',
                        fontWeight: 'bold',
                    },
                }}>
               <TableRow>
                   <TableCell>id</TableCell>
                   <TableCell align="left">FirstName</TableCell>
                   <TableCell align="left">LastName</TableCell>
                   <TableCell align="left">Email</TableCell>
                   <TableCell align="left">Role</TableCell>
               </TableRow>
               </TableHead>
               <TableBody>
               {clients.map((item,index) => (
                   <TableRow
                   key={item.id}
                   sx={{ '&:last-child td, &:last-child th': { border: 0 }, 
                         '&:hover': {
                           backgroundColor: '#76858a', 
                          }, 
                      }}
                   >
                   <TableCell component="th" scope="row">
                       {item.id}
                   </TableCell>
                   <TableCell align="left">{item.firstName}</TableCell>
                   <TableCell align="left">{item.lastName}</TableCell>
                   <TableCell align="left">{item.email}</TableCell>
                   <TableCell align="left">{item.role}</TableCell>
                   
                   </TableRow>
                ))} 
               </TableBody>
           </Table>
         </TableContainer>
        )}
        
    </Card>
</Box>
  )
}


