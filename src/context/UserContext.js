import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [userToken, setUserToken] = useState();

    useEffect(() => {
        setUserToken(localStorage.getItem('emc-token'));

        // TODO Remove it after completing Dashboard design
        setUserToken('anc');
    }, []);

    return (
        <UserContext.Provider
            value={{
                userToken,
                setUserToken,
            }}>
            {props.children}
        </UserContext.Provider>
    );
};
