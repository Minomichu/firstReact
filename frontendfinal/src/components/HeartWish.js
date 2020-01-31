import React, { Component } from 'react'
import axios from 'axios'

let url = 'https://glacial-plateau-71562.herokuapp.com'
//let url = 'http://localhost:3001'


class HeartWish extends Component {

    state = {
        heart: [ ]
    }


    componentDidMount() {
        this.getHeartWish();
    }
    
    getHeartWish() {
        axios.get(url + '/api/onTheList')

        .then(response => {
            this.setState({
                heart: response.data
            })
        })
    }


    deleteWithID(id) { 
        axios.delete(url + '/api/onTheList/delete/' + id)

        .then(response => {
            this.setState({
                heart: [ ]
            })
        })
        .then(() => this.getHeartWish())
    }

    
    render() {

        //Plockar ut alla önskningar som blivit ikryssade som "heartWish"
        var filteredHeartArray = this.state.heart.filter((oneLoop) => {
            return oneLoop.heartWish === true;
        });

        //Endast utvalt antal visas
        var displayHeartArray = filteredHeartArray.slice(0,3).map(oneLoop => {
            return (
                <div className="surroundHeartWish" key={oneLoop._id} > 
                <input type="text" className="titleHeartWish" defaultValue={oneLoop.thing} />
                <input type="text" className="descriptionHeartWish" defaultValue={oneLoop.description} />
            </div> 
        )})
    
        return (
            <div>
                {displayHeartArray}
            </div>
        )
    }
}

export default HeartWish