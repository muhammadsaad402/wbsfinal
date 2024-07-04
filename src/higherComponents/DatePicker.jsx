import React, { useState } from "react";
import { YearPicker, MonthPicker, DayPicker } from "react-dropdown-date";


const DatePicker = (setDate,date) => {
//   const [date, setDate] = useState({ year: "", month: "", day: "" });

  const [monthError, setMonthError] = useState(false);
  const [dayError, setDayError] = useState(false);
  const [yearError, setYearError] = useState(false);

  const submit = () => {
    if (date?.date?.month === "") {
      setMonthError(true);
    }
    if (date?.date?.day === "") {
      setDayError(true);
    }
    if (date?.date?.year === "") {
      setYearError(true);
    }
  };
  return (
    <div className="test">
      <MonthPicker
        defaultValue={"MM"}
        numeric // to get months as numbers
        endYearGiven // mandatory if end={} is given in YearPicker
        year={date?.date?.year} // mandatory
        value={(date?.date?.month)} // mandatory
        onChange={(month) => {
          // mandatory
          setDate?.setDate((prev) => ({ ...prev, month }));
          setMonthError(false);
        }}
        id={"month"}
        classes={`dropdown ${dayError ? "error" : ""}`}
        optionClasses={"option"}
      />
      <DayPicker
        defaultValue={"DD"}
        year={date?.date?.year} // mandatory
        month={date?.date?.month} // mandatory
        endYearGiven // mandatory if end={} is given in YearPicker
        value={date?.date?.day} // mandatory
        onChange={(day) => {
          // mandatory
          setDate?.setDate((prev) => ({ ...prev, day }));
        }}
        id={"day"}
        classes={`dropdown ${monthError ? "error" : ""}`}
        optionClasses={"option"}
      />

      <YearPicker
        defaultValue={"YYYY"}
        start={2010} // default is 1900
        end={2020} // default is current year
        reverse // default is ASCENDING
        value={date?.date?.year} // mandatory
        onChange={(year) => {
          // mandatory
          setDate?.setDate((prev) => ({ ...prev, year }));
        }}
        id={"year"}
        classes={`dropdown ${yearError ? "error" : ""}`}
        optionClasses={"option"}
      />

      {/* <button type="button" onClick={() => submit()}>
        Submit
      </button> */}
    </div>
  );
};

export default DatePicker;
