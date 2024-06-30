import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Report: React.FC = () => {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const handleGenerateReport = () => {
    if (fromDate && toDate) {
      // Logic to generate report
      console.log('Generating report from:', fromDate, 'to:', toDate);
    } else {
      alert('Please select both dates.');
    }
  };

  const toUndefined = (date: Date | null): Date | undefined => {
    return date === null ? undefined : date;
  };

  return (

  
<div className='w-full'>
  <h1 className='py-5 font-bold'>Choose the date range to generate the report</h1>
<div className="flex border border-[#159b4647] rounded-lg items-center font-bold justify-between p-2">
      <div className='md:flex  p-2 items-center'>
        <label htmlFor="fromDate" className='mr-2'>From: </label>
        <DatePicker
          selected={fromDate}
          onChange={(date: Date | null) => setFromDate(date)}
          selectsStart
          startDate={toUndefined(fromDate)}
          endDate={toUndefined(toDate)}
          placeholderText="Select start date"
          id="fromDate"
          className='p-2 border border-[#159b4647] rounded-lg dark:bg-black'
        />
      </div>
      <div className='md:flex items-center font-bold'>
        <label htmlFor="toDate" className='mr-2'>To: </label>
        <DatePicker
          selected={toDate}
          onChange={(date: Date | null) => setToDate(date)}
          selectsEnd
          startDate={toUndefined(fromDate)}
          endDate={toUndefined(toDate)}
          minDate={toUndefined(fromDate)}
          placeholderText="Select end date"
          id="toDate"
          className='p-2 border border-[#159b4647] rounded-lg dark:bg-black'
        />
      </div>
      
    </div>
    <div className='flex w-full justify-center'>
    <button className="mt-5 border p-3 rounded-lg border-[#159b4647] hover:bg-green-600 hover:text-black font-bold" onClick={handleGenerateReport}>Generate Report</button>
    </div>
</div>
  );
};

export default Report;
