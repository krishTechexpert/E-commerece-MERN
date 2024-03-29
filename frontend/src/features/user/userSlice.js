import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import {instance} from "../../config"


const initialState = {
    user:{},
    loading:null,
    error:null,
    isAuthenticated:false
}

//https://stackoverflow.com/questions/63439021/handling-errors-with-redux-toolkit

// jab api fail hony per api wala error message show karana chaty ho toh 
//rejectWithValue ko used kerna inside try-catch , otherwie default error message show hoga

export const signUp = createAsyncThunk('/api/user/signup',

    async (parameters,{ rejectWithValue }) => {
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        try{
            const response = await instance.post('/register',parameters,config)
            sessionStorage.setItem('token', response.data.token)
            return response.data
        
        }catch(error){
            return rejectWithValue(error.response.data.message || error.message)
        }
    
    }
)

export const userLogin = createAsyncThunk('/api/user/login',
    async (parameters,{ rejectWithValue }) => {
        try{
            const response = await instance.post('/login',parameters)
            sessionStorage.setItem('token', response.data.token)
            return response.data
        
        }catch(error){
            console.log(error)
            return rejectWithValue(error.response.data.message || error.message)
        }
    
    }
)

export const userProfile = createAsyncThunk('/api/user/profile',
    async (_,{ rejectWithValue }) => {
        //rejectWithValue jab used ker rehy ho toh first arguments dena zaruri hai, 
        // agar aap first args nhi dogy toh error aa jye gi
        // esliye meny yha per underscore(_) used kiya hai as first arguments
        //https://stackoverflow.com/questions/72867415/redux-toolkit-createasyncthunk-rejectwithvalue-typeerror-cannot-destructur
        try{
            const response = await instance.get('/profile')
            return response.data
        
        }catch(error){
            console.log(error)
            return rejectWithValue(error.response.data.message || error.message)
        }
    
    }
)

// update user profile

export const updateProfile = createAsyncThunk('/api/user/updateProfile', 

async(user,{rejectWithValue}) => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    try{
        const response = await instance.put('/profile/update',user,config)
        return response.data
    
    }catch(error){
        console.log(error)
        return rejectWithValue(error.response.data.message || error.message)
    }
})

// Change password

export const changePassword = createAsyncThunk('/api/user/password/update',
   async (userPassword,{rejectWithValue}) => {
        try{
            const response = await instance.put('/password/update',userPassword)
            return response.data
        
        }catch(error){
            return rejectWithValue(error.response.data.message || error.message)
        }
    }
)

// Forgot password

export const forgotPassword = createAsyncThunk('/api/password/forgot',
        async (forgotPsscode,{rejectWithValue}) => {
            try{
                const response = await instance.post('/password/forgot',forgotPsscode)
                return response.data
            }catch(error){
                return rejectWithValue(error.response.data.message || error.message)
            }
        }
)

// Reset password

export const resetPassword = createAsyncThunk('/api/password/reset',
        async (parameters,{rejectWithValue}) => {
            const {resetToken,values} = parameters;
            try{
                const response = await instance.put(`/password/reset/${resetToken}`,values)
                return response.data
            }catch(error){
                return rejectWithValue(error.response.data.message || error.message)
            }
        }
)

export const userLogout = createAsyncThunk('/api/user/logout',
    async (_,{ rejectWithValue }) => {
        try{
            const response = await instance.get('/logout')
            return response.data
        
        }catch(error){
            console.log(error)
            return rejectWithValue(error.response.data.message)
        }
    
    }
)



export const userSlice = createSlice({
    name:'userData',
    initialState,
    reducers:{
        resetError(state){
            state.error=null
        }
    },
    extraReducers:(builder) => {
        builder
        // user register
        .addCase(signUp.pending, (state) => {
            state.loading='pending';
            state.error=null;

        })
        .addCase(signUp.rejected,(state,action) => {
            state.loading=null;
            state.error = action.payload;
        })
        .addCase(signUp.fulfilled,(state,action) => {
            state.loading=null;
            state.error=null;
            state.user=action.payload.user
            state.isAuthenticated=action.payload.success;
        })
        // user Login
        .addCase(userLogin.pending, (state) => {
            state.loading='pending';
            state.error=null;

        })
        .addCase(userLogin.rejected,(state,action) => {
            state.loading=null;
            state.error = action.payload;
        })
        .addCase(userLogin.fulfilled,(state,action) => {
            state.loading=null;
            state.user=action.payload.user
            state.error=null;
            state.isAuthenticated=action.payload.success;
         })
        // user profile
        .addCase(userProfile.pending, (state) => {
            state.loading='pending';
            state.error=null;

        })
        .addCase(userProfile.rejected,(state,action) => {
            state.loading=null;
            state.error = action.payload;
        })
        .addCase(userProfile.fulfilled,(state,action) => {
            state.loading=null;
            state.user=action.payload.user
            state.error=null;
            state.isAuthenticated=action.payload.success;
            state.isUpdate=false
        })
        // update profile
        .addCase(updateProfile.pending, (state) => {
            state.loading='pending';
            state.error = null;
        })
        .addCase(updateProfile.rejected,(state,action) => {
            state.loading=null;
            state.error = action.payload;
        })
        .addCase(updateProfile.fulfilled,(state,action) => {
            state.loading=null;
            state.error=null;
            state.user=action.payload.user
            state.isAuthenticated=action.payload.success;
            state.isUpdate=action.payload.success

        })

        // change password
        .addCase(changePassword.pending, (state) => {
            state.loading='pending';
            state.error = null;
        })
        .addCase(changePassword.rejected,(state,action) => {
            state.loading=null;
            state.error = action.payload;
        })
        .addCase(changePassword.fulfilled,(state,action) => {
            state.loading=null;
            state.error=null;
            state.user=action.payload.user
            state.isAuthenticated=action.payload.success;
            state.isUpdate=action.payload.success
        })
        //forgot password
        .addCase(forgotPassword.pending, (state) => {
            state.loading='pending';
            state.error = null;
        })
        .addCase(forgotPassword.rejected,(state,action) => {
            state.loading=null;
            state.error = action.payload;
        })
        .addCase(forgotPassword.fulfilled,(state,action) => {
            state.loading=null;
            state.error=null;
            //state.isForgotPassword=action.payload.success;
        })

         //Reset password
        .addCase(resetPassword.pending, (state) => {
            state.loading='pending';
            state.error = null;
        })
        .addCase(resetPassword.rejected,(state,action) => {
            state.loading=null;
            state.error = action.payload;
        })
        .addCase(resetPassword.fulfilled,(state,action) => {
            state.loading=null;
            state.error=null;
            //state.success=action.payload.success;
            //state.message=action.payload.message;
        })


        // User Logout
        .addCase(userLogout.rejected,(state,action) => {
            state.loading=null;
            state.error = action.payload;
        })
        .addCase(userLogout.fulfilled,(state,action) => {
            state.loading=null;
            state.user=null;
            state.error=null;
            state.isUpdate=false;
            state.isAuthenticated=!action.payload.success;
        })
     }
})

export const { resetError} = userSlice.actions;
export default userSlice.reducer;