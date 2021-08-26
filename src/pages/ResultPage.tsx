import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ResultPage = () => {
  const location = useLocation();
  const apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?currency=THB&${location.search.substring(
    1
  )}`;
  const startDate = location.search.substring(7, 17);
  const endDate = location.search.substring(22, 32);

  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const [record, setRecord] = useState<Record<string, number>>({});

  const fetchRecord = async () => {
    setLoading(true);
    return axios
      .get(apiUrl)
      .then((resp) => {
        setRecord(resp.data.bpi);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRecord();
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
    const priceListItems = [];
    for (const [key, value] of Object.entries(record)) {
      priceListItems.push(
        <li className="text-xl" key={key}>
          {key} - {value.toLocaleString()} THB
        </li>
      );
    }
    res = <ul>{priceListItems}</ul>;
  }

  return (
    <div className="text-center space-y-3">
      <p className="text-2xl font-semibold">Historical price</p>
      <p className="text-xl font-semibold">
        ( From {startDate} To {endDate})
      </p>
      {res}
    </div>
  );
};

export default ResultPage;
