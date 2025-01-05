import React, { useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Modal,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { createBooking } from '../State/Booking/Action';
export const Booking = () => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email:'',
    phoneNumber: '',
    evnetType: '',
    eventDate: '',
    eventTime: '',
    eventAddress: '',
  });
  const [success, setSuccess] = useState(false);
  const eventTypes = ['Wedding', 'Family',"Maternity",'Birthday Party', 'Corporate Event', 'Others'];
  const navigate=useNavigate();
  const dispatch =useDispatch();
  const jwt =localStorage.getItem("jwt");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dispatch the create booking action
      const response = await dispatch(createBooking({ booking:formData,jwt:jwt}));
      const newBooking = response; // Assuming `createBooking` returns the new booking
  
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate('/my-bookings', { state: { newBooking } }); // Pass new booking to "My Bookings"
      }, 3000);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <>
      <div className="m-5 flex flex-row cursor-pointer" onClick={()=>{ navigate("/services")}} >
            <ChevronLeftIcon/>
            <span>Back</span>
        </div>
    <div className="m-5 flex flex-col items-center  " >
        
        <header className='m-5 p-5 text-5xl font-serif tracking-wider'>
            BOOKING
        </header>
       
        <Box
      sx={{
        maxWidth: '600px',
        margin: 'auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#656665',
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{ textAlign: 'center', fontWeight: 'bold' }}
      >
        Book Your Event
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          {/* First Name */}
          <Box sx={{ flex: '1 1 calc(50% - 16px)' }}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Box>
          {/* Last Name */}
          <Box sx={{ flex: '1 1 calc(50% - 16px)' }}>
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Box>
          {/* Last Name */}
          <Box sx={{ flex: '1 1 100%' }}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
          </Box>
          <TextField
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
          placeholder="Enter 10-digit number"
        />
          {/* Event Type */}
          <Box sx={{ flex: '1 1 100%'}}>
            <TextField
              select
              label="Event Type"
              name="evnetType"
              value={formData.evnetType}
              onChange={handleChange}
              fullWidth
              required
              className='backgroundColor-black'
            >
              {eventTypes.map((event) => (
                <MenuItem  
                  key={event} 
                  value={event} 
                  sx={{
                    bgcolor: '#000', // Background color of the individual MenuItem
                    color: '#fff', // Text color for the MenuItem
                    '&:hover': {
                      bgcolor: '#252625', // Slightly lighter shade for hover
                    },
                  }}
                  >
                  {event}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          {/* Date */}
          <Box sx={{ flex: '1 1 calc(50% - 16px)' }}>
            <TextField
              type="date"
              label="Event Date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />
          </Box>
          {/* Time */}
          <Box sx={{ flex: '1 1 calc(50% - 16px)' }}>
            <TextField
              type="time"
              label="Event Time"
              name="eventTime"
              value={formData.eventTime}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />
          </Box>
          {/* Address */}
          <Box sx={{ flex: '1 1 100%' }}>
            <TextField
              label="Event Address"
              name="eventAddress"
              value={formData.eventAddress}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              required
            />
          </Box>
        </Box>
        <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
          <Button type="submit" variant="contained" color="primary">
            Submit Booking
          </Button>
        </Box>
      </form>
      {/* Success Modal */}
      <Modal open={success} onClose={() => setSuccess(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: '#dee3e0',
            border: '2px solid #000',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4,
            textAlign: 'center',
          }}
        >
          <Typography sx={{
            color: '#32ed64',}}
             variant="h4
             " gutterBottom>
            Booking Successful!
          </Typography>
          <Typography sx={{
            color: '#181a18',
            fontfamily:'ui-monospace'}}
            variant="body1">
            Thank you for booking your event with us. Redirecting to My Bookings...
          </Typography>
        </Box>
      </Modal>
    </Box> 
    </div>
    </>
  )
}
