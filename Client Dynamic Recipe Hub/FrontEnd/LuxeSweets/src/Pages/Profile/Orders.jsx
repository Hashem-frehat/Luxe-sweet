import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Sidebar from "./Sidebar";
import { useOrders } from "../../Context/OrdersContext";

const Orders = () => {
  const { orders, loading, error } = useOrders();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading orders: {error.message}</p>;

  return (
    <>
    <Header />

    <div className="container mx-auto flex bg-[#F5F3F0]">
        
      <Sidebar className="w-1/4 mr-6" />
      
      <div className="w-3/4 bg-white shadow-md rounded-lg overflow-hidden ml-10 mt-6">
      
        <div className="overflow-x-auto"> {/* إضافة overflow-x-auto هنا */}
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-[#A0785D] text-white uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Product</th>
                <th className="py-3 px-6 text-center">Image</th>
                <th className="py-3 px-6 text-center">Quantity</th>
                <th className="py-3 px-6 text-center">Price</th>
                <th className="py-3 px-6 text-center">Total</th>
                <th className="py-3 px-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="text-gray-800 text-lg font-bold">{order.product}</div>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <img
                      src={order.image}
                      alt={order.product}
                      className="w-16 h-16 rounded-md mx-auto object-cover"
                    />
                  </td>
                  <td className="py-3 px-6 text-center font-bold">{order.quantity}</td>
                  <td className="py-3 px-6 text-center font-bold">${order.price.toFixed(2)}</td>
                  <td className="py-3 px-6 text-center font-bold">
                    ${(order.quantity * order.price).toFixed(2)}
                  </td>
                  <td className="py-3 px-6 text-center font-bold">
                    {order.acceptable ? (
                      <div className="text-green-500">Ready</div>
                    ) : (
                      <div className="text-red-500">Pending</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Footer />
  </>
  
  );
};

export default Orders;
