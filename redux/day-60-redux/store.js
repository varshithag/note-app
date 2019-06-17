const {createStore}=require('redux')
const countReducer=(state={count:0},action)=>{
    switch(action.type){
        case 'INCREMENT':{
            return{
                count:state.count+1
            }
        }
        case 'DECREMENT':{
            return{
                count:state.count-1
            }
        }
        case 'RESET':{
            return{
                count:0
            }
        }
        case 'INCREMENT_BY':{
            return{
                count:state.count+action.payload
            }
        }
        case 'DECREMENT_BY':{
            return{
                count:state.count-action.payload
            }
        }
        default : return{...state}
    }
}
const store=createStore(countReducer)
store.subscribe(()=>{
    console.log(store.getState())
})

const increment=()=>{
    return {type:'INCREMENT'}
}
const decrement=()=>{
    return {type:'DECREMENT'}
}
const reset=()=>{
    return {type:'RESET'}
}
const increment_by=(value)=>{
    return {type:'INCREMENT_BY',payload:value}
}
const decrement_by=()=>{
    return {type:'DECREMENT_BY',payload:5}
}

store.dispatch(increment())
store.dispatch(decrement())
store.dispatch(increment_by(10))

store.dispatch(decrement_by())
store.dispatch(reset())



