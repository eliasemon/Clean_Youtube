import { useState,useEffect , Suspense , lazy  } from 'react'
import { useStoreState ,useStoreActions } from 'easy-peasy';
import Navbar from './components/navbar/index';

import Message from './message/index';
import { Routes, Route } from "react-router-dom";
import CardLoader from './components/cardLoader/index';
const PlaylistAdder =  lazy(() => import('./components/playlistAdder/PlayListAdder'));
import MainPlayer from './components/Player/MainPlayer';

const App = () =>{
  const action = useStoreActions(actions => actions)
  
  useEffect(() =>{
    window.addEventListener('beforeunload', (e)=> {action.playList.setDataToLocalStorage(e) });
    action.playList.getDataFromLocalStorage()
    
  },[])
 
  // console.log(state);
  return (
    <>
      <Message/>
      <Navbar/>
      <PlaylistAdder/>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route path="/" element={<CardLoader/>} />
            <Route path="viewPlaylist/:plId" element={<MainPlayer />} />
        </Routes>
      </Suspense>


    </>
    
  )
}
export default App
