# Appl Stock Watcher

This is an app that allows you to watch Apple's stock through the financialmodelingprep.com api

## Libraries used
- React (created with Vite)
- Axios
- humanizeNumber (adds commas to large numbers)
- TailwindCSS
- dotenv

## Api call

To start fetching the data, the code strings together an api call to the financial modeling prep on page load in a useeffect.

```js
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
```
The apikey is kept in a private .env file for security reasons.

## Sorting Data

The Date, revenue, and net Income can all be sorted by Ascending or Decending order by clicking on the buttons on the the headers of the table. Each of these have a useeffect attached. With the date, the date is converted to the Date datatype in JS so that we can sort time correctly. The date being pulled from the API defaults to string.

```js
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
```

For the non date types, we can write a generic sort ASC/DESC, which pulls what type is being sorted through value tags in the html

```html
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
```

## Filtering Data

All filters in this application are chained together in a single form. The user is able to chain together date (by year), revenue, and net income filtering. Hitting the reset filter simply calls the api again to refresh the data.

```js
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
```

## Future goals
If given a unlimited api key, we could do a ton more with the data. Here are some ideas for improving the app.
1. Allow for user to check for more stocks than just apple (would be a simple change in the api call)
2. Show more years results per page for buisness info (right now it is only 5 years)
3. Compare stock revenue with other stock revenue
4. Visualize data using charts and grapsh.
