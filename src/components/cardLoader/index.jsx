
import { useStoreState } from 'easy-peasy';
import PLCard from '../card/index';
import useWindowLength from '../hooks/useWindowLength';
import { useState , useEffect } from 'react';
import logo from './NtFound.gif'
import { height } from '@mui/system';


const CardLoader = () =>{
    const {  playList , favourite , recents} = useStoreState(state => state)
    const {plItems , plIdsArray} = playList
    const {fvitem} = favourite;
    const {rcItem} = recents
    const {windowHeight,windowWidth} = useWindowLength();
    const containerWidth = `${(windowWidth / 100) * 90}px`
    const favouriteUi = (<><h4 style={{margin : 5 }}>Favourites: </h4> <div style = {{display : 'flex' , flexWrap : 'wrap' , gap : "20px"}}> {fvitem.map(id => ( <PLCard key = {id} plId = {id} item = {plItems[id]} type = "playList" />))}</div></>)
    const recentsUi = (<><h4 style={{marginBottom : 5 , marginTop : 30 }}>Recents Activity: </h4> <div style = {{display : 'flex' , flexWrap : 'wrap', gap : "20px"}}> {rcItem.map(id => ( <PLCard key = {id} plId = {id} item = {plItems[id]} type = "playList" />))}</div></>)
    const allPlUi = (<><h4 style={{marginBottom : 5 ,  marginTop : 30 }}>All Playlist: </h4> <div style = {{display : 'flex' , flexWrap : 'wrap', gap : "20px"}}> {plIdsArray.map(id => ( <PLCard key = {id} plId = {id} item = {plItems[id]} type = "playList" />))}</div></>)
    const NtUi = (<div style = {{width : '100%' , height : '89vh' , display : 'flex' , justifyContent : 'center' ,alignItems : 'center'}}><img style={{margin : '0 auto' }} src={logo} alt="Nothing Found" /></div>)
    const [fc,setFc] = useState('')
    useEffect(()=>{
        setTimeout(() => {
            setFc(true)
        }, 1);
    },[])
    return (
    <>
        <div style={{width : containerWidth, margin : '0 auto'}}>
            {(fvitem.length > 0) ? favouriteUi : ""}
            {(rcItem.length > 0) ? recentsUi : ""}
            {(plIdsArray.length > 0) ? allPlUi : NtUi}
        </div>
    </>
    )
}

export default CardLoader