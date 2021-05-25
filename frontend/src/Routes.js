import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";

import Home from "./pages/Home";
import Book from "./pages/Book";
import User from "./pages/User";

import Auth from "./pages/Auth";

const Routes = () => {
    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/book/:id" component={Book} />
                <Route path="/user" component={User} />
                <Route path="/auth" component={Auth} />
            </Switch>
        </Router>
    );
};

export default Routes;
