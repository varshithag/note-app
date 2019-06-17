import React from 'react'
import axios from '../../config/configaxios';
import {Link} from 'react-router-dom'

class NotesList extends React.Component{
    constructor(){
        super()
        this.state={
            notes:[]
        }
        this.handlePin=this.handlePin.bind(this)
        this.handleDelete=this.handleDelete.bind(this)
    }

    componentDidMount(){
        axios.get(`/notes`,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
        .then(response=>{
            console.log(response.data)
            this.setState(()=>({
                notes:response.data
            }))
        })
    }
    handlePin(note){
       note.isPinned= !note.isPinned
        console.log(note)
      axios.put(`/notes/${note._id}`,note,{
        headers:{
            'x-auth':localStorage.getItem('userAuthToken')
        }
      })
      .then(response=>{
          if(response.data.hasOwnProperty('error')){
              console.log(response.data.errors)
          }else{
               this.props.history.push(`/notes`)
          }
      }) 
    }
    handleDelete(note){
      console.log(note)
      const confirmRemove=window.confirm('are you sure?')
      if(confirmRemove){
        axios.delete(`/notes/${note._id}`,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        }) 
        .then(()=>{
            this.setState((prevState)=>({
                notes:prevState.notes.filter(noteItem=>{
                    return noteItem._id!==note._id
                })
            }))
        })
      }
    }
       
    
    render(){
        return(
            <div className="note-container">
                <h2>Listing Notes:{this.state.notes.length}</h2>
                <ul className="list-group" >
                    {this.state.notes.map(note=>{
                        if(note.isPinned===false){
                        return <li className="list-group-item" key={note._id}><Link to={`/notes/${note._id}`}>{note.title}</Link>
                          <button  onClick={()=>{
                            this.handlePin(note)}}>
                                pin </button>
                                <button onClick={()=>{
                                this.handleDelete(note)}}>X</button></li>}})}</ul>
                <p>Others</p>
                <ul className="list-group">
                    {this.state.notes.map(note=>{
                    if(note.isPinned===true){
                        return <li className="list-group-item" key={note._id}><Link to={`/notes/${note._id}`}>{note.title}</Link>
                        <button onClick={()=>{
                            this.handlePin(note)}}>Unpinn</button><button type="button" onClick={()=>{
                                this.handleDelete(note)}}>X</button></li>
                        }
                    })}</ul>
              
                <Link to="/notes/new" className="navbar-brand">add List</Link>
            </div>
           
        )

    }
}
export default NotesList