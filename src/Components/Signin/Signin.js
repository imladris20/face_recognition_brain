import React from "react";
import 'tachyons';

class Signin extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            inputEmail: '',
            inputPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({inputEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({inputPassword: event.target.value});
    }

    onSubmitSignIn = () => {
        // console.log(this.state);
        fetch('https://face-recognition-brain-api-79k5.onrender.com/signin', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                email: this.state.inputEmail,
                password: this.state.inputPassword
            })
        })
            .then(response => response.json())
            .then(data => {
                if ( data.id ){
                    this.props.loadUser(data);
                    this.props.onRouteChange("Home");
                }
            })        
    }

    render(){
        const {onRouteChange} = this.props;
        return(
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="email"
                                name="email-address"
                                id="email-address"
                                onChange = {this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                onChange = {this.onPasswordChange}
                            />
                        </div>
                        <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
                    </fieldset>
                    <div className="">
                        <input 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib"
                            type="submit"
                            value="Sign in"
                            onClick = {this.onSubmitSignIn}
                        />
                    </div>
                        <div className="lh-copy mt3">
                        <p onClick = { () => onRouteChange("Signup") } className="f6 link dim black db pointer">Sign Up New Account</p>
                        <a href="#0" className="f6 link dim black db">Forgot your password?</a>
                    </div>
                </div>
            </main>
            </article>
        )
    }
}

export default Signin;