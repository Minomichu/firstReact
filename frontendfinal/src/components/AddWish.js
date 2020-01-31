import React, { Component } from 'react'
import axios from 'axios'

let url = 'https://glacial-plateau-71562.herokuapp.com'
//let url = 'http://localhost:3001'


class AddWish extends Component {

    state = {
        add: [ ]
    }


    addWish() {
        axios.post(url + '/api/onTheList/post', this.state)

        .then(response => {
            this.setState({
                add: [ ]
            })
        })
        //Skickar tillbaka till startsidan 
        this.props.history.push('/');
    }


    //Lägger in inmatningen i state
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        //förhindrar att sidan laddas om
        e.preventDefault();

        this.addWish();
    }

    
    render() {
    
        return (
            <div className="centerAll">
                <form onSubmit={this.handleSubmit}>

                    <input type="text" className="addField" id="thing" onChange={this.handleChange} placeholder="Sak *obligatorisk"/>
                    <input type="text" className="addField" id="price" onChange={this.handleChange} placeholder="Pris **OBS ENDAST SIFFROR**"/>
                    <input type="text" className="addField" id="color" onChange={this.handleChange} placeholder="Färg"/>
                    <input type="text" className="addField" id="store" onChange={this.handleChange} placeholder="Affär"/>
                    <input type="text" className="addField" id="description" onChange={this.handleChange} placeholder="Beskrivning"/>
                    <input type="text" className="addField" id="link" onChange={this.handleChange} placeholder="Länk"/>
                    <input type="text" className="addField" id="extraInfo" onChange={this.handleChange} placeholder="ExtraInfo"/>
                    {/*
                    <label htmlFor="topThree">topThree: </label>
                    <input type="checkbox" id="topThree" onChange={this.handleChange}/>
                    <label htmlFor="heartWish">HeartWish: </label>
                    <input type="checkbox" id="heartWish" onChange={this.handleChange}/>
                    */}
                    <button className="blackButton">Lägg till</button>
                </form>
            </div>
        )
    }
}

export default AddWish