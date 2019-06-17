import React from 'react'
import axios from '../../config/configaxios';
import css from './Form.css'
class Register extends React.Component{
    constructor(){
        super()
        this.state={
            username:'',
            email:'',
            password:''
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleForm=this.handleForm.bind(this)
    }
    handleChange(e){
        e.persist()
        this.setState(()=>({
            [e.target.name]:e.target.value
        }))
    }
    handleForm(e){
        e.preventDefault()
        const formData={
            username:this.state.username,
            email:this.state.email,
            password:this.state.password
        }
        console.log(formData)
        axios.post(`/users/register`,formData)
             .then(response=>{
                 console.log(response.data)
                 if(response.data.errors){
                     alert(response.data.message)
                 }
                 console.log(this.props)
                 this.props.history.push('/users/login')

             })
    }
     render(){
        return(
            <div className="container-fluid">
                 <div className="row justify-content-center">
                     <div className="col-12 col-sm-6 ">                         
                          <form onSubmit={this.handleForm} className="form-container">
                             <h4>Register</h4>
                                 <div className="form-group row justify-content-center">
                                     <label className="col-sm-2 col-form-label">Username:</label>                        
                                        <div class="col-sm-10">
                                            <input class="form-control" type="text" onChange={this.handleChange} name="username" value={this.state.value}/>
                                        </div>
                                        <br/><br/>                        
                                    <label className="col-sm-2 col-form-label">Email: </label>                        
                                         <div class="col-sm-10">
                                             <input class="form-control" type="text" onChange={this.handleChange} name='email' value={this.state.value}/> 
                                        </div><br/><br/>                       
                                     <label className="col-sm-2 col-form-label">Password:</label>                        
                                            <div class="col-sm-10">
                                                <input class="form-control" type="text" onChange={this.handleChange} name='password' value={this.state.value}/>
                                             </div>  
                                            <br/><br/>        
                                    <input type="submit" class="col-sm-4 btn btn-primary btn-block"/> 
                      
                        </div>
                        
                </form>
            </div>
        </div>
        </div>
        )
    }
}
export default Register