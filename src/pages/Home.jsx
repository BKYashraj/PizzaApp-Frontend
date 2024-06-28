import IconArrowRight from "../components/icons/arrowRight";
import PizzaImage from "../assets/images/pizza2.png";
function Home() {
  return (
    <div>
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

          <button className="flex items-center px-4 py-2 border rounded-md text-white bg-yellow-500 hover:bg-yellow-600 group">
            Order Now
            <span className="inline-block ml-3 transition-transform ease-in-out group-hover:translate-x-2">
              <IconArrowRight />
            </span>
          </button>
        </div>

        <div>
          <img src={PizzaImage} alt="Pizza" width={550} height={550} />
        </div>
      </section>
    </div>
  );
}

export default Home;
