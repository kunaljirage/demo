import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import Add from '../components/Add'
import Show from '../components/Show'
export default function TourHome() {
const [data, setdata] = useState([])
useEffect(() => {
    const requestOptions = {
         
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({type:"showTour" })
    };
    fetch('/tour', requestOptions)
    .then(response => response.json())
    .then(data =>setdata(data))

                   

}, [])
function ShowTours(){
    const requestOptions = {
         
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({type:"showTour" })
    };
    fetch('/tour', requestOptions)
    .then(response => response.json())
    .then(data =>setdata(data))

                   
}
    return (
        <>
        <NavBar/>
        <div className='container'>
         <Add Show={ShowTours} title="Add Tour" label="Tour Name"/> 
         <Show data={data} tableHead="Tour Name" title="Add Tour"/>  
        </div>
        </>
    )
}
