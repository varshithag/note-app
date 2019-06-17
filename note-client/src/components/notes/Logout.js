import React from 'react'
import axios from '../../config/configaxios';
class Logout extends React.Component{
    componentDidMount(){
        axios.delete('/users/logout',{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }})
            .then(response=>{
                console.log(response.data)
                localStorage.removeItem('userAuthToken')
                this.props.handleAuth(false)
                this.props.history.push('/users/login')
            })
    }
   render(){
       return(
            <p>Logingout....</p>
       )
   } 
}
export default Logout