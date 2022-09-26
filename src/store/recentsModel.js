import { action,thunk  } from 'easy-peasy';

const recentsModel = {
    rcItem : [],
    updateRcItems : thunk((actions , payload , {getStoreState})=>{
        const {recents} = getStoreState();
        let index = recents.rcItem.indexOf(payload);
        if(index == -1){
            recents.rcItem.unshift(payload)    
        }else{
            recents.rcItem.splice(index, 1);
            recents.rcItem.unshift(payload);
        }
        if(recents.rcItem.length > 3){
            recents.rcItem =  recents.rcItem.slice(0,3)
        }
    }),
    removeFromRcItem : action((state,payload)=>{
        state.rcItem =  state.rcItem.filter(id => id != payload)
    })
} 

export default recentsModel