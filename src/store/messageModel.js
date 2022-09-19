import {  action } from 'easy-peasy';
const messageModel = {
    msgINfo : {},
    setMsgInfo : action(({msgINfo} , payload) => {
        msgINfo.action = payload.action;
        msgINfo.message = payload.message;
    }),
    clearMsgInfo : action((state)=>{
        state.msgINfo = {}        
    })
}
export default messageModel