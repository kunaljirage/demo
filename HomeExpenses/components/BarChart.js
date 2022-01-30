import React, { useEffect, useState } from 'react'
import {VictoryBar, VictoryChart } from 'victory';
import Category from './category';
export default function BarChart() {
const [result, setResult] = useState([])
const [sort, setSort] = useState({month:'',year:''});
const{month,year}=sort;
const [ctegoryProps,setCtegoryProps]=useState({categoryMonth:'',categoryYear:''})
const[Month,setMonth]=useState([])

const[data,setData]=useState([])
    useEffect(() => {
        
        var requestOptions = {
            method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({type:'oneWeek' })    
        };
        fetch('/barchart', requestOptions)
        .then(response => response.json())
        .then(data =>{
         //   console.log(data)
            //const  dateArray= data.map(x=>x.date);
          //  let uniqueDate = dateArray.filter((item, i, ar) => ar.indexOf(item) === i);
//setData(uniqueDate);
//console.log(uniqueDate)

            var result = data.reduce(function(acc, obj) {
                var key = obj.date.substr(0,10);
                acc[key] = (acc[key] || 0) + +obj.price;
                return acc;
              }, Object.create(null));
            //  console.log(result);
              var aaa= Object.entries(result).map(([date, price]) => ({price: Number(price),date })) 
              // console.log(aaa);
               setResult(aaa)
        });

         requestOptions = {
          method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({type:'all' })    
  };
  fetch('/showExpense', requestOptions)
  .then(response => response.json())
  .then((data) =>{setData(data)})
      
    }, [])

    const onChangeSortHandeler=(e)=>{

    

        switch(e.target.value){
        case "month":
            setSort({month:e.target.value})
           
            const  monthArray= data.map((x)=>{
              let m=x.Created.slice(4,5);
              let y=x.Created.slice(6,10)
               let mon=--m
               const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
               "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
             const stringmonth= monthNames[mon];
             return stringmonth+'-'+y
            } );
            let uniqueMonth = monthArray.filter((item, i, ar) => ar.indexOf(item) === i);
            setMonth(uniqueMonth)
          break;
        
          case "year":
             setSort({year:e.target.value})
             setCtegoryProps({categoryYear:e.target.value})
            // const  yearArray= data.map(x=>x.Created.slice(6,10) );
            // let uniqueYear = yearArray.filter((item, i, ar) => ar.indexOf(item) === i);
            // setYear(uniqueYear);
            var requestOptions = {
              method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({type:"year"})    
          };
          fetch('/barchart', requestOptions)
          .then(response => response.json())
          .then(data =>{
            //console.log(data)
            var result = data.reduce(function(acc, obj) {
            
              acc[ obj.date] = (acc[ obj.date] || 0) + +obj.price;
              return acc;
            }, Object.create(null));
          //    console.log(result);
             var aaa= Object.entries(result).map(([date, price]) => ({price: Number(price),date })) 
          //    console.log(aaa);
          setResult(aaa)
          
          });
            break;
            
      case"":
            setSort({})
           
         requestOptions = {
              method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({type:'oneWeek' })    
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
                 setResult(aaa)
          });
          break;
          default:
            break;
        }
        }
        
        const onChangeDateHandeler=(e)=>{
switch (e.target.name) {
  case "month":
    setCtegoryProps({categoryMonth:e.target.value})
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

    let index = monthNames.indexOf(e.target.value.slice(0,3))+1;
    let year=e.target.value.slice(4,8)
   // console.log(year)
    const requestOptions = {
        method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({type:"month",month:index,year:year})    
    };
    fetch('/barchart', requestOptions)
    .then(response => response.json())
    .then(data =>{
      //console.log(data)
      setResult(data)
    //   var result = data.reduce(function(acc, obj) {
      
    //     acc[ obj.date] = (acc[ obj.date] || 0) + +obj.price;
    //     return acc;
    //   }, Object.create(null));
    // //    console.log(result);
    //    var aaa= Object.entries(result).map(([date, price]) => ({price: Number(price),date })) 
      // console.log(aaa);
    
    
    });
    break;
  
    // case "year":
    // //  console.log(e.target.value)
    //   const requestOptions = {
    //     method: 'POST',
    // headers: { 'Content-Type': 'application/json' },
    // body: JSON.stringify({type:"year",year:e.target.value})    
    // };
    // fetch('/barchart', requestOptions)
    // .then(response => response.json())
    // .then(data =>{
    //   //console.log(data)
    //   var result = data.reduce(function(acc, obj) {
      
    //     acc[ obj.date] = (acc[ obj.date] || 0) + +obj.price;
    //     return acc;
    //   }, Object.create(null));
    // //    console.log(result);
    //    var aaa= Object.entries(result).map(([date, price]) => ({price: Number(price),date })) 
    // //    console.log(aaa);
    // setResult(aaa)
    
    // });
    
    //   break;
  
  default:
    break;
}
        }

    return (
        <div className='container m-5'>

            <div className="d-flex flex-row bd-highlight mb-3">
            <h6 className='mr-3 mt-2'>SORT BY</h6>
  <div className="p-2 bd-highlight"> 
  <select className="custom-select mr-3"  style={{width:'125px'}} onChange={e=>onChangeSortHandeler(e)}  >
  <option value="">Select Date</option>
        <option value="month">Month</option>
          <option value="year">Years</option>
   </select>
   {month?
   <select className="custom-select mr-3" name="month" style={{width:'140px'}} onChange={e=>onChangeDateHandeler(e)}  >
        <option value="">Select Month</option>
         { Month?   Month.map( (month,index)=>  <option value={month} key={index+1}>{month}</option>):null} 
   </select>:null
}
{/* {year?
   <select className="custom-select  mr-3" name="year" style={{width:'120px'}} onChange={e=>onChangeDateHandeler(e)} >
        <option value="">Select Year</option>
        { Year?   Year.map( (year,index)=>  <option value={year} key={index+1}>{year}</option>):null}
   </select>:null
} */}


   </div>
 
</div>
<Category ctegoryProps={ctegoryProps} setResult={setResult}/>
<div className="d-flex" style={{backgroundColor:"#ffa078"}}>
             <VictoryChart 
            height={200}
            domainPadding={{ x:20, y: [0, 20] }} 
           
             >
               
               
                  <VictoryBar
        data={result}
        // data accessor for x values
        x="date"
        // data accessor for y values
         y="price"
    
    style={{ data: { fill: "#ff5005", width:15 } }}
      />
     
  
</VictoryChart>
</div>
        </div>
    )
}
