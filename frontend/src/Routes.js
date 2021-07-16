import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import BooksProvider from "./contexts/BooksContext";
import CartProvider from "./contexts/CartContext";

import Header from "./components/Header";

import { Home, Book, User, Auth, Cart, Success, Cancel, Admin } from "./pages";

import { isAuthenticated } from "./services/auth";

export const checkAuthentication = () => {
    return isAuthenticated().then(response => {
        return response;
    })
    .catch(err => {
        console.log(err)
        return false;
    });
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            checkAuthentication() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/auth/signin",
                        state: { from: props.location },
                    }}
                />
            )
        }
    />  
);

const Routes = () => {
    return (
        <BooksProvider>
            <CartProvider>
                <Router>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/book/:id" component={Book} />
                        <Route path="/auth" component={Auth} />
                        <Route path='/success' component={Success} />
                        <Route path='/cancel' component={Cancel} />
                        <Route path='/admin' component={Admin} />

                        <PrivateRoute path="/user" component={User} />
                        <PrivateRoute path="/cart" component={Cart} />
                    </Switch>
                </Router>
            </CartProvider>
        </BooksProvider>
    );
};

export default Routes;
