import React from 'react';
import axios from '../../config/configaxios';

class NotesForm extends React.Component{
    constructor(){
        console.log('form constructor')
        super()
        this.state={
            title:'',
            body:'',
            categories:[],
            category:'',
            selectedTag:[],
            tags:[]
        }
        this.handleTag=this.handleTag.bind(this)
    }
    handleChange=(e)=>{
        e.persist()
        this.setState(()=>({
            [e.target.name]:e.target.value
        }))
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        
        const formData={ 
            title:this.state.title,
            body:this.state.body,
            category:this.state.category,
            tags:this.state.selectedTag.map(tag=>{
                return {tag:tag._id}
            })
           
        }
        this.props.handleSubmit(formData)
    }

    componentDidMount(){
        axios.get(`/categories`)
        .then((response)=>{
            // console.log('i am in cat'+response.data)
         this.setState(()=>({
             categories:response.data
         }))

        })
        axios.get(`/tags`)
        .then((response)=>{
            // console.log("i am a t ag"+response.data)
            this.setState(()=>({
                tags:response.data
            }))
            
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState(()=>({
            title:nextProps.note.title,
            body:nextProps.note.body,
            category:nextProps.note.category._id
            
        }))
    }
    handleTag(tag){
        this.setState((prevState)=>({
            selectedTag:[...prevState.selectedTag,tag]
        }))
    }


    render(){
        console.log('form render')
        return(
            <div class="container-fluid">
            <div class="card-group">
                <div class="card">
            <div class="formgroup">
            <div class="card-text">
             <form onSubmit={this.handleSubmit} >
                   <label className="col-sm-2 col-form-label" >Title</label>
                        <div class="col-sm-10">
                                <input type="text" class="form-control" value={this.state.title} 
                                        onChange={this.handleChange} name="title"/>
                        </div>
                   
                
                 <div class="form-group">
                      <label className="col-sm-2 col-form-label">Body:</label>
                            <div class="col-sm-10">
                                <textarea class="form-control" value={this.state.body}
                                        onChange={this.handleChange}
                                        name="body"></textarea>
                            </div>          
                </div> 
                 <div class="btn-group"></div>           
                        <label className="col-sm-2 col-form-label">Category:</label>
                            <div class="col-sm-10">
                                <select class="custom-select custom-select-sm" value={this.state.category} name="category" onChange={this.handleChange}>
                                    <option value="">select</option>
                                        {this.state.categories.map((category)=>{
                                                return <option key={category._id}
                                            value={category._id}>{category.name}</option>
                                        })}
                                </select>

                            </div>
                            
                  
                  <div>
                 <label><h6 class="card-title">Tags:</h6>
                         <div class="form-check form-check-inline">
                         {this.state.tags.map(tag=>{
                          return<label class="form-check-input" key={tag._id}>{tag.name}<input type="checkbox" 
                          onClick={()=>{this.handleTag(tag)}} /></label>
                          
                             })}
                </div>
                </label></div>

                 <input class="col-lg-12 btn btn-primary mx-auto" type="submit" value="Add"/>
                 
             </form>
             </div>
             </div>
            </div>
            </div>
            </div>
            
        )
    }
}

export default NotesForm