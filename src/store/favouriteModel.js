import {  action  ,thunk } from 'easy-peasy';
import { uuid } from '../utils';
const favouriteModel = {
    fvitem : [],
    fvToggleInternalDelete : action((state , plId)=>{
        state.fvitem = state.fvitem.filter(v => v != plId)
    }),
    fvToggleInternalAdd : action(({fvitem} , plId)=>{
        fvitem.unshift(plId)
    }),

    fvToggle : thunk((actions, {plId , plItemDelete} , { getStoreActions , getStoreState})=>{
        const state = getStoreState()
        const {message ,playList } = getStoreActions()
        const {favourite} = state
        if(plItemDelete){
            actions.fvToggleInternalDelete(plId)
            return {...state}
        }
        if( favourite.fvitem.length == 3) {
            const payload = {
                action : "Favourite quota Over",
                message : "You can add only 3 items on favourite list , Remove one and try again"
                ,id : uuid()
            }
            message.setMsgInfo(payload)
            return {...state}
        }
        const index =  favourite.fvitem.indexOf(plId)
        if(index == -1) {
            actions.fvToggleInternalAdd(plId)
            playList.favouriteTgChanger({plId : plId , data : true})
            const payload = {
                action : "Added To Favourite",
                message : "The Item is Added To your favourite list",
                id : uuid()
            }
            message.setMsgInfo(payload)
            return {...state}
        }
        actions.fvToggleInternalDelete(plId)
        playList.favouriteTgChanger({plId : plId , data : false})
        const payload = {
            action : "Removed From Favourite",
            message : "The Item is Removed From your Favourite list",
            id : uuid()
        }
        message.setMsgInfo(payload)
    } )
} 
export default favouriteModel