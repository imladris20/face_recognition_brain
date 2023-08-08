import React from "react";
import 'tachyons';

class Registration extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:'',
            email:'',
            password:''
        }
    };

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    };

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    };

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    };

    onSubmitRegistration = () => {
        // console.log(this.state);
        fetch('http://localhost:3000',{
            method:'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(newUser => {
                if(newUser.id){
                    this.props.loadUser(newUser);
                    this.props.onRouteChange("Signin");
                }
            })
    }

    render(){
        // const {onRouteChange} = this.props;
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Registration</legend>
                        <div className="mt3 ">
                            <label className="db fw6 lh-copy f5" htmlFor="username">Username</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="username"  
                                id="username"
                                onChange={this.onNameChange}
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                onChange={this.onPasswordChange}
                            />
                        </div>                    
                    </fieldset>
                    <div className="">
                        <input 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib"
                            type="submit"
                            value="Sign up"
                            onClick = {this.onSubmitRegistration}
                        />
                    </div>
                </div>
            </main>
            </article>
        )
    }
    
    
}

export default Registration;