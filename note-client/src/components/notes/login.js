
import React from 'react'
import axios from '../../config/configaxios';
import css from './Form.css'

class Login extends React.Component{
    constructor(){
        super()
        this.state={
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
            email:this.state.email,
            password:this.state.password
        }
        console.log(formData)
        axios.post('/users/login',formData)
            .then(response=>{
                if(response.data.errors){
                    alert(response.data.errors)
                }
                else{
                    console.log(response.data)
                    const token=response.data.token
                    this.props.handleAuth(true)
                    localStorage.setItem('userAuthToken',token)
                    this.props.history.push('/users/account')
                }
                
            })
    }
    render(){
        return(
                <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-12 col-sm-6 ">                       
                            {/* <div className="clo-lg-4 col-offset-4"> */}
                                 <form onSubmit={this.handleForm} className="form-container">
                                 <h4>Login</h4>
                                         <div className="form-group row justify-content-center">
                                             
                                                <label className="col-sm-2 col-form-label"> Email: </label>
                                                        <div class="col-sm-10">
                                                        <input class="form-control" placeholder="enter your email" type="text" name="email" onChange={this.handleChange}/> 
                                                        </div>                               
                                                        <br/>  <br/>  
                                                <label className="col-sm-2 col-form-label"> Password: </label>
                                                    <div class="col-sm-10">
                                                            <input class="form-control" type="password" placeholder="enter password"name="password" onChange={this.handleChange}/>  
                                                    </div>   
                                                    <br/>  <br/>  
                                                <input type="submit" class="col-sm-4 btn btn-primary btn-block mx-auto" value="Login"/>   
                                                
                                            </div>                
                                 </form>  
                                 </div>
                             </div>
                         </div>
                         
          
                
            
        )
    }
}
export default Login