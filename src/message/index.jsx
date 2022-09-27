import { useStoreState } from "easy-peasy"
import { useEffect, useState } from "react"
const MsgShow = ({text})=>{
    return(
    <div style={{ borderRadius : 20, transition: '2s linear',  display : 'flex' ,margin : '10px', background : '#1976D2' ,padding : '4px' ,color : '#ffff'}}>
        <div style={{ height : "100%" ,background : '#ffff', marginLeft : '20px'}}><h3>a</h3></div>
        <h3 style={{marginRight: '10px' , marginLeft : '20px'}}>Message:    </h3>
        <h4 style={{marginRight: '10px'}}>{text}</h4>
    </div>
    )
}
const Message = ()=>{
    const {msgINfo} = useStoreState(state => state.message)
    const [state , setState] = useState([])

    useEffect(()=>{
        if(msgINfo.message){
            setState(prv => {
                prv.push(msgINfo.message)
                return [...prv] 
            })
            setTimeout(() => {
                setState(prv => {
                    prv.shift()
                    return [...prv] 
                })
            }, 5000);
        }
    },[msgINfo.message])
    
     
    return (
        <div style={{position : 'fixed' ,top : 100 , right : 0, zIndex : 1}}>
             {state.map(v => <MsgShow text = {v} />)}
        </div>)
}

export default Message