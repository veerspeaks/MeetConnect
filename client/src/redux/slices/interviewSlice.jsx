import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import NewInterview from "../../components/NewInterview";




const initialState = {
    interviews: [],
    NewIntervie: null,
    loading: false,
    error: null,
};

// Login thunk
export const fetchInterviews = createAsyncThunk(
    'interviews/fetchInterviews',
    async (userId , { rejectWithValue }) => {
        try {
            
            const response = await axios.get(`/api/interviews/${userId}`, {
                
            });
            
            return response.data; // Return the actual data (assuming response.data contains the user info)
        } catch (err) {
            console.log('Error in interview thunk:', err.response || err.message); // Log error
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const addInterview = createAsyncThunk(
    'interviews/addInterviews',
    async ({ studentId, interviewerId, category, date }, { rejectWithValue }) => {
      try {
        console.log("Student ID: ", studentId); // Debugging to check if `studentId` is coming correctly
        console.log("Interviewer ID: ", interviewerId); // Check for interviewerId
        console.log("Category: ", category); // Check for selected category
  
        const response = await axios.post(`/api/interviews/add`, {
          studentId: studentId,
          interviewerId: interviewerId,
          category: category,
          scheduledDate : date,
        });
        
        
        return response.data; // Return the actual data
      } catch (err) {
        console.log('Error in interview thunk:', err.response || err.message); // Log error
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );
  

// Logout thunk
// export const logoutUser = createAsyncThunk(
//     'user/logoutUser', // Changed action type
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await axios.post("/api/users/signout");
//             return response.data; 
//         } catch (err) {
//             console.log('Error in logout thunk:', err.response || err.message); // Log error
//             return rejectWithValue(err.response?.data || err.message); // Return error value
//         }
//     }
// );

const interviewSlice = createSlice({
    name: 'interviews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInterviews.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchInterviews.fulfilled, (state, action) => {
                console.log("Fetched interviews succesfully");
                console.log(action.payload)
                state.interviews = action.payload;
                state.loading = false;
                // window.location.href = "/"
                // Use useNavigate hook for navigation instead of window.location.href
            })
            .addCase(fetchInterviews.rejected, (state, action) => {
                state.error = action.payload || action.error.message; // Use action.payload for error
                state.loading = false;
            })




            .addCase(addInterview.pending, (state) => {
                state.loading = true;
            })
            .addCase(addInterview.fulfilled, (state,action) => {
                console.log("Added interviews succesfully");
                state.NewIntervie = action.payload
                state.loading = false;
                // window.location.href = "/"
                // Use useNavigate hook for navigation instead of window.location.href
            })
            .addCase(addInterview.rejected, (state) => {
                 // Use action.payload for error
                state.loading = false;
            })

    }
    
});

export default interviewSlice.reducer;
