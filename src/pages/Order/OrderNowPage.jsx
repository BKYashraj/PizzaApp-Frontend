import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../Redux/Slices/ProductSlice";
import { Link } from "react-router-dom";
import Layout from "../../Layouts/Layout";
function OrderNowPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const { productsData } = useSelector((state) => state.product);
  
  return (
    <Layout>

    
<div className="px-4 py-8 sm:px-6 lg:px-8">
  <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">Explore Our Delicious Pizzas</h1>
  <p className="text-lg text-gray-700 text-center">Discover a variety of handcrafted pizzas made with premium ingredients and artisanal flair. Choose your favorite and enjoy the taste!</p>

  <div className="mx-auto">
    <div className="flex flex-wrap justify-center pt-5">
      {productsData.map((item) => {
        return (
          item.instock && (
            <div className="p-4 md:w-1/3" key={item._id}>
              <Link to={`/product/${item._id}`}>
                <div className="overflow-hidden border rounded-lg border-opacity-60">
                  <img
                    src={item.productImage}
                    alt="Pizza Image"
                    className="object-cover object-center w-full lg:h-48 md:h-36"
                  />
                  <div className="p-6 border">
                    <h2 className="text-xs font-medium tracking-widest text-gray-400 title-font">
                      {item.category}
                    </h2>
                    <h1 className="mb-3 text-lg font-medium text-gray-900 title-font">
                      {item.productName}
                    </h1>
                    <p className="mb-4 text-base leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mb-2">
                      <span className="text-lg font-medium text-gray-900 line-through">
                        ₹{item.originalPrice}
                      </span>
                      <span className="ml-2 text-lg font-medium text-red-500">
                        {item.discount}% OFF
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{item.discountedPrice}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          )
        );
      })}
    </div>
  </div>
</div>

  </Layout>

  )
}

export default OrderNowPage