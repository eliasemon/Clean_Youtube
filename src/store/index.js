import { createStore} from 'easy-peasy';
import playListModel from './playListModel';
import messageModel from './messageModel';
import recentsModel from './recentsModel';
import favouriteModel from './favouriteModel';
const store = createStore({
    playList : playListModel,
    message : messageModel,
    recents : recentsModel,
    favourite : favouriteModel
})
export default store