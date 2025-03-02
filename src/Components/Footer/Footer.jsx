import paymentAmericanExpress from '../../assets/images/American-Express-Color.png'
import paymentAppleStore from '../../assets/images/get-apple-store.png'
import paymentGooglePlay from '../../assets/images/get-google-play.png'
import paymentAmazon from '../../assets/images/amazon-pay.png'
import paymentMasterCard from '../../assets/images/mastercard.webp'
import paymentPaypal from '../../assets/images/paypal.png'

export default function Footer() {
  return (
    <div className="bg-slate-100 p-5">
      <div className="container mx-auto px-4">
        <h2 className="my-2 text-lg font-semibold">Get the FreshCart app</h2>
        <p className="text-gray-500 text-sm">
          We will send you a link—open it to download the app.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 my-3">
          <div className="sm:col-span-10">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              Share App Link
            </button>
          </div>
        </div>

        <div className="p-4 border-y border-gray-300 flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0 items-center">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <p className="text-sm font-medium">Payment Partners:</p>
            <img src={paymentAmazon} alt="Amazon Pay" className="w-14 sm:w-16" />
            <img src={paymentAmericanExpress} alt="American Express" className="w-14 sm:w-16" />
            <img src={paymentMasterCard} alt="MasterCard" className="w-14 sm:w-16" />
            <img src={paymentPaypal} alt="PayPal" className="w-14 sm:w-16" />
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2">
            <p className="text-sm font-medium">Get deliveries with FreshCart:</p>
            <img src={paymentAppleStore} alt="Apple Store" className="w-20 sm:w-24" />
            <img src={paymentGooglePlay} alt="Google Play" className="w-20 sm:w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}
