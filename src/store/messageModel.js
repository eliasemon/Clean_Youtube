import {  action } from 'easy-peasy';
const messageModel = {
    msgINfo : {},
    setMsgInfo : action((state , payload) => {
        const {msgINfo} = state
        msgINfo.action = payload.action;
        msgINfo.message = payload.message;
        msgINfo.id = payload.id
        
    }),
    clearMsgInfo : action((state)=>{
        state.msgINfo = {}        
    })
}
export default messageModel