// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import axiosInstance from "../../Helpers/axiosInstance";
// import toast from "react-hot-toast";

// const initialState = {
//     cartsData: ''
// }

// export const addProductToCart = createAsyncThunk('/cart/addProduct', async (productId) => {
//     try {
//         const response = axiosInstance.post(`/carts/add/${productId}`);
//         toast.promise(response, {
//             loading: 'Adding product to cart',
//             error: 'Something went wrong cannot add product to cart',
//             success: 'Product added successfully',
//         });
//         const apiResponse = await response;
//         return apiResponse;
//     } catch(error) {
//         console.log(error);
//         toast.error('Something went wrong');
//     }
// });

// export const removeProductFromCart = createAsyncThunk('/cart/removeProduct', async (productId) => {
//     try {
//         const response = axiosInstance.post(`/carts/remove/${productId}`);
//         toast.promise(response, {
//             loading: 'Removing product from cart',
//             error: 'Something went wrong cannot remove product from cart',
//             success: 'Product removed successfully',
//         });
//         const apiResponse = await response;
//         return apiResponse;
//     } catch(error) {
//         console.log(error);
//         toast.error('Something went wrong');
//     }
// });

// export const getCartDetails = createAsyncThunk('/cart/getDetails', async () => {
//     try {
//         const response = axiosInstance.get(`/carts`);
//         toast.promise(response, {
//             loading: 'Fetching cart details',
//             error: 'Something went wrong cannot fetch cart',
//             success: 'Cart fetched successfully',
//         });
//         const apiResponse = await response;
//         return apiResponse;
//     } catch(error) {
//         console.log(error);
//         console.log(error.response);
//         if(error?.response?.status === 401) {
//             toast.error('Please login to view cart');
//             return {
//                 isUnauthorized: true
//             }
//         }
//         toast.error('Something went wrong');
//     }
// });

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState,
//     reducers: {
//     },
//     extraReducers: (builder) => {
//         builder.addCase(getCartDetails.fulfilled, (state, action) => {
//             state.cartsData = action?.payload?.data?.data;
//         });
//     }
// });

// export default cartSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    cartsData: null, // Initialize as null or an empty object/array depending on API response
    isFetching: false, // Optionally add a loading state if needed
    error: null, // Optionally track errors
};

export const addProductToCart = createAsyncThunk(
  'cart/addProduct',
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/carts/add/${productId}`);
      toast.promise(response, {
        loading: 'Adding product to cart',
        error: 'Something went wrong cannot add product to cart',
        success: 'Product added successfully',
      });
      return response.data; // Assuming API response contains relevant data
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Something went wrong');
      return thunkAPI.rejectWithValue(error.response.data); // Optionally handle error response
    }
  }
);

export const removeProductFromCart = createAsyncThunk(
  'cart/removeProduct',
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/carts/remove/${productId}`);
      toast.promise(response, {
        loading: 'Removing product from cart',
        error: 'Something went wrong cannot remove product from cart',
        success: 'Product removed successfully',
      });
      return response.data; // Assuming API response contains relevant data
    } catch (error) {
      console.error('Error removing product from cart:', error);
      toast.error('Something went wrong');
      return thunkAPI.rejectWithValue(error.response.data); // Optionally handle error response
    }
  }
);

export const getCartDetails = createAsyncThunk(
  'cart/getDetails',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/carts`);
      toast.promise(response, {
        loading: 'Fetching cart details',
        error: 'Something went wrong cannot fetch cart',
        success: 'Cart fetched successfully',
      });
      return response.data; // Assuming API response contains relevant data
    } catch (error) {
      console.error('Error fetching cart details:', error);
      if (error.response && error.response.status === 401) {
        toast.error('Please login to view cart');
      } else {
        toast.error('Something went wrong');
      }
      return thunkAPI.rejectWithValue(error.response.data); // Optionally handle error response
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add additional reducers for updating cart state as needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartDetails.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(getCartDetails.fulfilled, (state, action) => {
        state.isFetching = false;
        state.cartsData = action.payload.data; // Adjust based on actual API response structure
      })
      .addCase(getCartDetails.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
