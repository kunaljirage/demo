import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import Add from '../components/Add'
import Show from '../components/Show'
import { useParams } from 'react-router-dom';
export default function ToursScreen() {
    const [data, setdata] = useState([])
    const Params=useParams();
    useEffect(() => {
        const requestOptions = {
             
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({type:"showMember",tour_id:Params.id })
        };
        fetch('/tour', requestOptions)
        .then(response => response.json())
        .then(data =>setdata(data) )
    
                       
    
    }, [])
     
  

    function ShowMembers(){
        const requestOptions = {
             
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({type:"showMember",tour_id:Params.id })
        };
        fetch('/tour', requestOptions)
        .then(response => response.json())
        .then(data =>setdata(data) )
    
    
                       
    }
    return (
       <>
        <NavBar/>   
            <Add  Show={ShowMembers} title="Add Member" label="Name"/> 
            <Show data={data} tableHead="Member Name" title="Add Member"/> 
          
     </>
    )
}

//SELECT * FROM tour_member INNER JOIN tour_expense ON tour_member.id = tour_expense.member_id AND tour_member.tour_id=1