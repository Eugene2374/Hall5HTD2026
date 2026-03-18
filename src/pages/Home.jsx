import { useState } from 'react'
import '../app.css'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'

function Home(){
    const [SID,setSID]=useState()
    
    function setValue(e){
        setSID(e.target.value)
    }

    return(
        <>
        <section id="center">
            <h1>
                WELCOME TO HALL 5'S HIGH TABLE DINNER
            </h1>
            <p>Please insert Student ID number</p>
            <input type='text' onChange={setValue}/>
            <Link to ={`/QRCODE?sid=${SID}`}>Check SID</Link>
        </section>
        </>
    )
}


const navigate=()=>{
    let nav= useNavigate()
    nav('/QRCODE')
    // nav({pathname:'/QRCODE',search:`?${createSearchParams({sid:SID})}`})
}

export default Home