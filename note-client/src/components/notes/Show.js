import React from 'react'
import axios from '../../config/configaxios';
import {Link} from 'react-router-dom'

class NotesShow extends React.Component{
    constructor(props){
        super(props)
        this.state={
            note:{}

        }
    }
    componentDidMount(){
        const id=this.props.match.params.id
        axios.get(`/notes/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
          })
        .then(response=>{  
            console.log(response.data)
            this.setState(()=>({
                note:response.data
            }))
        })
    }
    handleRemove=()=>{
        const id=this.props.match.params.id
        const confirmRemove=window.confirm('are you sure?')
        if(confirmRemove){
            axios.delete(`/notes/${id}`,{
                headers:{
                    'x-auth':localStorage.getItem('userAuthToken')
                }
              })
            .then(()=>{
               this.props.history.push('/notes')
            })
        }
    }
    
handleRemoveTag=(tag)=>{
    const id=this.props.match.params.id
    const confirmRemove=window.confirm('are you sure?')
    if(confirmRemove){
        axios.delete(`/notes/removeTag?noteId=${id}&tagId=${tag._id}`,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
          })
        .then(response=>{
            this.setState(()=>({
                note:response.data
            })      )
        })
        
    }        
}
    handleCopy=()=>{
        // const id=this.props.match.params.id
        // const formData={
        //     title:this
        // }
        // console.log(formData)
        //  axios.post(`http://localhost:3005/notes`,formData)
        //     .then(()=>{
        //        this.props.history.push('/notes')
        //     })
        const formData={ 
            title:this.state.note.title,
            body:this.state.note.body,
            category:this.state.note.category,
            tags:this.state.note.tags
        }
        console.log(formData)
        axios.post(`/notes`,formData,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
          })
            .then(()=>{
               this.props.history.push('/notes')
            })
    }
    
    render(){
        console.log(this.state.note)
         
        return(
            <div className="container">
            <div className="note-container">
               <h5>Title:{this.state.note.title}</h5>
               <p>Body:{this.state.note.body}</p> 
               <p>Category:{this.state.note.category && this.state.note.category.name}</p>
               <h5>tags:</h5>
               {this.state.note.tags && (
                   <ul>
                       {this.state.note.tags.map(tagItem=>{
                           console.log("i am a tagitem"+tagItem.tag.name)
                           return <li key={tagItem._id}>{tagItem.tag.name}<button onClick={()=>{
                               this.handleRemoveTag(tagItem.tag)
                           }}>X</button></li>
                       })}
                    </ul>)}
                <button onClick={this.handleCopy}>Make a Copy</button>       
               <Link to="/notes">back</Link>
               <Link to={`/notes/edit/${this.props.match.params.id}`}>Edit</Link>

               <button onClick={this.handleRemove}><i className="glyphicon glyphicon-trash">Delete</i> </button>
            </div>
            </div>
        ) 
    } 

}
export default NotesShow
