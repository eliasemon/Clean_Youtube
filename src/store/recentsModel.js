import { action,  } from 'easy-peasy';

const recentsModel = {
    rcItem : [],
    updateRcItems : action((state , payload)=>{
        state.rcItem = payload
    })
} 

export default recentsModel