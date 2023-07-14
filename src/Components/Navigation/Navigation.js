import React from "react";
import 'tachyons';

const Navigation = ({onRouteChange, isSigned}) => {
    if (isSigned){
        return (
            <nav style={{justifyContent: "right", display: "flex"}}>
                <p onClick={() => onRouteChange('Signin')} className='f3 link dim white underline pa3 pointer' >Sign out</p>
            </nav>
        )
    } else {
        return (
            <nav style={{justifyContent: "right", display: "flex"}}>
                <p onClick={() => onRouteChange('Signin')} className='f3 link dim white underline pa3 pointer' >Sign in</p>
                <p onClick={() => onRouteChange('Signup')} className='f3 link dim white underline pa3 pointer' >Sign up</p>
            </nav>
        )
    }
}

export default Navigation;