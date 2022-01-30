import React, {useState } from 'react'
import { useParams } from 'react-router-dom';
export default function Add(props) {
const [name, setName] = useState('')
const Params=useParams();
const onClickHndeler=()=>{
    if(name!=="")
    {
if(props.title==="Add Tour")
{
    const requestOptions = {
         
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({tourName:name,type:props.title })
    };
    fetch('/tour', requestOptions)
    .then(response => response.json())
    .then(data =>{if(data.msg==="Success")
                    {
                        alert(data.msg)
                        setName("")
                       props.Show();
                    }
                    else{
                        alert(data.msg)
                    }
})
}
else if(props.title==="Add Member"){
   // console.log(name);

    const requestOptions = {
         
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name:name,type:props.title,tour_id:Params.id })
    };
    fetch('/tour', requestOptions)
    .then(response => response.json())
    .then(data =>{if(data.msg==="Success")
                    {
                        alert(data.msg)
                        setName("")
                      props.Show();
                    }
                    else{
                        alert(data.msg)
                    }
})

}
}
else{
    alert("Please Fill The Information")
}
}
    return (
        <div>
    
    
      <div className="row justify-content-md-center mt-5">
      <h5>{props.title}</h5>  
          </div>

          <div className="row justify-content-md-center my-3 ">
          <div className="form-group">
 <label className="mr-2" htmlFor="name">{props.label}</label>
  <input className="form-control" id='name' value={name}  onChange={e=>setName(e.target.value)}/> 
  <button onClick={onClickHndeler} className='btn btn-primary mt-2'>ADD</button> 
 
  </div>
  
 
  </div>  
  

  </div>
         
      
      
     
    )
}
