import React, { useEffect, useState } from 'react'
import axios from 'axios';
import humanizeNumber from 'humanize-number';

function Table() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [data, setData] =  useState([])
  const [formData, setFormData] = useState({
    datestart: "",
    dateend: "",
    RevenueMin: 0,
    RevenueMax: 0,
    NetMin: 0,
    NetMax: 0,
  });

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
    console.log(filtered)
  };

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
    <><h1>APPL Stock</h1>

    
    <form onSubmit={handleSubmit}>
        <h2>Filter Entries</h2>
        <label htmlFor="year">Year:</label>
        <input
          type="number"
          id="datestart"
          name="datestart"
          value={formData.datestart}
          onChange={handleChange}
        />
        to
        <input
          type="number"
          id="dateend"
          name="dateend"
          value={formData.dateend}
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
        <label htmlFor="Net Income:">Net Income:</label>
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
                <div>
                  Sort:
                  <button value='date' onClick={sortDateAsc}>Asc</button>
                  <button value='date' onClick={sortDateDesc}>Desc</button>
                </div>
              </th>
              <th scope="col">Revenue
                <div>
                  Sort:
                  <button value='revenue' onClick={sortAsc}>Asc</button>
                  <button value='revenue' onClick={sortDesc}>Desc</button>
                </div>
              </th>
              <th scope="col">Net Income
                <div>
                  Sort:
                  <button value='netIncome' onClick={sortAsc}>Asc</button>
                  <button value='netIncome' onClick={sortDesc}>Desc</button>
                </div>
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

export default Table
