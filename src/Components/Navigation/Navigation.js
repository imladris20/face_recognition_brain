import React from "react";
import 'tachyons';

const Navigation = ({onRouteChange}) => {
    return (
        <nav style={{justifyContent: "right", display: "flex"}}>
            <p onClick={() => onRouteChange('Signin')} className='f3 link dim white underline pa3 pointer' >Sign out</p>
        </nav>
    )
}

export default Navigation;