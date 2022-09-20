import { useState,useEffect } from 'react'
import './App.css'
import getPlayListStaged from './api/index';
import { useStoreState ,useStoreActions } from 'easy-peasy';
const App = () =>{
  const state = useStoreState(state => state)
  const action = useStoreActions(actions => actions)
 
  useEffect(() =>{
    window.addEventListener('beforeunload', (e)=> {action.playList.setDataToLocalStorage(e) });
    action.playList.getDataFromLocalStorage()
    // action.playList.collectDatafromYTApi("PL_XxuZqN0xVD0op-QDEgyXFA4fRPChvkl")
    
  },[])
 
  // console.log(state);
  return (
    <>
    <button onClick={() => action.favourite.fvToggle( {plId :"PL_XxuZqN0xVD0op-QDEgyXFA4fRPChvkl" , plItemDelete : false  })}> Add to favourite</button>
    <button onClick={() => action.playList.collectDatafromYTApi("PL_XxuZqN0xVD0op-QDEgyXFA4fRPChvkl")}> Add Playlist</button>
    <button onClick={() => action.playList.removeItemFromPlItems("PL_XxuZqN0xVD0op-QDEgyXFA4fRPChvkl")}> Click Me for delete item</button>
    </>
    
  )
}
export default App
