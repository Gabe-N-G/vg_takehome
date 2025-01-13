import React, { useEffect, useState } from 'react'
import axios from 'axios';
import humanizeNumber from 'humanize-number';

function Table() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const initialState = {
    datestart: "",
    dateend: "",
    RevenueMin: 0,
    RevenueMax: 0,
    NetMin: 0,
    NetMax: 0,
  }
  const [data, setData] =  useState([])
  const [formData, setFormData] = useState(initialState);
  const fetchData = async() =>{
    try {
      const response = await axios.get(`https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${apiKey}`)
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }  

  useEffect(() => {
    fetchData();  
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)

    const filtered = data.filter((val) => {
      const itemYear = new Date(val.date).getFullYear();
      const years = (!formData.datestart || itemYear >= parseInt(formData.datestart)) && (!formData.dateend || itemYear <= parseInt(formData.dateend))
      const rev = (!formData.RevenueMin || val.revenue >= formData.RevenueMin) && (!formData.RevenueMax  || val.revenue <= formData.RevenueMax)  
      const net = (!formData.NetMin || val.netIncome >= formData.NetMin) && (!formData.NetMax || val.netIncome <= formData.NetMax)
      return years && rev && net
      })
    // console.log(filtered)
    setData(filtered)
  };

  const resetData = () => {
    fetchData()
    setFormData(initialState)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)
  };

  const sortAsc = (e) =>{
    let val = e.target.value
    const sorted = [...data].sort((a,b)=> a[val] - b[val])
    // console.log(sorted)
    setData(sorted)
  }

  const sortDesc = (e) =>{
    let val = e.target.value
    const sorted = [...data].sort((a,b)=> b[val] - a[val])
    // console.log(sorted)
    setData(sorted)
  }

  const sortDateAsc = () =>{
    const sorted = [...data].sort((a,b)=>{
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB
      })
    // console.log(sorted)
    setData(sorted)
  }

  const sortDateDesc = () =>{
    const sorted = [...data].sort((a,b)=>{
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA
      })
    // console.log(sorted)
    setData(sorted)
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center my-6">APPL Stock</h1>
  
      
  
      {data.length > 0 ? (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full table-auto bg-white border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 border-b text-left">
                  Date
                  <div className="mt-2">
                    Sort:
                    <button
                      value="date"
                      onClick={sortDateAsc}
                      className="ml-2 text-blue-500 hover:text-blue-600"
                    >
                      Asc
                    </button>
                    <button
                      value="date"
                      onClick={sortDateDesc}
                      className="ml-2 text-blue-500 hover:text-blue-600"
                    >
                      Desc
                    </button>
                  </div>
                </th>
                <th className="py-3 px-4 border-b text-left">
                  Revenue
                  <div className="mt-2">
                    Sort:
                    <button
                      value="revenue"
                      onClick={sortAsc}
                      className="ml-2 text-blue-500 hover:text-blue-600"
                    >
                      Asc
                    </button>
                    <button
                      value="revenue"
                      onClick={sortDesc}
                      className="ml-2 text-blue-500 hover:text-blue-600"
                    >
                      Desc
                    </button>
                  </div>
                </th>
                <th className="py-3 px-4 border-b text-left">
                  Net Income
                  <div className="mt-2">
                    Sort:
                    <button
                      value="netIncome"
                      onClick={sortAsc}
                      className="ml-2 text-blue-500 hover:text-blue-600"
                    >
                      Asc
                    </button>
                    <button
                      value="netIncome"
                      onClick={sortDesc}
                      className="ml-2 text-blue-500 hover:text-blue-600"
                    >
                      Desc
                    </button>
                  </div>
                </th>
                <th className="py-3 px-4 border-b text-left">Gross Profit</th>
                <th className="py-3 px-4 border-b text-left">EPS</th>
                <th className="py-3 px-4 border-b text-left">Operating Income</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{row.date}</td>
                  <td className="py-2 px-4 border-b">{humanizeNumber(row.revenue)}</td>
                  <td className="py-2 px-4 border-b">{humanizeNumber(row.netIncome)}</td>
                  <td className="py-2 px-4 border-b">{humanizeNumber(row.grossProfit)}</td>
                  <td className="py-2 px-4 border-b">{row.eps}</td>
                  <td className="py-2 px-4 border-b">{humanizeNumber(row.operatingIncome)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4 space-y-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Filter Entries</h2>
        
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-x-4 sm:space-y-0">
          <label htmlFor="datestart" className="font-medium">Year:</label>
          <input
            type="number"
            id="datestart"
            name="datestart"
            value={formData.datestart}
            placeholder='Initial Year'
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span>to</span>
          <input
            type="number"
            id="dateend"
            name="dateend"
            placeholder='End Year'
            value={formData.dateend}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-x-4 sm:space-y-0">
          <label htmlFor="Revenue" className="font-medium">Revenue:</label>
          <input
            type="number"
            id="RevenueMin"
            name="RevenueMin"
            placeholder='Min Revenue'
            value={formData.Revenue_min}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span>to</span>
          <input
            type="number"
            id="RevenueMax"
            name="RevenueMax"
            placeholder='Max Revenue'
            value={formData.Revenue_max}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-x-4 sm:space-y-0">
          <label htmlFor="Net Income" className="font-medium">Net Income:</label>
          <input
            type="number"
            id="NetMin"
            name="NetMin"
            placeholder='Min Net Income'
            value={formData.Net_min}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span>to</span>
          <input
            type="number"
            id="NetMax"
            name="NetMax"
            placeholder='Max Net Income'
            value={formData.Net_max}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={resetData}
            className="px-4 py-2 bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            Reset
          </button>
        </div>
      </form>
        </div>
        
      ) : (
        <p className="mt-6 text-center text-gray-500">Now loading...</p>
      )}
    </>
  );
}

export default Table
