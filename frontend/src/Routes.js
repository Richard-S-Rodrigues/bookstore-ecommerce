import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";

import Home from "./pages/Home";
import Book from "./pages/Book";

const Routes = () => {
    return (
        <Router>
            <Header />

            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/book/:id" component={Book} />
            </Switch>
        </Router>
    );
};

export default Routes;
