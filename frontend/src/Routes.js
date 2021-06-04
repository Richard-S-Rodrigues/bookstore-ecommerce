import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import BooksProvider from "./contexts/BooksContext";
import CartProvider from "./contexts/CartContext";

import Header from "./components/Header";

import {
    Home,
    Book,
    User,
    Auth,
    Cart,
    Shipping,
    Payment,
    PlaceOrder,
} from "./pages";

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

                        <PrivateRoute path="/user" component={User} />
                        <PrivateRoute path="/shipping" component={Shipping} />
                        <PrivateRoute path="/payment" component={Payment} />
                        <PrivateRoute
                            path="/placeorder"
                            component={PlaceOrder}
                        />
                    </Switch>
                </Router>
            </CartProvider>
        </BooksProvider>
    );
};

export default Routes;
