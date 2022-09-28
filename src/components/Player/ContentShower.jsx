import { useState , useEffect } from "react"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const ContentShower = ({item , plItem , index }) =>{
    const [state , setState] = useState({
        tittle : item.tittle,
        description : item.description,
        opt1 : "contained",
        opt2 : "outlined"
    });
    useEffect(()=>{
        setState((prv)=>{
            prv.tittle = `${index}) ${item.tittle}`
            prv.description = item.description
            prv.opt1 = "contained",
            prv.opt2 = "outlined"
            return {...prv}
        })
    },[item])
    const handleVinfo= ()=>{
        setState((prv)=>{
            prv.tittle = `${index}) ${item.tittle}`
            prv.description = item.description
            prv.opt1 = "contained",
            prv.opt2 = "outlined"
            return {...prv}
        })
    }
    const handlePinfo = ()=>{
        setState((prv)=>{
            prv.tittle = plItem.tittle
            prv.description = plItem.description
            prv.opt1 = "outlined";
            prv.opt2 = "contained";
            return {...prv}
        })
        
    }
    return(
        <>
            <Stack spacing={2} direction="row">
                <Button onClick = {handleVinfo} variant={state.opt1} >Video Information</Button>
                <Button onClick = {handlePinfo} variant={state.opt2}>Playlist Information</Button>
            </Stack>
            <div style={{color : '#36454F'}}>
                <h4 style={{margin : '5px'}}>{state.tittle}</h4>
                <p style={{margin : '5px'}}>Description:</p>
                <p style={{margin : '5px', fontSize : 11 }} >{state.description}</p>
            </div>
        </>
    )
}

export default ContentShower