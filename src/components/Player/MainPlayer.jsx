import { useParams } from 'react-router-dom';
import { useStoreState ,useStoreActions } from 'easy-peasy';
import PlaylistPlayer from './PlaylistPlayer';
import { useState , useEffect } from 'react';
const MainPlayer = () =>{
    const {plId} = useParams();
    const {plItems} = useStoreState(state => state.playList);
    const {loadingState} = useStoreState(state => state);
    const [state ,setState] = useState(false)
    const {collectDatafromYTApi} = useStoreActions(actions => actions.playList)
    useEffect(()=>{
        if(loadingState.state == false){
            if(!plItems[plId]){
                setState(false)
                collectDatafromYTApi(plId)
            }else{
                setState(true)
            }
        }else{
            setState(false)
        }
        
    },[loadingState.state])
    

    return(
        <>
            {state ? <PlaylistPlayer plId={plId} /> : "" }
        </>
    )
}
export default MainPlayer