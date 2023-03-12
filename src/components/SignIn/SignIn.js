import React from 'react';
import './SignIn.css'

class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            signInEmail : '',
            signInPassword : '',
        }
    }
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('https://dull-red-walkingstick-tutu.cyclic.app/signin', {
            method : 'post',
            headers : {'Content-Type' : 'application/json'},
            body: JSON.stringify ({
                email: this.state.signInEmail,
                password:this.state.signInPassword,
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
        const { onRouteChange } = this.props;
        return (
            <div className="pa4 black-80 center-flex">
                <div className="measure center ba bw1 b--white ph5 pb4">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <p className="f2 fw6 ph0 mh0 center">Sign In</p>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f4 white" htmlFor="email-address">Email</label>
                            <input 
                            onChange={this.onEmailChange} 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 center" type="text" name="name" id="name" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f4 white" htmlFor="password">Password</label>
                            <input 
                            onChange={this.onPasswordChange}
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 center" type="password" name="password" id="password" />
                        </div>
                    </fieldset>
                    <div className="">
                        <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib white b--white" type="submit" value="Sign in" />
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer white">Register</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignIn;