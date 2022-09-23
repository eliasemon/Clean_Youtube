import { createStore , persist} from 'easy-peasy';
import playListModel from './playListModel';
import messageModel from './messageModel';
import recentsModel from './recentsModel';
import favouriteModel from './favouriteModel';
const store = createStore({
    // playList : persist(playListModel),
    // message : messageModel,
    // recents : persist(recentsModel),
    // favourite : persist(favouriteModel)

    playList : playListModel,
    message : messageModel,
    recents : recentsModel,
    favourite : favouriteModel
})
export default store