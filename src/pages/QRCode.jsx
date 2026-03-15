import { useEffect, useState} from 'react'
import { useSearchParams } from 'react-router-dom';

function Registration(){
    const [SID]= useSearchParams()
    const [data, setData] = useState(null);
    const [Loading,LoadingMove]=useState(0)
    const [retrieve,setRetrieve]=useState(false)
    const points=['.','..','...']
    
    useEffect(()=>{
        setTimeout(()=>{
        LoadingMove((Loading)=>(Loading+1)%3)
        },500)
    })
    
    useEffect(()=>{
        const timer= setTimeout(()=>{
            if (!data || !data['Registered']){
                const fetchData= async ()=>{
                    var url='https://script.google.com/macros/s/AKfycbz0_Ud6pxGQulKWHmsKWnLf7_2FagWI4hveRweOJo4jMwCnI-lzfJxk9-R9mxcFDivfyg/exec'
                    const response=await fetch(`${url}?sid=${SID.get('sid')}`,{method:'GET'})
                    .then(response=>response.json()).then(data=>setData(data))
                    setRetrieve(!retrieve)
                }
                fetchData()
            } 
        },500)   
    },[retrieve])

    if(data==null){
        return(<>
            <section id="center">
                <p className='welcome'>
                    Please wait while we retrieve QR code {points[Loading]} <br/>
                </p>
                Reminder to use the link provided.
            </section>
        </>)
    }
    
    if (!data['Registered']){
        return (
            <>
                <section id="center">
                    Please present the following QR code to the Registration Table 
                    <img src={data['QRCode']} alt="QR Code not generated." />
                </section>
            </>
        )
    }
    else{
        return (
                        <>
                            <section id="center">
                                <p className="welcome">
                                    WELCOME {data['Name']}!<br/>
                                </p>
                                <p className="zone">
                                    ZONE {data['Zone']} 
                                </p>
                                {data['Role']? <p className="role"><br/>{data['Role']}</p>:<></>}
                            </section>
                        </>
                    )
    }
}

export default Registration