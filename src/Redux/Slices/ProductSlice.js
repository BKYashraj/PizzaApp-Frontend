import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  productsData: [], // Array of products
};

export const createProducts = createAsyncThunk('/add/products',async (data)=>{
  try {
    const products = axiosInstance.post('/products', data);
    toast.promise(products,{
      loading:'Pizza adding...',
      error: 'Ohh No!, something went wrong. Cannot add Pizza',
      success: 'Pizza added successfully'
    })
    const apiResponse = await products;
    return apiResponse;
  } catch (error) {
    console.log(error);
    toast.error('Something went wrong')
  }
})

export const getAllProducts = createAsyncThunk('/products/getAll',async ()=>{
  try {
    const products = axiosInstance.get('/products');
    toast.promise(products,{
      loading:'Loading all the products',
      error: 'Ohh No!, something went wrong. Cannot load products',
      success: 'Products loaded successfully'
    })
    const apiResponse = await products;
    return apiResponse;
  } catch (error) {
    console.log(error);
    toast.error('Something went wrong')
  }
})

export const getproductDetails = createAsyncThunk('/products/getDetails', async (id) => {
  try {
      const product = axiosInstance.get(`/products/${id}`);
      toast.promise(product, {
          loading: 'Loading the product',
          error: 'Something went cannot load product',
          success: 'Product loaded successfully',
      });
      const apiResponse = await product;
      return apiResponse;
  } catch(error) {
      console.log(error);
      toast.error('Something went wrong');
  }
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.productsData = action?.payload?.data?.data;
      }).addCase(createProducts.fulfilled, (state, action) => {
        state.productsData = action?.payload?.data?.data;})
  },
});

export default productSlice.reducer;