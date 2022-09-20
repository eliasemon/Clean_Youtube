import {  action  ,thunk } from 'easy-peasy';
const favouriteModel = {
    fvitem : [],
    fvToggle : thunk((actions, {plId , plItemDelete} , { getStoreActions , getStoreState})=>{
        const state = getStoreState()
        const {message} = getStoreActions()
        const {favourite ,playList} = state
        if(plItemDelete){
            favourite.fvitem = favourite.fvitem.filter(v => v != plId)
            return {...state}
        }
        if( favourite.fvitem.length == 3) {
            const payload = {
                action : "Favourite quota Over",
                message : "You can add only 3 items on favourite list , Remove one and try again"
            }
            message.setMsgInfo(payload)
            return {...state}
        }
        const index =  favourite.fvitem.indexOf(plId)
        if(index == -1) {
            favourite.fvitem.unshift(plId);
            playList.plItems[plId].favourite = true;
            const payload = {
                action : "Added To Favourite",
                message : "The Item is Added To your favourite list"
            }
            message.setMsgInfo(payload)
            return {...state}
        }
        favourite.fvitem.splice(index, 1);
        playList.plItems[plId].favourite = false;
        const payload = {
            action : "Removed From Favourite",
            message : "The Item is Removed From your Favourite list"
        }
        message.setMsgInfo(payload)
    } )
} 
export default favouriteModel