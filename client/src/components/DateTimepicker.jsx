import React, { useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TextField, createTheme, ThemeProvider } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

// Custom theme with your dark background and yellow accents
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFD369', // Your yellow accent
    },
    background: {
      default: '#222831', // Dark background
      paper: '#222831', // Dark background for the picker
    },
    text: {
      primary: '#ffffff', // White text
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '30px', // Make the input fully rounded
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FFD369', // Yellow border color
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FFD369', // Yellow border on hover
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FFD369', // Yellow border when focused
          },
          '&.Mui-focused': {
            boxShadow: '0 0 5px #FFD369', // Optional yellow shadow on focus
          },
        },
        input: {
          color: '#ffffff', // White text for input
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: '#222831', // Dark background
          borderRadius: '30px', // Ensure the border-radius is applied here too
        },
      },
    },
  },
});

export default function ResponsiveDateTimePickers({ setDateTime }) { // Accept setDateTime as a prop
  const [dateTime, setLocalDateTime] = useState(dayjs());

  const handleDateChange = (newValue) => {
    setLocalDateTime(newValue);
    setDateTime(newValue); // Update parent state
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="flex flex-col gap-4 w-full">
          <DateTimePicker
            value={dateTime}
            onChange={handleDateChange} // Use the new handler
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                fullWidth
                InputProps={{ className: "rounded-full" }}
              />
            )}
          />
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
