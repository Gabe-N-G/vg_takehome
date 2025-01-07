import React from 'react'
import { useState } from 'react';

function table() {
  const [formData, setFormData] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // addPokemon(formData)
    // setFormData(initialState);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)
  };

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

    <table>
  <caption>
    Results
  </caption>

  <thead>
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Revenue</th>
      <th scope="col">Net Income</th>
      <th scope="col">Gross Profit</th>
      <th scope="col">EPS (Earnings Per Share)</th>
      <th scope="col">Operating Income</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Chris</th>
      <td>HTML tables</td>
      <td>22</td>
    </tr>
    <tr>
      <th scope="row">Dennis</th>
      <td>Web accessibility</td>
      <td>45</td>
    </tr>
    <tr>
      <th scope="row">Sarah</th>
      <td>JavaScript frameworks</td>
      <td>29</td>
    </tr>
    <tr>
      <th scope="row">Karen</th>
      <td>Web performance</td>
      <td>36</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row" colspan="2">Average age</th>
      <td>33</td>
    </tr>
  </tfoot>
</table>
    </>
  )
}

export default table