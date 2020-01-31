import React, { Component } from 'react'
import axios from 'axios'
import HeartWish from './HeartWish'
import NewButton from './NewButton';
import WhiteLine from './WhiteLine'
import ExtraBgColor from './ExtraBgColor'

let url = 'https://glacial-plateau-71562.herokuapp.com'
//let url = 'http://localhost:3001'

 
class Home extends Component {

    state = {
        wishes: [ ]
    }

    componentDidMount() {
        this.getWishes();
    }


    getWishes() {
        axios.get(url + '/api/onTheList')

        .then(response => {
            this.setState({
                wishes: response.data.slice(0,10)
            })
        })
    }


    deleteWishWithID(id) {
        axios.delete(url + '/api/onTheList/delete/' + id)

        .then(response => {
            this.setState({
                heart: [ ]
            })
        })
        .then(() => this.getWishes())
    }


    updateWish(id) {
 
        axios.put(url + '/api/onTheList/put/' + id, this.state)
        //Den verkar inte hämta alla önskningar på nytt
        .then(() => this.getWishes())
    }


    //Lägger in inmatningen i state
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    
    handleSubmit = (e) => {
        //förhindrar att sidan laddas om
        e.preventDefault();
    }


    render() {
        const { wishes } = this.state;

        const wishesArray = wishes.length ? (
            wishes.map(oneLoop => {
                return (
                    <div className="aName" key={oneLoop._id} >

                        <div className="surroundSmallBox">
                        <input type="text" className="thingSmallBox" id="thing" name="thing" onChange={this.handleChange} defaultValue={oneLoop.thing} />
                        <input type="text" className="priceSmallBox" id="price" name="price" onChange={this.handleChange} defaultValue={oneLoop.price} />

                        <button id="updateSmallBox" onClick={() => {this.updateWish(oneLoop._id)}}>Uppdatera</button>
                        <button id="deleteSmallBox" onClick={() => {this.deleteWishWithID(oneLoop._id)}}>Radera</button>
                        </div>
                    </div>
                )
            }
        )
        ) : (
            <div className="message">Det står ingenting. Önska dig något!</div>
        )
        return (
            <div className="centerAll">
                <WhiteLine />
                <ExtraBgColor />
                {wishesArray}
                <WhiteLine />
                <ExtraBgColor />
                <HeartWish />
                <ExtraBgColor />
                <WhiteLine />
                <NewButton />
            </div>
        )
    }
}

export default Home