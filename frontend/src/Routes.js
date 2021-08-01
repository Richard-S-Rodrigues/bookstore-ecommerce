import { useContext } from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import BooksProvider from "./contexts/BooksContext";
import CartProvider from "./contexts/CartContext";
import UserProvider, { userContext } from "./contexts/UserContext";

import Header from "./components/Header";
import { LoadingBig } from "./components/Loading";

import { Home, Book, User, Auth, Cart, Success, Cancel, Admin } from "./pages";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isLoggedIn, isLoading } = useContext(userContext);

    if (isLoading) {
        return <LoadingBig />
    }

    return (
    <Route
        {...rest}
        render={(props) =>
            isLoggedIn ? (
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
    )   
};

const AdminRoute = ({ component: Component, ...rest }) => {
    const { isAdmin, isLoading } = useContext(userContext);

    if (isLoading) {
        return <LoadingBig />
    }

    return (
    <Route
        {...rest}
        render={(props) =>
            isAdmin ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/",
                        state: { from: props.location },
                    }}
                />
            )
        }
    />
    )  
};

const Routes = () => {
    return (
        <UserProvider>
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

                            <PrivateRoute path="/user" component={User} />
                            <PrivateRoute path="/cart" component={Cart} />
                            
                            <AdminRoute path='/admin' component={Admin} />
                        </Switch>
                    </Router>
                </CartProvider>
            </BooksProvider>
        </UserProvider>
    );
};

export default Routes;
