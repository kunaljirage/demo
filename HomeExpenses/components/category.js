import React, { useEffect, useState } from 'react'

export default function Category(props) {
  const [category, setCategory] = useState('')
  useEffect(() => {
   if(category!=="")
   {
    if(props.ctegoryProps.categoryMonth&&category!=="All")
    {
//console.log(props.ctegoryProps.categoryMonth,category)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

    let index = monthNames.indexOf(props.ctegoryProps.categoryMonth.slice(0,3))+1;
    let year=props.ctegoryProps.categoryMonth.slice(4,8)
   // console.log(year)
    const requestOptions = {
        method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({type:"categoryMonth",month:index,year:year,category:category})    
    };
    fetch('/barchart', requestOptions)
    .then(response => response.json())
    .then((data) =>{
      
    
    if(data.length>0){
     //console.log(data)
     props.setResult(data)
    }
    else
      {
        alert("No Data Found For This Sort")
        setCategory('')
      }
    
    });
    }else if(props.ctegoryProps.categoryYear&&category!=="All"){
//console.log(props.ctegoryProps.categoryYear,category)

                         
            var requestOptions = {
              method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({type:"categoryYear",category:category})    
          };
          fetch('/barchart', requestOptions)
          .then(response => response.json())
          .then(data =>{
            //console.log(data)
            var result = data.reduce(function(acc, obj) {
            
              acc[ obj.date] = (acc[ obj.date] || 0) + +obj.price;
              return acc;
            }, Object.create(null));
       
             var aaa= Object.entries(result).map(([date, price]) => ({price: Number(price),date })) 
          // console.log(aaa);
          if(data.length>0){
            //console.log(data)
            props.setResult(aaa)
           }
           else
             {
               alert("No Data Found For This Sort")
               setCategory('')
             }
           
          
          });
    }else if(category){
     
      requestOptions = {
        method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({type:'oneWeekCategory',category:category })    
    };
    fetch('/barchart', requestOptions)
    .then(response => response.json())
    .then(data =>{
      var result = data.reduce(function(acc, obj) {
            var key = obj.date.substr(0,10);
            acc[key] = (acc[key] || 0) + +obj.price;
            return acc;
          }, Object.create(null));
       
          var aaa= Object.entries(result).map(([date, price]) => ({price: Number(price),date })) 
          if(data.length>0){
            //console.log(data)
            props.setResult(aaa)
           }
           else
             {
               alert("No Data Found For This Sort")
               setCategory('')
             }
    });

    }
  }
  }, [props.ctegoryProps,category])


    return (
     <div className='d-flex flex-row mb-3'>
             <h6 className='mr-2 mt-2'>Sort Expense Type</h6>
             <select className="custom-select" name="ExpenseType" id="type" value={category} style={{width:"145px"}} onChange={e=>setCategory(e.target.value)}  >
        <option value="All">All</option>
          <option value="Food">Food</option>
          <option value="Cloth">Cloth</option>
          <option value="Entertainment">Entertainment</option>
          <option  value="Shopping">Shopping</option>
        </select>
     </div> 
    )
}
