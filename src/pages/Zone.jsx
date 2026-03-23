import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

function Zone(){
    const [zone]= useSearchParams()
    const myZone= zone.get('n')
    const Arrangement=[
        [1,1,1,1],
        [1,1,1,1],
        [1,1,2,1],
        [1,1,2,2],
        [1,2],
        [3,4],
        [3,3,4,4],
        [3,3,4,4],
        [3,3,4,4],
        [3,3,4,4],
        [3,4],
        [5,5],
        [5,5,5,5],
        [5,5,5,5],
        [5,5,5,5],
        [5,5,5,5],
        [5,5]
    ]

    const ShowZone= Arrangement.map((Row)=>{return Row.map((id)=>{return id==myZone})})

    return (
        <> 
            {myZone<2? <><p className="zone">Welcome Guest</p><p className="preas">Your seat is pre-assigned. We will lead you to your seat.</p></>:<><p className="zone">You can be seated at Table {myZone>4? "5 or 6": myZone}</p><p>You can find it in the highlighted seats</p><Seats Arrangement={ShowZone}/></>}
        </>
    )
}

const Seats=({Arrangement})=>{
    const [brightness,setBrightness]= useState(0.2)
    const [direction,setDirection]= useState(true)

    useEffect(()=>{
        setTimeout(()=>{
            if (direction){
                setBrightness(brightness+0.15)
            } else{
                setBrightness(brightness-0.15)
            }
            if (brightness>1){
                setDirection(false)
            } else if (brightness<0.5){
                setDirection(true)
            }
        },100)
    })
    const style ={opacity:brightness}

    return <table width={window.innerWidth*0.8} height={window.innerWidth} >
        <tbody>
            <tr>
                <th rowSpan={'20'}></th>
                <th ></th>
                <th colSpan={"5"} className="screen">Screen</th>
                <th></th>
                <th></th>
            </tr>
            <EmptyRow />
            {Arrangement.map((Row)=>{
                return <>
                    <tr><Table Row={Row} style={style}/></tr>
                </>
            })}
            <tr></tr>
            <tr>
                <th colSpan={"3"}>Entrance</th>
                <th colSpan={"6"} className="screen"></th>
            </tr>
        </tbody>
    </table>
}

const EmptyRow=()=><tr></tr>

const Table=({Row,style})=>{
    return (
        <>
        {Row.map((isSeat)=>
            <>
                {Row.length==2?<th />:<></>}
                <th className={isSeat?"Active seat":"seat"} style={isSeat? style:{opacity:0.2}}></th>
                {Row.length==2?<th />:<></>}
                <th />
            </>
        )}
    </>
    )
}

export default Zone