import { useEffect ,useState } from "react"
const useWindowLength = () =>{
    const [state , setState] = useState({windowHeight : '' ,windowWidth : ''})

    useEffect(()=>{
       state.windowHeight = window.innerHeight;
       state.windowWidth = window.innerWidth;
        window.addEventListener('resize' , ()=>{
            setState({
                windowHeight : window.innerHeight,
                windowWidth : window.innerWidth
            })
        })
    },[])

    return {windowHeight : state.windowHeight, windowWidth : state.windowWidth}
}

export default useWindowLength