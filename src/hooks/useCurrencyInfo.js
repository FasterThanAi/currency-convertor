// import { useEffect, useState } from "react";
// // hooks return js basicaly so file name js.
// // we can use build in hooks in custom hooks also 
// function useCurrencyInfo(currency){ // ye hook optional value nhi leta so we pass currency 
//     const [data,setData] = useState({}) 
//     useEffect(()=>{
//         // fetch(`https://api.currencyapi.com/v3/latest?apikey=cur_live_nYzTOJN5TEfW2xM2RJEz84TKfryoY1E4OGDGp971&{currency}`)
//         // fetch(`https://api.currencyapi.com/v3/latest?apikey=cur_live_nYzTOJN5TEfW2xM2RJEz84TKfryoY1E4OGDGp971&base_currency=${currency}`)
//         // fetch(`https://api.currencyapi.com/v3/latest?apikey=cur_live_nYzTOJN5TEfW2xM2RJEz84TKfryoY1E4OGDGp971&base_currency=${currency}&currencies=${currency}`)

//         fetch(`https://v6.exchangerate-api.com/v6/398d01e3833bdb0f79ff9317/latest/${currency}`)
//         // fetch(`https://v6.exchangerate-api.com/v6/398d01e3833bdb0f79ff9317/latest/${baseCurrency.toUpperCase()}`)


//         .then((res)=> res.json()) // convert data in json 
//         .then((res)=>setData(res.data)) 
//         .catch((err) => console.error("API fetch error:", err));
//         console.log(data); // data ke andar vallue 
        
//     },[currency]) // dependencies
//     console.log(data); 
//     return data 
// }
// export default useCurrencyInfo; 
// // pura method hi return ho rha hai 
import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    if (!currency) return;

    // Always use uppercase codes
    const base = currency.toUpperCase();

    fetch(
      `https://v6.exchangerate-api.com/v6/398d01e3833bdb0f79ff9317/latest/${base}`
    )
      .then(res => res.json())
      .then(json => {
        if (json.result === "success" && json.conversion_rates) {
          setData(json.conversion_rates);
        } else {
          console.warn("Unexpected API response:", json);
          setData({});
        }
      })
      .catch(err => {
        console.error("API fetch error:", err);
        setData({});
      });
  }, [currency]);

  return data;
}

export default useCurrencyInfo;
