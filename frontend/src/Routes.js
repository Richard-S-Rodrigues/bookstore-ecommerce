import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import CartProvider from "./contexts/cartContext";

import Header from "./components/Header";

import { Home, Book, User, Auth, Cart } from "./pages";

import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            isAuthenticated() ? (
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
        <CartProvider>
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/book/:id" component={Book} />
                    <PrivateRoute path="/user" component={User} />
                    <Route path="/auth" component={Auth} />
                    <Route path="/cart" component={Cart} />
                </Switch>
            </Router>
        </CartProvider>
    );
};

export default Routes;
