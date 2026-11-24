import specialofferspic from "../../assets/specialofferspic.png";
import { ArrowRight, Clock, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const OFFER_DURATION = 12 * 60 * 60 * 1000;

function SpecialOffers() {

  const [endTime] = useState(() => {
    const savedTime = localStorage.getItem("nexora-offer-end");

    if (savedTime && Number(savedTime) > Date.now()) {
      return Number(savedTime);
    }

    const newTime = Date.now() + OFFER_DURATION;

    localStorage.setItem("nexora-offer-end", newTime);

    return newTime;
  });

  
  const [remainingTime, setRemainingTime] = useState(() =>
    Math.max(0, endTime - Date.now())
  );

  useEffect(() => {

    const interval = setInterval(() => {

      const remaining = Math.max(0, endTime - Date.now());

      setRemainingTime(remaining);

      if (remaining === 0) {
        clearInterval(interval);
      }

    }, 1000);

    return () => clearInterval(interval);

  }, [endTime]);

  const hours = Math.floor(remainingTime / 3600000);

  const minutes = Math.floor(
    (remainingTime % 3600000) / 60000
  );

  const seconds = Math.floor(
    (remainingTime % 60000) / 1000
  );

  const formatTime = (value) => String(value).padStart(2, "0");

  return (
    <section className="px-5 md:px-10 lg:px-16 py-16">

      <div className="flex items-center gap-3 mb-7">
        <Zap className="text-yellow-400" size={27} />

        <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white">
          Special Offers
        </h2>
      </div>

      <div className="relative overflow-hidden rounded-3xl
        bg-white dark:bg-gradient-to-br dark:from-[#242424] dark:via-[#111111] dark:to-black
        border border-yellow-500/20">

        <div className="absolute -right-20 -top-20
          w-80 h-80 rounded-full bg-yellow-500/10 blur-3xl" />

        <div className="relative grid grid-cols-1 md:grid-cols-2
          items-center gap-10 px-7 py-12 md:px-14 md:py-16">

          
          <div className="order-2 md:order-1">

            <span className="inline-flex items-center gap-2
              bg-yellow-400/10 text-yellow-400
              border border-yellow-400/20
              px-4 py-2 rounded-full text-sm font-semibold">

              <Zap size={15} />
              Limited Time Offer
            </span>

            <h3 className="text-4xl md:text-5xl lg:text-6xl
              font-extrabold text-white mt-7 leading-tight">

              Upgrade Your

              <span className="block text-yellow-400 mt-2">
                Tech Lifestyle
              </span>

            </h3>

            <p className="text-gray-400 text-base md:text-lg
              leading-8 mt-6 max-w-lg">

              Discover exclusive deals on premium technology.
              Get your favorite products at incredible prices.

            </p>

            <div className="flex items-center gap-4 mt-8">

              <span className="text-6xl md:text-7xl
                font-black text-yellow-400">
                40%
              </span>

              <div>
                <p className="text-black dark:text-white font-bold text-xl">
                  OFF
                </p>

                <p className="text-gray-500 text-sm">
                  Selected Products
                </p>
              </div>

            </div>

            
            <div className="mt-9">

              <div className="flex items-center gap-2
                text-gray-300 mb-4">

                <Clock size={18} className="text-yellow-400" />

                <span className="text-sm text-black dark:text-white">
                  Offer Ends In:
                </span>

              </div>

              <div className="flex gap-3">

                {[
                  { label: "HRS", value: hours },
                  { label: "MIN", value: minutes },
                  { label: "SEC", value: seconds },
                ].map((item) => (

                  <div
                    key={item.label}
                    className="bg-white/5 border border-white/10
                      rounded-xl w-20 py-3 text-center"
                  >
                    <p className="text-2xl font-bold text-black dark:text-white">
                      {formatTime(item.value)}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {item.label}
                    </p>
                  </div>

                ))}

              </div>
            </div>

            <button className="mt-9 flex items-center gap-3
              bg-yellow-400 hover:bg-yellow-300
              text-black font-bold px-7 py-4 rounded-xl
              transition-all duration-300 hover:scale-105">

              Shop Now

              <ArrowRight size={20} />

            </button>

          </div>

          
          <div className="order-1 md:order-2
            flex justify-center items-center relative">

            <div className="absolute w-64 h-64 md:w-80 md:h-80
              rounded-full bg-yellow-400/10 blur-3xl" />

            <img
              src={specialofferspic}
              alt="Special Offer Product"
              className="relative z-10 w-full max-w-[420px]
                object-contain drop-shadow-[0_20px_50px_rgba(234,179,8,0.15)]
                hover:scale-105 transition-transform duration-700 rounded-2xl"
            />

            <div className="absolute top-4 right-2 md:right-8
              z-20 bg-yellow-400 text-black
              rounded-full w-20 h-20 flex flex-col
              items-center justify-center rotate-12">

              <span className="text-xl font-black">
                -40%
              </span>

              <span className="text-[10px] font-bold">
                DISCOUNT
              </span>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}


export default SpecialOffers