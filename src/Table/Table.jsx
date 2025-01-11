import React, { useEffect, useState } from 'react'
import axios from 'axios';
import humanizeNumber from 'humanize-number';

function table() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [data, setData] =  useState([])
  const [formData, setFormData] = useState("");



  useEffect(() => {
    const fetchData = async() =>{
      try {
        const response = await axios.get(`https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${apiKey}`)
        setData(response.data)
      } catch (error) {
        console.log(error)
      }
    }  
    fetchData();  
  },[])  

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)
  };

  const sortAsc = (e) =>{
    let val = e.target.value
    const sorted = [...data].sort((a,b)=> a[val] - b[val])
    console.log(sorted)
    setData(sorted)
  }

  const sortDesc = (e) =>{
    let val = e.target.value
    const sorted = [...data].sort((a,b)=> b[val] - a[val])
    console.log(sorted)
    setData(sorted)
  }

  const sortDateAsc = (e) =>{
    console.log(e.target.value)
    let val = e.target.value
    const sorted = [...data].sort((a,b)=> a[val] - b[val])
    console.log(sorted)
    setData(sorted)
  }

  const sortDateDesc = (e) =>{
    console.log(e.target.value)
    let val = e.target.value
    const sorted = [...data].sort((a,b)=> b[val] - a[val])
    console.log(sorted)
    setData(sorted)
  }

  return (  
    <><h1>APPL Stock</h1>

    
    <form onSubmit={handleSubmit}>
        <h2>Filter Entries</h2>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <label htmlFor="Revenue">Revenue:</label>
        <input
          type="number"
          id="RevenueMin"
          name="RevenueMin"
          value={formData.Revenue_min}
          onChange={handleChange}
        />
        to
        <input
          type="number"
          id="RevenueMax"
          name="RevenueMax"
          value={formData.Revenue_max}
          onChange={handleChange}
        />
        <label htmlFor="Net Income:">Net Income::</label>
        <input
          type="number"
          id="NetMin"
          name="NetMin"
          value={formData.Net_min}
          onChange={handleChange}
        />
        to
        <input
          type="number"
          id="NetMax"
          name="NetMax"
          value={formData.Revenue_max}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
    </form>
    {data.length > 0 ? 
      <table>
          <thead>
            <tr>
              <th scope="col">Date
                <button value='date' onClick={sortDateAsc}>Asc</button>
                <button value='date' onClick={sortDateDesc}>Desc</button>
              </th>
              <th scope="col">Revenue
                <button value='revenue' onClick={sortAsc}>Asc</button>
                <button value='revenue' onClick={sortDesc}>Desc</button>
              </th>
              <th scope="col">Net Income
                <button value='netIncome' onClick={sortAsc}>Asc</button>
                <button value='netIncome' onClick={sortDesc}>Desc</button>
              </th>
              <th scope="col">Gross Profit</th>
              <th scope="col">EPS</th>
              <th scope="col">Operating Income</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx)=>(
              <tr key={idx}>
                <td>{row.date}</td>
                <td>{humanizeNumber(row.revenue)}</td>
                <td>{humanizeNumber(row.netIncome)}</td>
                <td>{humanizeNumber(row.grossProfit)}</td>
                <td>{row.eps}</td>
                <td>{humanizeNumber(row.operatingIncome)}</td>
              </tr>
            ))}
          </tbody>
      </table>
      : 
            <p>now loading</p>
      }
    </>
  )
}

export default table
