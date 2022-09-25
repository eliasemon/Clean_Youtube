import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import ReactPlayer from 'react-player'
import { useStoreState ,useStoreActions } from 'easy-peasy';
import { useEffect , useState } from 'react';
import useWindowLength from '../hooks/useWindowLength';
import PLCard from '../card/index';
import { useParams } from 'react-router-dom';

const PlaylistPlayer = ()=>{
    const {plId} = useParams()
    const {plItems} = useStoreState(state => state.playList);
    const {collectDatafromYTApi} = useStoreActions(actions => actions.playList)
    useEffect(()=>{
        if(!plItems[plId]){
            collectDatafromYTApi(plId)
        }
        setTimeout(() => {
            setFc(true)
        }, 1);
    },[])
    const YTurl = 'https://www.youtube.com/watch?v='
    const PL = plItems[plId];
    const items = PL.items;
    const [videoId, setvedioId] = useState(items[0].videoId)
    const [itemIndex,setItemIndex] = useState(0)
    const [fc,setFc] = useState('')
    const {windowHeight,windowWidth} = useWindowLength();
    let playerWidth;
    if(windowWidth >= 900){
        playerWidth = ((windowWidth / 100) * 58)
    }
    else{
        playerWidth = ((windowWidth / 100) * 90)
    }
    let playerHeight = ((playerWidth / 2) * 1.2)
    const onEndHandeler = ()=>{
        if((items.length)-1 > itemIndex){
            setvedioId(items[itemIndex + 1].videoId)
            setItemIndex(itemIndex+1)
           
        }
        
    }
    const handleVideoState = ({index ,videoId })=>{
        setvedioId(videoId),
        setItemIndex(index)
    }    
    return (
            <div style={{background : '#F9F9F9' ,width : `${(windowWidth / 100) * 90}px` , margin : '0 auto' }}>
                <div>
                    <div id="Player_" style={{height : `${playerHeight}px`, width : `${playerWidth}px`}}>
                            <ReactPlayer
                                playing
                                onEnded= {onEndHandeler}
                                config={{
                                    youtube: {
                                        playerVars: { 
                                            rel : 0,
                                            autoplay : 1,
                                            modestbranding : 1,
                                            
                                        },
                                    },
                                }}
                                width = "100%"
                                height= "100%"
                                controls = {true}
                                pip = {true}
                                url={`${YTurl}${videoId}`} 
                            />
                    </div>
                </div>
                <div style={{flexGrow : 1}}>
                     <div style={{display : 'flex',flexWrap : 'wrap' , justifyContent : 'flex-start'}}>
                            {items.map((v)=>{
                                return ( <a href='#Player_' style={{ textDecoration: 'none', margin : '10px'}} onClick={()=> handleVideoState({index : v.position , videoId : v.videoId})}><PLCard item={v} key={v.videoId}/> </a>)
                            })}
                     </div>
                </div>
                
            </div>
    )
}
export default PlaylistPlayer