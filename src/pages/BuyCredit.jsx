import React, { useContext } from "react";
import { plans } from "../assets/assets";
import { Context } from "../context/Context";
import { toast } from "react-toastify";
import axios from "axios";
import { loadStripe } from '@stripe/stripe-js'
import ReactGA from'react-ga'

const BuyCredit = () => {
  const { user, backendUrl, token, setShowLogin, navigate } = useContext(Context);

  const paymentStripe = async (planId) => {
    try {

      const { data } = await axios.post(backendUrl + '/api/user/pay-stripe', { planId }, { headers: { token } })
      if (data.success) {
        const { session_url } = data
        window.location.replace(session_url)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/credits", title: "Credits Page" })
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <a
        className="text-lg self-end p-5 text-[#202020] hover:opacity-75 transition duration-200"
        href="/"
      >
        ✕
      </a>
      <div className="w-full flex flex-col justify-center items-center mb-10">
        <h1 className="text-3xl sm:text-4xl underline underline-offset-8 italic">
          Deevo Credits
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {plans.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-between border rounded-lg p-6 cursor-pointer hover:shadow-lg transition duration-200"
          >
            <p className="text-lg text-[#202020]">{item.id}</p>
            <p className="mt-3 text-gray-600">
              <span className="text-4xl text-[#202020]">${item.price}</span>
              <span className="text-lg text-gray-500"> / {item.credits} credits</span>
            </p>
            <p className="text-md text-gray-500 mt-3">{item.desc}</p>
            {user ?
            <button
              onClick={() => paymentStripe(item.id)}
              className="w-full bg-black text-white text-sm font-medium rounded-full py-2.5 mt-6 hover:opacity-65 transition duration-200"
            >
              Purchase
            </button>
            :
            <button
              onClick={() => {setShowLogin(true); navigate('/')}}
              className="w-full bg-black text-white text-sm font-medium rounded-full py-2.5 mt-6 hover:opacity-65 transition duration-200"
            >
              Get Started
            </button>
            }
          </div>
            
        ))}
      </div>
    </div>
  );
};

export default BuyCredit;
