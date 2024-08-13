import { useState } from "react";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
// import Layout from "../../Layouts/Layout";
import Food from "../../assets/images/food.svg";
import { createProducts } from "../../Redux/Slices/ProductSlice";
import { Link } from "react-router-dom";
import AdminPanel from "./AdminPanel";
// import { useNavigate } from "react-router-dom";

function Addproducts() {
  // const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    productName: "",
    description: "",
    originalPrice: "",
    discountedPrice: "",
    discount: "",
    quantity: "",
    category: "",
    productImage: null,
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    setProductData({
      ...productData,
      productImage: file,
    });
  }

  async function handleFormSubmit(e) {
    e.preventDefault(); // prevent the form from reloading the page

    const {
      productName,
      description,
      originalPrice,
      discountedPrice,
      discount,
      quantity,
      category,
      productImage,
    } = productData;
    if (
      !productName ||
      !description ||
      !originalPrice ||
      !discountedPrice ||
      !discount ||
      !quantity ||
      !category ||
      !productImage
    ) {
      toast.error("All fields are required");
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("description", description);
    formData.append("originalPrice", originalPrice);
    formData.append("discountedPrice", discountedPrice);
    formData.append("discount", discount);
    formData.append("quantity", quantity);
    formData.append("category", category);
    formData.append("productImage", productImage);

    const apiReponse = await dispatch(createProducts(formData));

    console.log("Api response", apiReponse);
  }

  return (
       <div className="min-h-screen flex">
      {/* Sidebar */}
      <AdminPanel>
        <Toaster />
      <section className="py-1">
        <div className="flex flex-col md:flex-row items-center justify-center px-5 md:ml-32">
          <div className="md:w-2/6">
            <img src={Food} alt="Food" />
          </div>
          <div className="max-w-md md:w-4/6 mx-auto mt-8 bg-white p-3">
            <h2 className="mb-4 text-4xl font-semibold">Add product</h2>

            <form onSubmit={handleFormSubmit}>
              {/* product name */}
              <div className="mb-4">
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  minLength={5}
                  maxLength={20}
                  name="productName"
                  id="productName"
                  onChange={handleUserInput}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {/* description */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <input
                  type="text"
                  required
                  minLength={5}
                  maxLength={60}
                  name="description"
                  id="description"
                  value={productData.description}
                  onChange={handleUserInput}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {/* Original Price */}
              <div className="mb-4">
                <label
                  htmlFor="originalPrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Original price<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  name="originalPrice"
                  id="originalPrice"
                  value={productData.originalPrice}
                  onChange={handleUserInput}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {/* Discounted Price */}
              <div className="mb-4">
                <label
                  htmlFor="discountedPrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Discounted price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  name="discountedPrice"
                  id="discountedPrice"
                  value={productData.discountedPrice}
                  onChange={handleUserInput}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {/* Discount */}
              <div className="mb-4">
                <label
                  htmlFor="discount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Discount <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  name="discount"
                  id="discount"
                  value={productData.discount}
                  onChange={handleUserInput}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {/* quantity */}
              <div className="mb-4">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  name="quantity"
                  id="quantity"
                  value={productData.quantity}
                  onChange={handleUserInput}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {/* category */}
              <div className="mb-2">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  id="category"
                  value={productData.category}
                  onChange={handleUserInput}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="Veg">Vegetarian</option>
                  <option value="Non-Veg">Non-Vegetarian</option>
                  <option value="Drinks">Soft drinks</option>
                  <option value="sides">Sides</option>
                </select>
              </div>

              {/* image */}
              <div className="mb-4">
                <label
                  htmlFor="productImage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product image{" "}
                  <span className="text-red-600">(.jpg, .png, .jpeg )</span>
                </label>
                <input
                  type="file"
                  name="productImage"
                  id="productImage"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleImageChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
              >
                Add product
              </button>
            </form>
          </div>
        </div>
      </section>
      </AdminPanel>
    </div> 
  );
}

export default Addproducts;
