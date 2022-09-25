export default function  plIdSpliter  (url){
    url = `=${url}&`
    let result = url.split(/[=&]/i).filter(v => v.slice(0,2) === "PL");
    return result[0];
}
// console.log(plIdSpliter('https://www.youtube.com/watch?v=6NksUf0xg9k&list=PLlsFBiAlYissasRTVyTZfSIHQ47sHLquh'))
export const uuid = () => {
    return 'xx-xxx'.replace(/x/g, () =>{
        return (Math.random() * 16 | 0).toString(16)
    })
}