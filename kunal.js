import React, { useState } from 'react';

export default function Kunal() {
const [expense, setExpense] = useState([]);
//initial data
var data=[{id: 1, name: 'kunal', price: 875},
{id: 11, name: 'prutha', price: 920},
{id: 13, name: 'harshad', price: 0},
{id: 14, name: 'suraj', price: 20},
{id: 15, name: 'shubham', price: 0}]
//calculate total/////////////////////////////////////
function add(accumulator, a) {
   return accumulator + a.price;
 }
 var total=data.reduce(add, 0);
//////////////////////////////////////////////////////////////////
 //const calculateAmount=
//calculate expense//////////////////////////////////////////
function calculateExpense(d){
 
   if(d.length>0)
   {
   let Total= total/d.length;
 let data = d.map((x)=>{
    let price = Math.round(Total-x.price);
    let expense={name :x.name,price:price, id:x.id};
    return expense;
     })
   // setExpense(data)
 data.map((x,i)=>{
    console.log(x)
 var expensedata=data.map((y)=>{
  //   console.log(y)
    var positiveAmount=[]
    data.map(x=> {if(x.price>0){
     positiveAmount.push(x.price)
     }})
if(x.price<0)
{
    return 0
   }else if(x.id=y.id){
     return 1
   }
    })
console.log(expensedata)
  })
 }

 }
calculateExpense(data);
   

  return <div></div>;
}
