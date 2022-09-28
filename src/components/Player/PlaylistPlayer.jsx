import ReactPlayer from 'react-player'
import { useStoreState ,useStoreActions } from 'easy-peasy';
import { useEffect , useState } from 'react';
import useWindowLength from '../hooks/useWindowLength';
import PLCard from '../card/index';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ContentShower from './ContentShower';

const PlaylistPlayer = ({plId})=>{
    const {plItems} = useStoreState(state => state.playList);
    const {playingIndexAc} = useStoreActions(actions => actions.playList)
    useEffect(()=>{
        setTimeout(() => {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            setFc(true)
        }, 1);
    },[])
    const YTurl = 'https://www.youtube.com/watch?v='
    const PL = plItems[plId];
    const {playingIndex} = PL;
    const items = PL.items;
    const [itemIndex,setItemIndex] = useState(playingIndex)
    const [videoId, setvedioId] = useState(items[playingIndex].videoId)
    const [fc,setFc] = useState('')
    const {windowHeight,windowWidth} = useWindowLength();
    let playerWidth;
    let playerHeight;
    let playerSidebarWidth; 
    let  playerSidebarHeight;
    let cardWidth;
    if(windowWidth >= 900){
        playerWidth = ((windowWidth / 100) * 58)
        playerSidebarWidth = `${((windowWidth / 100) * 28)}px`
        playerHeight = ((playerWidth / 2) * 1.2)
        playerSidebarHeight = `${playerHeight}px`
        cardWidth = `${((windowWidth / 100) * 21)}px` 
    }
    else{
        playerWidth = ((windowWidth / 100) * 90)
        playerSidebarWidth =  `${((windowWidth / 100) * 90)}px`
        playerSidebarHeight = 150
        playerHeight = ((playerWidth / 2) * 1.2)
    }
    if(windowWidth >= 1400){
        cardWidth = `auto` 
    }
    
    const onEndHandeler = ()=>{
        if((items.length)-1 > itemIndex){
            setvedioId(items[itemIndex + 1].videoId)
            playingIndexAc({plId : plId , playingIndex : (itemIndex+1)})
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            setItemIndex(itemIndex+1)
            
        }
        
    }
    const handleVideoState = ({index ,videoId })=>{
        setvedioId(videoId),
        playingIndexAc({plId : plId , playingIndex : index})
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        setItemIndex(index)
    }
    let player
  const onSuccess = ({ ref }) => {
    const videoElement = ref.el().querySelector("video");

    ref.playsinline(true); // 👈 can I set this via the ReactPlayerLoader?
    videoElement.style = { pointerEvents: "none" };

    // preventing listener does not work
    ref.on("fullscreenchange", event => {
      event.preventDefault();
      return false;
    });
    player = ref;
  };
    const playingIndicator = (<div style={{ textAlign: 'center', width : "100%",position : 'absolute' ,top : 0, left : 0, background : 'rgb(0,0,0 , 0.7)'}}>
        <PlayCircleOutlineIcon sx={{color : '#ffff' , fontSize : 125}} />
    </div>)   
    return (
            <div style={{background : '#F9F9F9' ,width : `${(windowWidth / 100) * 90}px` , margin : '0 auto' }}>
                <div style={{display : 'flex', flexWrap : 'wrap'}}>
                    <div id="Player_" style={{height : `${playerHeight}px`, width : `${playerWidth}px`}}>
                            <ReactPlayer
                                playing
                                onSuccess={onSuccess}
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
                    <div style = {{ height : playerSidebarHeight , overflowX : "scroll",background: '#ffff', margin : '0 auto',boxSizing : 'border-box' , width : playerSidebarWidth}}>
                        <ContentShower item = {items[itemIndex]} plItem = {PL} index = {itemIndex} />
                    </div>
                </div>
                <div style={{flexGrow : 1}}>
                     <div style={{display : 'flex',flexWrap : 'wrap' , justifyContent : 'flex-start'}}>
                            {items.map((v)=>{
                                return ( <a  key={v.videoId}  style={{ cursor : 'pointer', boxSizing : "border-box", overflow : 'hidden', width : cardWidth, position : 'relative', textDecoration: 'none', margin : '10px'}} onClick={()=> handleVideoState({index : v.position , videoId : v.videoId})}>
                                        {(v.videoId == videoId) ? playingIndicator : ""}
                                        <PLCard item={v} key={v.videoId}/> 
                                      </a>)
                            })}
                     </div>
                </div>
                
            </div>
    )
}
export default PlaylistPlayer