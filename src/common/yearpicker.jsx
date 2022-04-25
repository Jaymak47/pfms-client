import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const YearPicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat="yyyy"
      showYearPicker
      // showFullMonthYearPicker
      // showFourColumnMonthYearPicker
    />
  );
};

export default YearPicker;
