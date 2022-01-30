import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";

export default function Expense() {
   const [expense, setExpense] = useState({ExpenseType:'',ItemName:'',Price:'',date:''});
 const {ExpenseType,ItemName,Price,date}=expense;
useEffect(() => {
  var currentDate=new Date();
  var dd = String(currentDate.getDate()).padStart(2, '0');
  var mm = String(currentDate.getMonth() + 1).padStart(2, '0'); 
  var yyyy = currentDate.getFullYear();
   var today = yyyy+ '-'+ mm + '-' + dd;
setExpense({date:today})
}, [])





const onChangeHandeler=(e)=>{
setExpense({...expense,[e.target.name]:e.target.value})
 }
 
 const addNewExpense=()=>{
 
   if(expense.ExpenseType===undefined||expense.ExpenseType.length===0)
   {
     alert('Please select expense type')
   } else if(expense.ItemName===undefined||expense.ItemName.trim().length===0)
   {
    alert('Please set item name')
   }else if(expense.Price===undefined||expense.Price.trim().length===0)
   {
      alert('Please set a price')
   }else if(isNaN(expense.Price))
   {
       alert('Please enter numeric  price')
   }else{
   // console.log(expense);
       const requestOptions = {
         
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({expense })
};
fetch('/addExpense', requestOptions)
.then(response => response.json())
.then(data =>{
  if(data.msg==="Expense Added Successfuly")
  {
    var currentDate=new Date();
    var dd = String(currentDate.getDate()).padStart(2, '0');
    var mm = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    var yyyy = currentDate.getFullYear();
     var today = yyyy+ '-'+ mm + '-' + dd;
 setExpense({date:today,ExpenseType:'',ItemName:'',Price:''})
  }
  alert(data.msg)});

   }
    }
    
  return (
    <>

<NavBar/>

    <div className="d-flex justify-content-center mt-5">
        <div className="border  p-3 rounded" style={{backgroundColor:'#7f2994'}}>
        <Link to="/show_expenses" className="btn btn-info mr-3" >Show All Expenses</Link>
        <Link to="/bar_chart" className="btn btn-info" >Show Barchart</Link>
      <div  className="d-flex justify-content-center">
          <h4 className="mb-4 text-warning">Add Your Daily Expenses</h4>
        </div>
      
      <div className="d-flex p-2">
        <input type="date" name="date"  value={date} onChange={e=>onChangeHandeler(e)} />
      </div>


    
<div className="d-flex flex-row bd-highlight mb-3">
  <div className="p-2 bd-highlight"> 
   <label className="m-1" htmlFor="type" style={{color:'#ffffff'}}>Expense Type</label>
        <select className="custom-select" name="ExpenseType" value={ExpenseType} id="type" onChange={e=>onChangeHandeler(e)}>
        <option value="">Select Expense Type </option>
          <option value="Food">Food</option>
          <option value="Cloth">Cloth</option>
          <option value="Entertainment">Entertainment</option>
          <option  value="Shopping">Shopping</option>
        </select>
        </div>
  <div className="p-2 bd-highlight">
    <label className="m-1" htmlFor="item" style={{color:'#ffffff'}}>Item Name</label>
      <input className="m-1 form-control" type="text" name="ItemName" value={ItemName}  id="item" onChange={e=>onChangeHandeler(e)} />
      </div>

  <div className="p-2 bd-highlight"> 
     <label className="m-1" htmlFor="price" style={{color:'#ffffff'}}>Price</label>
        <input className="m-1 form-control" type="text" name="Price"  value={Price}  id="price" onChange={e=>onChangeHandeler(e)} />
      </div>
</div>
<div className="d-flex justify-content-center">
  <button className="btn btn-primary" onClick={addNewExpense} >Add</button>
</div>

    </div>

    </div>
    </>
  );
}
