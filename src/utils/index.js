const plIdSpliter = (url)=>{
    url = `=${url}`
    let result = url.split(/[=&]/i).filter(v => v.match(/[PL]/g));
    return result[0];
}



export default {plIdSpliter}