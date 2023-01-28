import React from 'react';
import './SignIn.css'

const SignIn = ({ onRouteChange }) => {
    return (
        <div className="pa4 black-80 center-flex">
            <div className="measure center ba bw1 b--white ph5 pb4">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <p className="f2 fw6 ph0 mh0 center">Sign In</p>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f4 white" htmlFor="email-address">Name</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 center" type="text" name="name" id="name" />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f4 white" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 center" type="password" name="password" id="password" />
                    </div>
                </fieldset>
                <div className="">
                    <input onClick={() => onRouteChange('home')} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib white b--white" type="submit" value="Sign in" />
                </div>
                <div className="lh-copy mt3">
                    <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer white">Register</p>
                </div>
            </div>
        </div>
    );
}

export default SignIn;