import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import BooksProvider from "./contexts/BooksContext";
import CartProvider from "./contexts/CartContext";

import Header from "./components/Header";

import { Home, Book, User, Auth, Cart, Success } from "./pages";

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
        <BooksProvider>
            <CartProvider>
                <Router>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/book/:id" component={Book} />
                        <Route path="/auth" component={Auth} />
                        <Route path="/cart" component={Cart} />
                        <Route path='/success' component={Success} />
                        
                        <PrivateRoute path="/user" component={User} />
                    </Switch>
                </Router>
            </CartProvider>
        </BooksProvider>
    );
};

export default Routes;
