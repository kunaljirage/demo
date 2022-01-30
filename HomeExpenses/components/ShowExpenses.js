import React, { useEffect, useState } from 'react'




export default function ShowExpenses() {
    const [sort, setSort] = useState({date:'',month:'',year:''});
    const{date,month,year}=sort;
    const[getdate,setdate]=useState([]);
    const[data,setData]=useState([]);
    const[Month,setMonth]=useState([])
    const[Year,setYear]=useState([])
useEffect(() => {
  
   let requestOptions = {
              method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({type:'all' })    
     };
     fetch('/showExpense', requestOptions)
     .then(response => response.json())
     .then((data) =>{setData(data);

      const  monthArray= data.map((x)=>{
       let m=x.Created.slice(4,5);
        let mon=--m
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
       return monthNames[mon];
     } );

  //const  dateArray= data.map(x=>x.Created);
//  let uniqueDate = monthArray.filter((item, i, ar) => ar.indexOf(item) === i);
let uniqueMonth = monthArray.filter((item, i, ar) => ar.indexOf(item) === i);
//console.log(uniqueMonth);
   setMonth(uniqueMonth)
      const  yearArray= data.map(x=>x.Created.slice(6,10) );
      let uniqueYear = yearArray.filter((item, i, ar) => ar.indexOf(item) === i);
      setYear(uniqueYear);
    });
     
        
}, [])


const onChangeHndeler=(e)=>{
    switch(e.target.value){
      case "All":
        setSort({})
        var requestOptions = {
          method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({type:'all' })    
 };
 fetch('/showExpense', requestOptions)
 .then(response => response.json())
 .then((data) =>{setData(data);
});

    
      break;
        case "Date":
            setSort({date:"Date"})
            
             requestOptions = {
              
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({type:'getdate' })    
            };
            fetch('/showExpense', requestOptions)
            .then(response => response.json())
            .then(data => setdate(data));
              
            
            break;
            case "Month":
                setSort({month:"Month"})
                break;
                case "Year":
                    setSort({year:"Year"})
                    break;
                    default:
                      
                    break;
    }

}


const onChangeDate=(e)=>{

switch(e.target.name){
  case "date":

if(e.target.value!=="")
{
  const requestOptions = {
    method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({type:"sortByDate",date:e.target.value})    
};
fetch('/showExpense', requestOptions)
.then(response => response.json())
.then(data =>setData(data));

}
else{
  const requestOptions = {
    method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({type:"all"})    
};
fetch('/showExpense', requestOptions)
.then(response => response.json())
.then(data =>setData(data));

}
break;
case "month":
  if(e.target.value!=="")
  {
    
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    let index = monthNames.indexOf(e.target.value)+1;
    
  //  console.log(index);
    const requestOptions = {
      method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({type:"sortByMonth",month:index})    
  };
  fetch('/showExpense', requestOptions)
  .then(response => response.json())
  .then(data =>setData(data));
  
  }
  else{
    const requestOptions = {
      method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({type:"all"})    
  };
  fetch('/showExpense', requestOptions)
  .then(response => response.json())
  .then(data =>setData(data));
  
  }
      break;


  case "year":
    if(e.target.value!=="")
{
  const requestOptions = {
    method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({type:"sortByYear",year:e.target.value})    
};
fetch('/showExpense', requestOptions)
.then(response => response.json())
.then(data =>setData(data));

}
else{
  const requestOptions = {
    method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({type:"all"})    
};
fetch('/showExpense', requestOptions)
.then(response => response.json())
.then(data =>setData(data));

}
    break;
    
default:
  break;
}
}

    return (
<div className='container mt-5'>
    <div className='d-flex flex-row mb-4'>
        
    <h6 className='mr-3 mt-2'>SORT BY</h6>
   <select className="custom-select mr-3" onChange={e=>onChangeHndeler(e)} style={{width:'100px'}}  >
        <option value="All">All</option>
        <option value="Date">Date</option>
        <option value="Month">Month</option>
          <option value="Year">Year</option>
   </select>
{date?     
   <select className="custom-select mr-3" name="date" onChange={e=>onChangeDate(e)} style={{width:'130px'}} >
        <option value="">Select Date</option>
    { getdate?   getdate.map( (date,index)=>  <option value={date} key={index+1}>{date}</option>):null}
   </select>:null
}
{month?
   <select className="custom-select mr-3" name="month" style={{width:'140px'}}  onChange={e=>onChangeDate(e)} >
        <option value="">Select Month</option>
        { Month?   Month.map( (month,index)=>  <option value={month} key={index+1}>{month}</option>):null}
   </select>:null
}
{year?
   <select className="custom-select  mr-3" name="year" style={{width:'120px'}}  onChange={e=>onChangeDate(e)} >
        <option value="">Select Year</option>
        { Year?   Year.map( (year,index)=>  <option value={year} key={index+1}>{year}</option>):null}
   </select>:null
}

    </div>
  
        <table className="table">
        <caption>List of Expenses</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Expense Type</th>
            <th scope="col">Item Name</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
        {data? data.map((item,index)=><tr key={index+1}>
          
            <th scope="row">{index+1}</th>
            <td>{item.Created}</td>
            <td>{item.expense_type}</td>
            <td>{item.item_name}</td>
            <td>{item.price}</td>
          </tr>):null}
          
        </tbody>
      </table>
      </div>
    )
}
