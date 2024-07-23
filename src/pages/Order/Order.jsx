import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Layouts/Layout";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../../Redux/Slices/OrderSlice";

function Order() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartsData } = useSelector((state) => state.cart);
  const [details, setDetails] = useState({
    paymentMethod: "OFFLINE",
    address: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (details.paymentMethod === "" || details.address === "") {
      toast.error("Please fill all the fields");
      return;
    }

    const response = await dispatch(placeOrder());

    console.log("order response", response);

    if (response?.payload?.data?.success) {
      toast.success("Order placed successfully");
      navigate("/order/success");
    } else {
      toast.error("Something went wrong cannot place order");
    }
  }

  const [amount, setamount] = useState(350);

  const handlePayment = async () => {
    try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment/order`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                amount
            })
        });

        const data = await res.json();
        console.log(data);
        handlePaymentVerify(data.data)
    } catch (error) {
        console.log(error);
    }
}

const handlePaymentVerify = async (data) => {
    const options = {
        key: ({}).RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Devknus",
        description: "Test Mode",
        order_id: data.id,
        handler: async (response) => {
            console.log("response", response)
            try {
                const res = await fetch(`${({}).VITE_BACKEND_HOST_URL}/api/payment/verify`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    })
                })

                const verifyData = await res.json();

                if (verifyData.message) {
                    toast.success(verifyData.message)
                }
            } catch (error) {
                console.log(error);
            }
        },
        theme: {
            color: "#5f63b8"
        }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
}

  return (
    <Layout>
      <section className="text-gray-600 body-font min-h-56">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Thanks for Choosing Us{" "}
            </h1>

            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Total Price -
              <span className="font-extrabold text-red-900">
                {cartsData?.items?.length === 0
                  ? ""
                  : cartsData?.items?.reduce(
                      (acc, item) =>
                        acc + item?.quantity * item?.product?.discountedPrice,
                      0
                    )}
              </span>
            </p>
          </div>

          <form onSubmit={handleFormSubmit}>
            <div className="relative flex-grow w-full">
              <label
                htmlFor="paymentMethod"
                className="text-2xl leading-7 text-gray-600"
              >
                Payment Method
              </label>
              <select
                name="paymentMethod"
                required
                onChange={handleUserInput}
                className="p-2 border rounded-md focus:outline-none focus:border-primary-500 bg-white text-gray-700 w-full"
              >
                <option value="OFFLINE">Offline</option>
                <option value="ONLINE">Online</option>
              </select>
            </div>

            <div className="relative flex-grow w-full my-5">
              <label
                htmlFor="address"
                className="leading-7 text-2xl text-gray-600"
              >
                Address
              </label>
              <textarea
                name="address"
                placeholder="Enter your address here..."
                onChange={handleUserInput}
                className="w-full p-2 border rounded-md focus:outline-none focus:border-primary-500 bg-white text-gray-700"
              ></textarea>
            </div>

            <button onClick={handlePayment} className="text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-primary-600 rounded text-lg">
              Place Order
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}

export default Order;
