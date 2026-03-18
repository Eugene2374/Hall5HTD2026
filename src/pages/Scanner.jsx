import { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import jsQR from 'jsqr'

const WebcamCapture=({onScan})=>{
    const webcamRef=useRef(null)
    const [state,setState]=useState(false)

    useEffect(()=>{
        const timer = setTimeout(()=>{
            capture()
            setState(!state)
        },500);
        // return () => clearInterval(timer)
    },[state])

    const videoConstraints={
        width:200,
        height:200,
        facingMode:"environment"
    }

    
    const capture=()=>{
        const imageSrc = webcamRef.current.getScreenshot()
        onScan(imageSrc)
    }

    return(
        <div>
            <Webcam 
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                onClick={()=>capture()}
            />
        </div>
    )
}

const QRScanner = ()=>{
    const [data,setData]=useState(null)
    const [loading,setLoadStatus]=useState(false)

    const handleScan =(imageSrc)=>{
        if(imageSrc){
            const image = new Image()
            image.src=imageSrc
            image.onload =()=>{
                const canvas= document.createElement("canvas")
                canvas.width=image.width
                canvas.height=image.height
                const ctx = canvas.getContext("2d")
                ctx.drawImage(image, 0,0,canvas.width,canvas.height)
                const imageData=ctx.getImageData(0,0,canvas.width,canvas.height)
                const code=jsQR(imageData.data, imageData.width,imageData.height, {})
                if (code && !loading){
                    setLoadStatus(true)
                    var object=JSON.parse(code['data'])
                    const fetchData=async()=>{
                        var url='https://script.google.com/macros/s/AKfycbz0_Ud6pxGQulKWHmsKWnLf7_2FagWI4hveRweOJo4jMwCnI-lzfJxk9-R9mxcFDivfyg/exec'
                        const response=await fetch(`${url}?sid=${object.SID}&scanner=true`)
                        .then(response=>response.json()).then(data=>setData(data))
                        setLoadStatus(false)
                    } 
                    fetchData()
            }
        }
    }
}
    return (
        <div className=''>
            <WebcamCapture onScan={handleScan} />
            {data?<>
                <section id="center">
                        <p className="welcome">
                            {data['Name']}<br/>
                        </p>
                        {data['Zone']>1?<p className="zone">TABLE {data['Zone']>4? "5 OR 6":data['Zone']}</p>:<p className='zone'>Seat is preassigned. Please lead the guest to designated seat.</p>}
                        {data['Role']? <p className="role"><br/>{data['Role']}</p>:<></>}
                </section>
            </>:<></>}
        </div>
    )
}

export default QRScanner