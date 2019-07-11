import React from 'react'
import axios from '../../config/configaxios';
import NotesForm from './Forms'
 
class NotesNew extends React.Component{
    constructor(){
        super()
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleSubmit(formData){
        console.log('i am in handelsubmit'+formData)
        axios.post('/notes',formData,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken') 
             }
        })
        .then(response=>{
            
            console.log("i am in response"+response.data )
            if(response.data.hasOwnProperty('errors')){
                console.log(response.data.errors)
            }else{
                //change to another component
                this.props.history.push(`/contacts`)
            }
        })
    }
    // ${response.data._id}
    render(){
        return(
            <div>
                <h2>Add New Notes</h2>
                <NotesForm handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

export default NotesNew