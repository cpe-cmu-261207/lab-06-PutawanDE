import axios from "axios";
import { useEffect, useState } from "react";

const CurrentPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const [timestamp, setTimestamp] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const fetchPrice = async () => {
    setLoading(true);
    return axios
      .get("https://api.coindesk.com/v1/bpi/currentprice/thb.json")
      .then((resp) => {
        setPrice(resp.data.bpi.THB.rate);
        setTimestamp(resp.data.time.updated);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPrice();
  }, []);

  let res = <></>;

  if (isError) {
    res = (
      <p className="text-2xl text-red-500">
        There was an error. Please try again later.
      </p>
    );
  } else if (loading) {
    res = <p className="text-2xl">Loading ...</p>;
  } else if (!loading) {
    res = (
      <>
        <p className="text-2xl">{price.toLocaleString()} THB</p>
        <p> (Last updated {timestamp}) </p>
      </>
    );
  }

  return (
    <>
      <div className="text-center space-y-3">
        <p className="text-2xl font-semibold">Current price</p>
        {res}
      </div>
      )
    </>
  );
};

export default CurrentPage;
