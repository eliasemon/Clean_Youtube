import { action ,thunk} from 'easy-peasy';
import getPlayListStaged from '../api/index';
import { uuid } from '../utils';

const localStorageKey = "Clean_Youtube_"
const playListModel = {
    plItems : {},
    plIdsArray : [],

    // actions 
    playingIndexAc : thunk((actions,{plId , playingIndex} , {getStoreState})=>{
       const {playList} = getStoreState()
       playList.plItems[plId].playingIndex = playingIndex;
    }),
    addDataToPlITem : action(({plItems,plIdsArray} , data)=>{
        plItems[data.plId] = data;
        plIdsArray.unshift(data.plId)
    }),
    stateFrocedReload : action((state)=>{
        state.plIdsArray = [... state.plIdsArray]
    }),
    deleteData : action(( state , plId)=>{
        state.plIdsArray = state.plIdsArray.filter(v => v != plId)
        delete state.plItems[plId];
    }),
    favouriteTgChanger : action(( state , payload)=>{
        const {plId , data} = payload
        state.plItems[plId].favourite = data;
    }),
    // thunk  
    getDataFromLocalStorage : thunk(async(actions, payload , {getStoreState , getStoreActions})=>{
        const state = getStoreState()
        const {loadingState} = getStoreActions()
        await loadingState.changeState(true);
        const data = localStorage.getItem(localStorageKey);
        if(data == null){
            await loadingState.changeState(false)
            return {...state}
        }
        const dataState = JSON.parse(data)
        state.playList = dataState.playList
        state.favourite = dataState.favourite
        state.recents = dataState.recents
        await actions.stateFrocedReload()

        await loadingState.changeState(false);
        return {...state}
    }), 
    setDataToLocalStorage : thunk((actions, e , {getStoreState})=>{
        e.preventDefault();
        const state = getStoreState()
        localStorage.setItem(localStorageKey, JSON.stringify(state));
    }),
    collectDatafromYTApi : thunk(async (actions, plId , { getStoreActions , getStoreState}) => {
        const state = getStoreState()
        const {playList} = state
        const {message , recents , loadingState ,playList : playListAction} = getStoreActions()
        await loadingState.changeState(true);
        if(plId == undefined){
            const payload = {
                action : "Worng Playlist Key",
                message : "You Have Provided Worng PlayList Key , Try To place Correct Playlist key"
                ,id : uuid()
            }
           await loadingState.changeState(false);
            message.setMsgInfo(payload)
            return {...state}
            
        }
        // if the playlist is alrady in the state 
        if(playList.plItems[plId]){
            const payload = {
                action : "Already added",
                message : "You Have already added this Playlist",
                id : uuid()
            }
           await loadingState.changeState(false);
            message.setMsgInfo(payload)
            return {...state}
        }
        if(Object.keys(state.playList.plItems).length >= 10){
            const payload = {
                action : "Wanna be remove One",
                message : "You Have limited 10 quota of Playlist item , Please Remove One and add"
                ,id : uuid()
            }
            await loadingState.changeState(false);
            message.setMsgInfo(payload)
            return {...state}
        }
        const data = await getPlayListStaged(plId);
        
        if(!data.succeed){
            const payload = {
                action : "Worng Playlist Key",
                message : "You Have Provided Worng PlayList Key , Try To place Correct Playlist key"
                ,id : uuid()
            }
            await loadingState.changeState(false);
            message.setMsgInfo(payload)
            return {...state}
        }
        await playListAction.addDataToPlITem(data.result);
        await loadingState.changeState(false);
        const payload = {
            action : "Succeed",
            message : "PlayList Added",
            id : uuid()
        }
        message.setMsgInfo(payload)
        return {...state}
    }),

    removeItemFromPlItems : thunk((actions, plId , { getStoreActions , getStoreState})=>{
        const state = getStoreState()
        const {playList} = state
        const {message , recents ,favourite , playList : playListAction} = getStoreActions()

        playListAction.deleteData(plId)
        favourite.fvToggle({plId : plId , plItemDelete : true})
        recents.removeFromRcItem(plId)
        const payload = {
            action : "Deleted",
            message : "You Have Deleted The Playlist",
            id : uuid()
        }
        message.setMsgInfo(payload)
        return {...state}
    }),
}

export default playListModel