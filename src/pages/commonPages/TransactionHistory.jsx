import { useEffect, useState } from "react";
import LoadingSpiinner from "../../components/LoadingSpiinner/LoadingSpiinner";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TransactionHistory = () => {
  const [transacData, setTransacData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/transactions-history/${user?.email}`).then(({ data }) => {
      setTransacData(data);
      setLoading(false);
    });
  }, [axiosSecure, user?.email]);

  if (loading) return <LoadingSpiinner />;

  return (
    <section className="container w-[87%] mx-auto poppins mt-16">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Order</th>
              <th>Send Amount</th>
              <th>Consumer Info</th>
              <th>Fee</th>
              <th>Your Balance</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {/* row */}
            {transacData?.map((data, idx) => (
              <tr
                key={idx}
                className={`${data?.idx / 1 === 0 && "bg-base-200"}`}
              >
                <th>{idx + 1}</th>
                <td>{data?.sendMoneyAmount}.00Tk</td>
                <td>{data?.receiveIdentifier}</td>
                <td>{(data?.fee && data?.fee) || 0}.00Tk</td>
                <td>{data?.newBalance}.00Tk</td>
                <td>{new Date(data?.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TransactionHistory;
