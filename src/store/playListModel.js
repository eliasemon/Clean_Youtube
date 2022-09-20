import { action ,thunk} from 'easy-peasy';
import getPlayListStaged from '../api/index';

const localStorageKey = "Clean_Youtube_"
const playListModel = {
    plItems : {a: 10, b: 20},
    plIdsArray : [],
    // actions 
    getDataFromLocalStorage : thunk((actions, payload , {getStoreState})=>{
        const state = getStoreState()
       
        const data = localStorage.getItem(localStorageKey);
        if(data == null){
            return {...state}
        }
        const dataState = JSON.parse(data)
        console.log(data.favourite)
        state.playList = dataState.playList
        state.favourite = dataState.favourite
        state.recents = dataState.recents
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
        const {message , recents} = getStoreActions()
        // if the playlist is alrady in the state 
        if(playList.plItems[plId]){
            const payload = {
                action : "Already added",
                message : "You Have already added this Playlist"
            }
            message.setMsgInfo(payload)
            return {...state}
        }
        if(Object.keys(state.playList.plItems).length >= 10){
            const payload = {
                action : "Wanna remove One",
                message : "You Have limited 10 quota of Playlist item , Wanna Remove Random One To Add This"
            }
            message.setMsgInfo(payload)
            return {...state}
        }
        const data = await getPlayListStaged(plId);
        
        if(!data.succeed){
            const payload = {
                action : "Worng Playlist Key",
                message : "You Have Provided Worng PlayList Key , Try To place Correct Playlist key"
            }
            message.setMsgInfo(payload)
            return {...state}
        }
        playList.plItems[plId] = data.result;
        playList.plIdsArray.unshift(plId)
        recents.updateRcItems(playList.plIdsArray.slice(0,3))
        const payload = {
            action : "Succeed",
            message : "PlayList Added"
        }
        message.setMsgInfo(payload)
        return {...state}
    }),

    removeItemFromPlItems : thunk((actions, plId , { getStoreActions , getStoreState})=>{
        const state = getStoreState()
        const {playList} = state
        const {message , recents ,favourite} = getStoreActions()
        
        delete playList.plItems[plId]
        playList.plIdsArray = playList.plIdsArray.filter(v => v != plId)
        recents.updateRcItems(playList.plIdsArray.slice(0,3))
        favourite.fvToggle({plId : plId , plItemDelete : true})
        const payload = {
            action : "Deleted",
            message : "You Have Deleted The Playlist"
        }
        message.setMsgInfo(payload)
        return {...state}
    }),
}

export default playListModel