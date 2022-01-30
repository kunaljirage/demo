import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
 function Show(props) {
   const [calculate, setCalculate] = useState([]);
   const Params=useParams();
 var amount;
   var total;
  // useEffect(() => {
  //  if(props.title==="Add Member")
  //  {
   console.log(props.data)

  //  }
  // }, [])
  function add(accumulator, a) {
    return accumulator + a.price;
  }

  const calculateExpense=()=>{
    if(props.data.length>0)
    {
    let Total=total/props.data.length
  // console.log(Total)
  let data= props.data.map((x)=>{
    let price = Math.round(Total-x.price)
   
let data={name :x.name,price:price};
// console.log(data)
 return data
   })
//console.log(data)
  setCalculate(data)
    }
        }


        const calculateAmount=(x,i)=>{
   if(x.price<0)
   {
return <td key={i+1}>0</td>;
   }
   else{
   
 var positiveAmount=[]
 calculate.map(x=> {if(x.price>0){
 positiveAmount.push(x.price)
 }
});
 
//console.log(positiveAmount)
 if(positiveAmount.length>0){
 var amountPay=Math.round(x.price/positiveAmount.length)
 return<td key={i+1}>{amountPay}</td>
 }
  }
}
    return (
   
        <div >
            <div className='d-flex justify-content-center'>
           { props.title==="Add Tour"?
            <table className="table table-bordered"style={{width:"200px"}}>
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">{props.tableHead}</th>
       </tr>
  </thead>
  <tbody>
 { props.data?props.data.map((x,index)=><tr key={index+1}>
      <th scope="row">{index+1}</th>
    <td ><Link to={"/tour_expenses/"+x.id+"/"+x.name}>{x.name}</Link></td>  
    </tr>):null
 }

  </tbody>
</table>:null

 }
 { props.title==="Add Member"?
 <div>
<table className="table table-bordered"style={{width:"400px"}}>
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">{props.tableHead}</th>
      <th scope="col">Expense Amount</th>
       </tr>
  </thead>
  <tbody>
{props.data?props.data.map((x,index)=><tr key={index+1}><th scope="row">{index+1}</th>
 <td ><Link to={"/tour_expenses/"+Params.id+"/"+Params.name+"/"+x.id+"/"+x.name}>{x.name}</Link></td>
 <td>{x.price}</td>
</tr>):null
 }  
<tr>
      <th scope="row" colSpan="2">Total :</th>
      <td>{total= props.data.reduce(add, 0)}</td>
    </tr>
  </tbody>
</table>
<div className='d-flex justify-content-center'>
  <button onClick={calculateExpense} className='btn btn-primary'>Calculate Expense</button> 
  </div>
</div>
:null
 }
</div>

{calculate.length>0?
<table className="table table-bordered"style={{width:"400px"}}>
  <thead>
    <tr>
      <th scope="col">{props.tableHead}</th>
      <th scope="col">Expense</th>
     {calculate.map((x,index)=><th scope="col" key={index+1} >{x.name}</th>)}
       </tr>
  </thead>
  <tbody>
{calculate.length>0?calculate.map((x,index)=><tr key={index+1}><th scope="row">{x.name}</th>
 <td>{x.price}</td>
{x.price>0?calculate.map((x,i)=><td key={i+1}>0</td>):calculate.map(calculateAmount)}
</tr>):null
 
 }
  </tbody>
</table>:null
 }
        </div>
        

     
     
      
    )
}


export default Show







