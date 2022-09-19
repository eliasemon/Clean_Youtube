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
        if(data.items.length == 0 ){
            //if playlist id is incorrect!!!
            returnData.succeed = false;
        }else{
            const vSorter =  data.items[0].snippet 
                returnData.result = {
                plId : playlistId,
                tittle : vSorter.title,
                channelId :vSorter.channelId,
                description : vSorter.description,
                channelTitle : vSorter.channelTitle,
                description : vSorter.description,
                thumbnails  : vSorter.thumbnails.medium,
                items :  (await getPlayList(playlistId)).map(v => v.snippet)
            }
            returnData.succeed = true;
        }
    } catch (error) {
        returnData.succeed = false;
        returnData.status = 400;
        returnData.error = error;
    }
    return returnData;
}


export default getPlayListStaged;