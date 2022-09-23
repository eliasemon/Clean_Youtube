import { useStoreState } from "easy-peasy"
const Message = ()=>{
    const {msgINfo} = useStoreState(state => state.message)
    
    if(msgINfo.message){
        window.alert(msgINfo.message)
    }
     
    return (
    <>
    </>)
}

export default Message