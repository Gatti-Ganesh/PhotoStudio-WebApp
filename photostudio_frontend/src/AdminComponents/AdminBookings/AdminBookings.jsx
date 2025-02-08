import { Box, Button, Card, CardHeader, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { api } from '../../usercomponents/config/api';
import { formatTimeTo12Hour } from '../../usercomponents/Booking/MyBookings';
import { updateBookingStatus } from '../../usercomponents/State/Booking/Action';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const orderStatus=[
    {lable:"Pending",value:"PANDING"},
    {lable:"ShotCompleted",value:"SHOTCOMPLETED"},
    {lable:"EditingComplete",value:"EDITINGCOMPLETE"},
    {lable:"Out For Delivery",value:"OUT_FOR_DELIVERY"},
    {lable:"Delivered",value:"DELIVERED"}
  ]

export const AdminBookings = () => {
    const navigate=useNavigate();
    const jwt = localStorage.getItem("jwt");
    const dispatch=useDispatch();
    
      const [anchorEl, setAnchorEl] = React.useState(null);
      const [activeOrderId, setActiveOrderId] = React.useState(null);
      const open = Boolean(anchorEl);
      const handleClick = (event, orderId) => {
        setAnchorEl(event.currentTarget);
        setActiveOrderId(orderId); // Track the specific orderId
      };
      
      const handleClose = () => {
        setAnchorEl(null);
      };
     

      const [bookings, setBookings] = useState([]);
    
      useEffect(() => {
        const fetchBookings = async () => {
          
          try {
            const response = await api.get("/api/alluser/bookings", {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            });
            setBookings(response.data);
          
          } catch (error) {
            console.error("Error fetching bookings:", error);
          }
        };
      
        fetchBookings();
      }, []);
      
      const handleUpdateOrder = async (orderId, orderStatus) => {
        try {
          // Dispatch the update action
          await dispatch(updateBookingStatus({orderId,orderStatus,jwt}))
      
          // Update the local state
          setBookings((prevBookings) =>
            prevBookings.map((booking) =>
              booking.eventId === orderId
                ? { ...booking, status: orderStatus }
                : booking
            )
          );
      
          handleClose();
        } catch (error) {
          console.error("Error updating order status:", error);
        }
      };

      const handleCreateAlbum= (bookingId) => {
       
        navigate(`/admin/create-album`, { state: { bookingId } });
      };

  return (
    <Box>
        <Card className='mt-2'>
            <CardHeader title={"All Bookings"} sx={{pt:2, alignItems:"center"}}/>
            {bookings.length === '0'?(<p>No Bookings Found!</p>):(
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
                       <TableCell align="left">Email</TableCell>
                       <TableCell align="left">PhoneNumber</TableCell>
                       <TableCell align="left">EventType</TableCell>
                       <TableCell align="left">EventDate</TableCell>
                       <TableCell align="left">EventTime</TableCell>
                       <TableCell align="left">EventAddress</TableCell>
                       <TableCell align="left">Status</TableCell>
                       <TableCell align="left">Update</TableCell>
                       <TableCell align="left">Create Album</TableCell>
                   </TableRow>
                   </TableHead>
                   <TableBody>
                   {bookings.map((item,index) => (
                       <TableRow
                       key={item.eventId}
                       sx={{ '&:last-child td, &:last-child th': { border: 0 }, 
                             '&:hover': {
                               backgroundColor: '#76858a', 
                              }, 
                          }}
                       >
                       <TableCell component="th" scope="row">
                           {item.eventId}
                       </TableCell>
                       <TableCell align="left">{item.firstName}</TableCell>
                       <TableCell align="left">{item.email}</TableCell>
                       <TableCell align="left">{item.phoneNumber}</TableCell>
                       <TableCell align="left">{item.evnetType}</TableCell>
                       <TableCell align="left">{item.eventDate}</TableCell>
                       <TableCell align="left">{formatTimeTo12Hour(item.eventTime)}</TableCell>
                       <TableCell align="left">{item.eventAddress}</TableCell>
                       <TableCell align="left">{item.status}</TableCell>
                       <TableCell align="left">
                       <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={(event) => handleClick(event, item.eventId)}
                        sx={{
                          color: "#999291",
                          "&:hover": {
                            backgroundColor: "#4894b0",
                            fontWeight: "bold",
                            color: "#e6ebed",
                          },
                        }}
                      >
                        Update
                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open && activeOrderId === item.eventId} // Check for the specific row
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                        
                      >
                        {orderStatus.map((status) => (
                          <MenuItem
                            key={status.value}
                            sx={{
                              
                              backgroundColor: "#a6a3a2",
                              "&:hover": {
                                color: "white",
                                backgroundColor: "green",
                              },
                            }}
                            onClick={() =>
                              handleUpdateOrder(item.eventId, status.value)
                            }
                          >
                            {status.lable}
                          </MenuItem>
                        ))}
                      </Menu>
                       </TableCell>
                       <TableCell align="left">
                       {item.status === "EDITINGCOMPLETE" && (
                          <Button
                            variant="contained"
                            color="primary"
                             onClick={() => handleCreateAlbum(item.eventId)}
                            sx={{
                              backgroundColor: "#4CAF50",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "#388E3C",
                              },
                            }}
                          >
                            Add Album
                          </Button>
                        )}
                       </TableCell>
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

