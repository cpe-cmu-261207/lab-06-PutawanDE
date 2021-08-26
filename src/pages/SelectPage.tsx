import { useState } from "react";
import { useHistory } from "react-router-dom";

const SelectPage = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const history = useHistory();

  const handleSubmit = (): void => {
    if (isDatesValid()) {
      history.push(`/history/result?start=${startDate}&end=${endDate}`);
    } else {
      alert("Please select start date and end date correctly");
    }
  };

  const isDatesValid = (): boolean => {
    if (startDate === "" || endDate === "") {
      return false;
    } else {
      // Check if start date is before end date
      const d1Arr: number[] = startDate.split("-").map((e) => parseInt(e));
      const d2Arr: number[] = endDate.split("-").map((e) => parseInt(e));

      const d1 = new Date(d1Arr[0], d1Arr[1] - 1, d1Arr[2]);
      const d2 = new Date(d2Arr[0], d2Arr[1] - 1, d2Arr[2]);

      if (d1 > d2) return false;
    }
    return true;
  };

  return (
    <div className="text-center space-y-3 space-x-3">
      <p className="text-2xl font-semibold">Select historical range</p>
      <span>From date</span>
      <input type="date" onChange={(e) => setStartDate(e.target.value)}></input>
      <span>To date</span>
      <input type="date" onChange={(e) => setEndDate(e.target.value)}></input>
      <br />
      <button onClick={handleSubmit}>Get data</button>
    </div>
  );
};

export default SelectPage;
