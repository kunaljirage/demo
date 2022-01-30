import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar';
import Plan from '../jsonData/MedcalPlandata'
export default function MedicalPlan() {
    const [data, setData] = useState({})
    const [grandTotal, setGrandTotal] = useState(0)
    var total;
    
    useEffect(() => {
     //  console.log(Plan)
       function groupBy(PlanArray, property) {
        return PlanArray.reduce(function (acc, obj) {
          let key = obj[property]
          if (!acc[key]) {
            acc[key] = []
          }
          acc[key].push(obj)
          return acc
        }, {})
      }
const planPrice=Plan.map(x=>x.planPrice)

const grandTota=planPrice.reduce((accumulator, a)=> { return accumulator + a}, 0)
setGrandTotal(grandTota)

       var groupedPlanType = groupBy(Plan, 'planType')
       setData(groupedPlanType)
  
    }, [])

    function add(accumulator, a) {
        return accumulator + a.planPrice;
      }
     
    return (

     <>
<NavBar/>

       <div className='container'>
            { 
               Object.keys(data).map(function(keyName, keyIndex) {

         return   <div className='mt-5' style={{width:"50%"}} key={keyIndex}>
                <h6>{keyName}</h6>
                <table className="table table-bordered">

              <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Plan</th>
      <th scope="col">Price</th>
    </tr>
  </thead>   
            { data[keyName].map((x,index)=> 
 
  <tbody key={index}>
    <tr >
      <th scope="row">{index+1}</th>
      <td>{x.planName}</td>
      <td>{x.planPrice}</td>
      
    </tr>
  </tbody>
) }

  <tbody>
  <tr>
      <th scope="row" colSpan="2">Total {keyName} :</th>
     
     
 
      <td>{ total= data[keyName].reduce(add, 0)}</td>
    </tr>
    </tbody>

  </table>        
</div>
  })  }
<div className='d-flex flex-row  '>
    <h6 className='mb-5' style={{marginLeft:"400px"}}>Total</h6>
    <h6 className='ml-3 mb-5'>{grandTotal}</h6>
</div>
</div>
</>
    )
}
