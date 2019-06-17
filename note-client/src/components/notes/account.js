import React from 'react'

import axios from '../../config/configaxios';
class Account extends React.Component{
    constructor(){
        super()
        this.state={
            user:{}
        }
    }
    componentDidMount(){
        axios.get('/users/account',{
            headers:{
               'x-auth':localStorage.getItem('userAuthToken') 
            }
        })
        .then(response=>{
            console.log(response.data)
            const user=response.data
            this.setState({user})
        })
        .catch(err=>{
            console.log(err)
        })
    }
    render(){
        return(
            <div className="note-container">
                <h1>Account Details</h1>
                <p>User Name:{this.state.user.username}</p>
                <p>Email Id{this.state.user.email}</p>
            </div>
        )
    }
}
export default Account 