import { useState,useEffect } from 'react'
import { useStoreState ,useStoreActions } from 'easy-peasy';
import Navbar from './components/navbar/index';
import PlaylistAdder from './components/playlistAdder/PlayListAdder';
import Message from './message/index';
import PLCard from './components/card/index';
const App = () =>{
  const {plIdsArray} = useStoreState(state => state.playList)
  const action = useStoreActions(actions => actions)
 
  useEffect(() =>{
    window.addEventListener('beforeunload', (e)=> {action.playList.setDataToLocalStorage(e) });
    action.playList.getDataFromLocalStorage()
    // action.playList.collectDatafromYTApi("PL_XxuZqN0xVD0op-QDEgyXFA4fRPChvkl")
    
  },[])
 
  // console.log(state);
  return (
    <>
      <Message/>
      <Navbar/>
      <PlaylistAdder/>

      {plIdsArray.map(id => ( <PLCard plId = {id} />))}
     

    </>
    
  )
}
export default App
