import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route,Link} from 'react-router-dom'
import NotesList from'./components/notes/List'
import NotesShow from './components/notes/Show'
import NotesNew from './components/notes/New'
import NotesEdit from './components/notes/Edit'
import CategoriesList from './components/notes/C-List'
import CategoriesShow from './components/notes/C-Show'
import CategoriesNew from './components/notes/C-New'
import CategoriesEdit from './components/notes/C-Edit'
import Register from './components/notes/register'
import Login from './components/notes/login'
import Account from './components/notes/account'
import Logout from './components/notes/Logout' 
import Exaample from './components/notes/example'
class App extends React.Component{
  constructor(){
    super()
    this.state={
      isAuthenticated:false
    }
  }  
  handleAuth=(bool)=>{
    this.setState({isAuthenticated:bool})
  }
 componentDidMount(){
   if(localStorage.getItem('userAuthToken')){
      this.setState({isAuthenticated:true})
   }
 }
  render(){
    console.log(this.state)

    return(
      
      <div className="bg">
      <div className="container">
      <BrowserRouter>
                  <div>
                      <h2>MY NOTE-APP</h2>
                        {this.state.isAuthenticated &&(
                          <div>
                           
                            <Link to="/users/logout" className="navbar-brand">logout</Link> 
                            <Link to="/users/account" className="navbar-brand">Account</Link>
                            <Link to ="/notes" className="navbar-brand">List Notes</Link>
                            <Link to="/categories" className="navbar-brand">List Categoies</Link>
                          </div>
                        )}
                          {!this.state.isAuthenticated &&(
                          <div className="navebar-header">
                            <button className="navbar-toggler" type="button" data-toggle="collapse">
                             <span className="navbar-toggler-icon" ></span>
                             
                          </button>
                            <Link to="/users/register" className="navbar-brand">Register</Link>
                            <Link to="/users/login" className="navbar-brand">Login</Link>                        
                          </div>
                        )}
                        
                      
                            {!this.state.isAuthenticated &&(
                              <div>
                                 <Route path="/users/register" component={Register} exact={true}/>
                                 <Route path="/users/login" render={(props)=>{
                                      return <Login {...props} handleAuth={this.handleAuth}/>
                                   }} exact={true}/>
                              </div>
                            )}                                                  
                            {this.state.isAuthenticated &&(
                              <div>
                                <Route path="/users/account" component={Account} exact={true}/>
                                <Route path="/notes" component={NotesList} exact={true}/>
                                <Route path="/notes/new" component={NotesNew}/>

                                <Route path="/notes/edit/:id" component={NotesEdit} exact={true}/>
                                <Route path="/categories/edit/:id" component={CategoriesEdit}/>
                                <Route path="/categories/new" component={CategoriesNew}/> 
                                <Route path="/categories/:id" component={CategoriesShow}/>
                                <Route path="/notes/:id" component={NotesShow} exact={true}/>
                                <Route path="/categories" component={CategoriesList}/>
                                
                                <Route path="/users/logout" render={(props)=>{
                              return <Logout {...props} handleAuth={this.handleAuth}/>
                            }} exact={false}/>
                              </div>
                            )}
                            
                            
                 
                  </div>
      </BrowserRouter>
      </div>
      </div>
    ) 
  } 
}
ReactDOM.render(<App/>,document.getElementById('root'))
