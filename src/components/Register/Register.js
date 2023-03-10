import React from 'react';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : '',
            name:'',
        }
    }
    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }
    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('https://face-detector-brain-api.onrender.com/register', {
            method : 'post',
            headers : {'Content-Type' : 'application/json'},
            body: JSON.stringify ({
                email: this.state.email,
                password:this.state.password,
                name:this.state.name,
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id){
                this.props.loadUser(user)
                this.props.onRouteChange('home');
            }
        })

    }

    render() {
        return (
            <div className="pa4 black-80 center-flex">
                <div className="measure center ba bw1 b--white ph5 pb4">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <p className="f2 fw6 ph0 mh0 center">Register</p>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f4 white" htmlFor="email-address">Name</label>
                            <input 
                            onChange={this.onNameChange}
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f4 white" htmlFor="email-address">Email</label>
                            <input
                            onChange={this.onEmailChange}
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f4 white" htmlFor="password">Password</label>
                            <input
                            onChange={this.onPasswordChange}
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                        </div>
                    </fieldset>
                    <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib white b--white" type="submit" value="Register" onClick={this.onSubmitSignIn} />
                    </div>
                </div>
            </div>
        )
    }
} 

export default Register;