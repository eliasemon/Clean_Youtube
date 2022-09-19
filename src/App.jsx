import { useState,useEffect } from 'react'
import './App.css'
import getPlayListStaged from './api/index';
import { useStoreState ,useStoreActions } from 'easy-peasy';
const App = () =>{
  const state = useStoreState(state => state)
  const action = useStoreActions(actions => actions)
 
  useEffect(() =>{
    action.favourite.fvToggle("PL_XxuZqN0xVD0op-QDEgyXFA4fRPChvkl")
  },[])
 
  // console.log(state);
  return (
    <></>
  )
}
export default App
