import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import { useParams } from 'react-router-dom';
export default function TourMembersScreen() {
    const [expense, setExpense] = useState({ItemName:'',Price:''});
    const[data,setData]=useState([]);
    const Params=useParams();
  //  var total;
useEffect(() => {
    const requestOptions = {
              
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"type":"showMemberExpense",id:Params.mid})
    };
    fetch('/tour', requestOptions)
    .then(response => response.json())
    .then(data =>setData(data));
   
}, [])

const onChangeHandeler=(e)=>{
    setExpense({...expense,[e.target.name]:e.target.value})
     }
     const addExpense=()=>{
        if(expense.ItemName===undefined||expense.ItemName.trim().length===0)
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
         body: JSON.stringify({"type":"addMemberExpense","tour_id":Params.id,"member_id":Params.mid,"item_name":expense.ItemName,"price":expense.Price})
     };
     fetch('/tour', requestOptions)
     .then(response => response.json())
     .then(data =>{
       if(data.msg==="Success")
       {
setExpense({ItemName:'',Price:''})
const requestOptions = {
              
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({"type":"showMemberExpense",id:Params.mid})
};
fetch('/tour', requestOptions)
.then(response => response.json())
.then(data =>setData(data));
alert(data.msg)
       }else{
         alert(data.msg)
       }
     });
     
        }
     }
     function add(accumulator, a) {
      return accumulator + a.price;
    }
    return (
        <>
        <NavBar/>
      <div className='container mt-3'><h6>Member Name: {Params.mname}</h6></div>
        <div className="d-flex justify-content-center mt-5">
        <div className="border  p-3 rounded" style={{backgroundColor:'#fa7e02'}}>
      
      <div  className="d-flex justify-content-center">
          <h4 className="mb-4 text-warning">Add Your  Expenses</h4>
        </div>
      <div className="d-flex flex-row bd-highlight mb-3">
 
  <div className="p-2 bd-highlight">
    <label className="m-1" htmlFor="item" style={{color:'#ffffff'}}>Item Name</label>
      <input className="m-1 form-control" value={expense.ItemName} name="ItemName" type="text" id="item"  onChange={e=>onChangeHandeler(e)} />
      </div>

  <div className="p-2 bd-highlight"> 
     <label className="m-1" htmlFor="price"  style={{color:'#ffffff'}}>Price</label>
        <input className="m-1 form-control" value={expense.Price}  name="Price" type="text" id="price"  onChange={e=>onChangeHandeler(e)} />
      </div>
</div>
<div className="d-flex justify-content-center">
  <button className="btn btn-primary" style={{backgroundColor:'#bb00ff',border:"1px solid #bb00ff"}} onClick={addExpense}>Add</button>
</div>

    </div>

    </div>
    {data.length!==0?
        <div className='container mt-5'>
    <table className="table table-bordered"style={{width:"500px"}}>
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Item Name</th>
      <th scope="col">Price</th>
       </tr>
  </thead>
  <tbody>
 { data.map((x,index)=>
<tr key={index+1}>
      <th scope="row">{index+1}</th>
    <td >{x.item_name}</td>
   
 <td >{x.price}</td>

    </tr>)
}
<tr>
      <th scope="row" colSpan="2">Total :</th>
      <td>{ data.reduce(add, 0)}</td>
    </tr>
  </tbody>
</table>
</div>:null
}
        </>
    )
}
