import { createStore , persist , action} from 'easy-peasy';
import playListModel from './playListModel';
import messageModel from './messageModel';
import recentsModel from './recentsModel';
import favouriteModel from './favouriteModel';
const loadingStateModel = {
    state : true,
    changeState : action((state , payload)=>{
        state.state = payload
    })
}
const store = createStore({
     playList : persist(playListModel),
     message : messageModel,
     recents : persist(recentsModel),
     favourite : persist(favouriteModel),

    loadingState : loadingStateModel,
    //playList : playListModel,
    //message : messageModel,
    //recents : recentsModel,
    //favourite : favouriteModel
})
export default store
