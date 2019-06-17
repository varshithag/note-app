import React from 'react'
import CategoriesForms from './C-Foms'
import axios from '../../config/configaxios';

class CategoriesNew extends React.Component{
    constructor(){
        super()
        this.handleSumbit=this.handleSumbit.bind(this)
    }

    handleSumbit(formData){
        console.log(formData)
        axios.post(`/categories`,formData)
        .then(response=>{
            if(response.data.hasOwnProperty('errors')){
                console.log(response.data.errors)
            }else{
                this.props.history.push(`/categories/${response.data._id}`)
            }
        })
    }
    render(){
        return(
            <div>
                <h2>Add new Category</h2>
            <CategoriesForms handleSumbit={this.handleSumbit}/>
            </div>
            )
    }

}
export default CategoriesNew