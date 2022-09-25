
import { useStoreState } from 'easy-peasy';
import PLCard from '../card/index';

const CardLoader = ({heading , idsArray}) =>{
    const { plItems} = useStoreState(state => state.playList)
    return (
    <>
        {idsArray.map(id => ( <PLCard key = {id} plId = {id} item = {plItems[id]} type = "playList" />))}
    </>
    )
}

export default CardLoader