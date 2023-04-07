import FacebookLogin from 'react-facebook-login'
import React, { Component } from 'react'
export default class facebook extends Component{
    state = {
        isLoggedIn: false,
        userID: '',
        name: '',
        email: '',
        picture: ''
};


responseFacebook = response => {
 // console. log(response);

 this.setState({
    isLoggedIn: true,
    userID: response.userID,
    name: response.name,
    email: response.email,
    picture: response.picture.data.url
 })
}

compponentclicked = () => console.log("clicked");

    return() {
        let fbContent;

        if(this.state.isLoggedIn) {
            fbContent = (
                <dvi style={{
                    width: '400px',
                    margin: 'auto',
                    backround: '#f4f4f4',
                    padding: '20px'
                }}>
                  <img src={this.state.picture} alt={this.setState.name} />
                  <h2>welcom {this.state.name}</h2>
                  Email{this.state.email}
                </dvi>
            )
        } else {
          fbContent= (
          <FacebookLogin
            appId="528837619424958"
            autoLoad={true}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook}
             />
         );
        }

        return <div>{fbContent}</div> 
    }
}   


