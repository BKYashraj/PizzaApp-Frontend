import IconArrowRight from "../components/icons/arrowRight";
import IconPatchCheck from "../components/icons/IconPatchCheck";
import PizzaImage from "../assets/images/pizza2.png";
import CookingImage from "../assets/images/cooking1.png";
import Pickup from "../assets/images/pickup.png";
import Enjoy from "../assets/images/enjoy.png";
import orderFood from "../assets/images/orderFood.png";
import Layout from "../Layouts/Layout";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getAllProducts } from "../Redux/Slices/ProductSlice";
import Loader from "./Loader.jsx"
function Home() {

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { productsData } = useSelector((state) => state.product);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await dispatch(getAllProducts());
        if (!response || response.error) {
          throw new Error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  
    // Set up an interval to periodically check the backend
    const intervalId = setInterval(fetchData, 5 * 60 * 1000); // every 5 minutes
  
    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [dispatch]);
  

  const menuSectionRef = useRef(null);
  const servicesSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const [showMore, setShowMore] = useState(false);
  const visibleProducts = showMore ? productsData.length : 3; // Show all products if showMore is true

  // Toggle function to switch between showing all products and only three
  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };
  return (
    <div>
      <Layout
        scrollToMenu={() => scrollToSection(menuSectionRef)}
        scrollToServices={() => scrollToSection(servicesSectionRef)}
        scrollToAbout={() => scrollToSection(aboutSectionRef)}
      >

        <Loader show={loading}/>


        {/*Hero Section*/}
        <section className="flex flex-col-reverse items-center justify-center py-5 md:flex-row md:gap-7 bg-gradient-to-r from from-amber-50 to-orange-300">
          <div className="w-4/6 ml-4 text-center md:w-2/6 md:text-left">
            <div className="flex justify-center text-4xl md:justify-normal">
              <h1 className="pb-5 font-bold text-transparent bg-gradient-to-r from-orange-400 to-orange-400 bg-clip-text">
                Enjoy the Slice{" "}
              </h1>

              <h1>😋</h1>
            </div>

            <p className="pb-4 text-[#6B7280]">
              Order your favorite pizza from the comfort of your home with the
              Pizza App. Enjoy the best pizza in town with just a few taps!
            </p>

            <Link to={`/order/now`}>
              <button className="flex items-center px-4 py-2 border rounded-md text-white bg-yellow-500 hover:bg-yellow-600 group">
                Order Now
                <span className="inline-block ml-3 transition-transform ease-in-out group-hover:translate-x-2">
                  <IconArrowRight />
                </span>
              </button>
            </Link>
          </div>

          <div>
            <img src={PizzaImage} alt="Pizza" width={550} height={550} />
          </div>
        </section>

        {/*Menu Section*/}
        <div ref={menuSectionRef} className="mx-auto">
          <div className="mx-auto">
            <section className="flex flex-col-reverse items-center justify-center py-5 md:flex-row md:gap-7">
              <div className="ml-4 mr-5 text-center md:ml-72 md:mr-72 md:text-center">
                <div className=" flex justify-center text-4xl md:justify-center">
                  <h2 className="mt-5 text-5xl font-extrabold text-transparent title-font bg-gradient-to-r from-orange-600 to-orange-300 bg-clip-text mb-4 md:text-center text-center">
                    Menu
                  </h2>
                </div>

                <p className="pb-4 text-[#6B7280]">
                  🍕 Pizza Menu: Every slice tells a story of flavor and
                  freshness. Explore our tempting handcrafted pizzas, made with
                  premium ingredients and artisanal flair. 😋
                </p>
              </div>
              
            </section>
            <Loader show={loading}/>
            <div className="flex flex-wrap justify-center">
              {productsData.slice(0, visibleProducts).map(
                (item) =>
                  item.instock && (
                    <div className="p-4 md:w-1/3" key={item._id}>
                      <Link to={`/product/${item._id}`}>
                        <div className="overflow-hidden border rounded-lg border-opacity-60">
                          <img
                            src={item.productImage}
                            alt="Pizza Image"
                            className="object-cover object-center w-full lg:h-48 md:h-36"
                          />
                          <div className="p-6 border rounded-lg shadow-lg">
                            <h2 className="text-xs font-medium tracking-widest text-gray-400 title-font uppercase">
                              {item.category}
                            </h2>
                            <h1 className="mb-3 text-lg font-medium text-gray-900 title-font">
                              {item.productName}
                            </h1>
                            <p className="mb-4 text-base leading-relaxed text-gray-600">
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
              )}
            </div>

            <div className="flex justify-center">
              {!showMore ? (
                <button
                  onClick={() => setShowMore(true)}
                  className="px-4 py-2 mr-4 border rounded-md text-white bg-yellow-500 hover:bg-yellow-600"
                >
                  Show More
                </button>
              ) : (
                <button
                  onClick={toggleShowMore}
                  className="px-4 py-2 mr-4 border rounded-md text-white bg-yellow-500 hover:bg-yellow-600"
                >
                  Show Less
                </button>
              )}
            </div>
          </div>
        </div>

        {/*Services Section*/}
        <section
          ref={servicesSectionRef}
          className="py-4 mt-6 bg-gradient-to-r from-amber-50 to-orange-300"
        >
          <div className="container flex flex-col md:flex-row">
            <div className="flex flex-col items-center justify-center rounded-lg lg:w-1/2 ml-2 mr-2 mb-4 ">
              <h2 className="text-5xl font-extrabold text-transparent title-font bg-gradient-to-r from-orange-600 to-orange-300 bg-clip-text mb-4 md:text-center text-center md:mb-20">
                Services
              </h2>
              <img
                src={CookingImage}
                width={500}
                className="rounded-lg"
                alt="Cooking"
              />
            </div>

            <div className="flex flex-col flex-wrap text-center lg:py-6 lg:w-1/2 lg:pl-12 lg:text-left">
              <div className="flex flex-col items-center lg:items-start">
                <div>
                  <h2 className="mb-4 text-5xl font-extrabold text-transparent title-font bg-gradient-to-r from-orange-600 to-orange-300 bg-clip-text">
                    Cooked by the best <br /> chefs in the world
                  </h2>
                  <p className="text-base leading-relaxed text-[#6B7280]">
                    There are many benefits regarding to that but the main ones
                    are:
                  </p>
                </div>
              </div>

              <div className="w-full p-1">
                <div className="flex items-center h-full p-2 text-2xl rounded">
                  <IconPatchCheck className="text-[#F38339] w-10 h-10 mr-4" />
                  <span className="font-bold title-font">Perfect taste</span>
                </div>
              </div>
              <div className="w-full p-1">
                <div className="flex items-center h-full p-2 text-2xl rounded">
                  <IconPatchCheck className="text-[#F38339] w-10 h-10 mr-4" />
                  <span className="font-bold title-font">Prepared quickly</span>
                </div>
              </div>
              <div className="w-full p-1">
                <div className="flex items-center h-full p-2 text-2xl rounded">
                  <IconPatchCheck className="text-[#F38339] w-10 h-10 mr-4" />
                  <span className="font-bold title-font">
                    Food hygeine guaranteed
                  </span>
                </div>
              </div>

              <div className="px-5 py-4 mx-auto">
                <div className="flex justify-center py-4">
                  <div className="inline-flex w-16 h-1 bg-yellow-500 rounded-full"></div>
                </div>
                <div className="flex flex-wrap space-y-6 md:space-y-0">
                  <div className="flex flex-col items-center text-center p-4 md:w-1/3">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 mb-5 bg-yellow-100 rounded-full">
                      <img src={Pickup} />
                    </div>
                    <div className="flex-grow">
                      <h2 className="mb-3 text-lg font-bold text-gray-900 title-font">
                        Pickup Food
                      </h2>
                      <p className="text-base leading-relaxed">
                        Pick up your order from the nearest store or get it
                        delivered to your doorstep.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center text-center p-4 md:w-1/3">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 mb-5 bg-yellow-100 rounded-full">
                      <img src={orderFood} />
                    </div>
                    <div className="flex-grow">
                      <h2 className="mb-3 text-lg font-bold text-gray-900 title-font">
                        Order Food
                      </h2>
                      <p className="text-base leading-relaxed">
                        As easy as 1, 2, 3. Just select your favorite pizza and
                        place your order.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center text-center p-4 md:w-1/3">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 mb-5 bg-yellow-100 rounded-full">
                      <img src={Enjoy} />
                    </div>
                    <div className="flex-grow">
                      <h2 className="mb-3 text-lg font-bold text-gray-900 title-font">
                        Enjoy Food
                      </h2>
                      <p className="text-base leading-relaxed">
                        As soon as you get your order, enjoy the delicious pizza
                        with your loved ones.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section ref={aboutSectionRef} className="py-2 ">
          <div className="container flex flex-col-reverse md:flex-row">
            <div className="flex flex-col items-center justify-center rounded-lg lg:w-1/2 md:ml-8 ml-2 mr-2 mb-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.8415628001503!2d73.82373197436792!3d20.015163281392564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddea65916d3c37%3A0xfdf5e649201b3366!2sFlora%20Heights!5e0!3m2!1sen!2sin!4v1720698412851!5m2!1sen!2sin"
                className="w-full lg:w-[650px] sm:w-[350px]"
                height="450"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="flex flex-col flex-wrap lg:py-6 lg:w-3/4 lg:pl-12 lg:text-left ml-5 mr-5 ">
              <div className="flex flex-col items-center lg:items-start">
                <div>
                  <h2 className="mt-5 text-5xl font-extrabold text-transparent title-font bg-gradient-to-r from-orange-600 to-orange-300 bg-clip-text mb-4 md:text-center text-center">
                    About
                  </h2>

                  <p className="text-base leading-relaxed text-[#6B7280] mb-4 w-full lg:w-full mx-auto">
                    Welcome to Pizza Corner, your go-to app for ordering the
                    most delicious pizzas in town! Our mission is to bring the
                    taste of artisanal, handcrafted pizzas right to your
                    doorstep with just a few taps. <br /> <br />
                    Pizza Corner started with a simple idea: to bring the
                    authentic taste of pizza to everyone. Our founders,
                    passionate about good food, set out to create a place where
                    people can enjoy delicious pizzas made from scratch. Today,
                    Pizza Corner is loved by many for its commitment to quality
                    and taste. <br />
                  </p>
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-center">
                      Contact Us
                    </h2>
                    <p className="text-lg mb-2">
                      <strong>Address:</strong> 123 Pizza Street, Flavor Town,
                      NY 12345
                    </p>
                    <p className="text-lg mb-2">
                      <strong>Phone:</strong> (123) 456-7890
                    </p>
                    <p className="text-lg mb-2">
                      <strong>Email:</strong> contact@pizzacorner.com
                    </p>
                    <p className="text-lg">
                      <strong>Hours:</strong> Mon - Fri: 10am - 10pm, Sat - Sun:
                      11am - 11pm
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-5 py-4 mx-auto">
                <div className="flex justify-center py-4"></div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
}

export default Home;
