import { useState,useEffect } from 'react'
import './App.css'
import getPlayListStaged from './api/index';
import { useStoreState ,useStoreActions } from 'easy-peasy';
const App = () =>{
  const state = useStoreState(state => state)
  const action = useStoreActions(actions => actions)
 
  useEffect(() =>{
    action.playList.collectDatafromYTApi("PL_XxuZqN0xVD0op-QDEgyXFA4fRPChvkl")
  },[])
 
  // console.log(state);
  return (
    <>
    <button onClick={() => action.favourite.fvToggle( {plId :"PL_XxuZqN0xVD0op-QDEgyXFA4fRPChvkl" , plItemDelete : false  })}> Click Me</button></>
  )
}
export default App
