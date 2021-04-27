import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext'; 

// const ProtectedRoute = ({ component, path, loggedIn = false }) => {
//     const currentUserContext = useContext(CurrentUserContext);

//     return (
//         <Route exact path={path}>
//             { () => currentUserContext.loggedIn ?  component : <Redirect to='./' /> }
//         </Route>
// )}

const ProtectedRoute = ({ component: Component, ...props  }) => {
    const currentUserContext = useContext(CurrentUserContext);

    return (
        <Route>
            { () => currentUserContext.loggedIn ? <Component {...props} /> : <Redirect to='./' /> }
        </Route>
)}

export default ProtectedRoute;