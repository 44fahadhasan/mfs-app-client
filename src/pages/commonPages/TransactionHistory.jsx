import { useEffect, useState } from "react";
import LoadingSpiinner from "../../components/LoadingSpiinner/LoadingSpiinner";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TransactionHistory = () => {
  const [transacData, setTransacData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { identifier } = useAuth();

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/transactions-history/${identifier}`).then(({ data }) => {
      setTransacData(data);
      setLoading(false);
    });
  }, [axiosSecure, identifier]);

  if (loading) return <LoadingSpiinner />;

  return (
    <section className="container w-[87%] mx-auto poppins mt-16">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Order</th>
              <th>Transaction Amount</th>
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
                {data?.sendMoneyAmount && (
                  <td>{Number(data?.sendMoneyAmount).toFixed(2)} Tk</td>
                )}
                {data?.cashOutAmount && (
                  <td>{Number(data?.cashOutAmount).toFixed(2)} Tk</td>
                )}

                {data?.receiveIdentifier && <td>{data?.receiveIdentifier}</td>}
                {data?.agentIdentifier && <td>{data?.agentIdentifier}</td>}

                {data?.fee && <td>{data?.fee} Tk</td>}

                {data?.vatAmount && <td>{data?.vatAmount.toFixed(2)} Tk</td>}

                <td>{data?.newBalance.toFixed(2)} Tk</td>

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
