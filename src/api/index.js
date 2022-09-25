import axios from "axios";

const key = import.meta.env.VITE_API_KEY;
const getPlayList =  async(playlistId,pageToken = "", result = []) =>{
    
    const URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails,snippet ,status,id&key=${key}&playlistId=${playlistId}&pageToken=${pageToken}&maxResults=50`
    let { data } = await axios.get(URL);
    result = [...result , ...data.items];
    return result = data.nextPageToken ? getPlayList(playlistId,data.nextPageToken, result) : result;
    
}

const getPlayListStaged = async (playlistId , result = {})=>{

    const returnData = {}
    try {
        const URL = `https://www.googleapis.com/youtube/v3/playlists?part=contentDetails,snippet,status,id&key=${key}&id=${playlistId}`
        let {data , status} = await axios.get(URL);
        returnData.status = status
        if(data.items.length == 0  || status == '404'){
            //if playlist id is incorrect!!!
            console.log("happend")
            returnData.succeed = false;
        }else{
            const vSorter =  data?.items[0]?.snippet 
                returnData.result = {
                plId : playlistId,
                tittle : vSorter?.title,
                channelId :vSorter?.channelId,
                description : vSorter?.description,
                channelTitle : vSorter?.channelTitle,
                description : vSorter?.description,
                thumbnails  : vSorter?.thumbnails?.medium?.url,
                favourite : false,
                items :  (await getPlayList(playlistId)).map((v) => {
                    return {
                        tittle : v?.snippet?.title,
                        description : v?.snippet?.description,
                        thumbnails  : v?.snippet?.thumbnails?.medium?.url,
                        channelTitle : v?.snippet?.videoOwnerChannelTitle,
                        position : v?.snippet?.position,
                        videoId : v?.snippet?.resourceId?.videoId
                    }
                })
            }
            returnData.succeed = true;
        }
    } catch (error) {
        console.log(error)
        returnData.succeed = false;
        returnData.status = 400;
        returnData.error = error;
    }
    return returnData;
}


export default getPlayListStaged;