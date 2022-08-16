import React, {Component, Fragment} from 'react';
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import ReadPage from "./Pages/ReadPage";
import CreatePage from "./Pages/CreatePage";
import UpdatePage from "./Pages/UpdatePage";
import ViewPage from "./Pages/ViewPage";
import TextDetectionPage from './Pages/TextDetectionPage';
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
class App extends Component {
  render() {
    return (
        <Fragment>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/registration" render={(props)=><RegistrationPage {...props} key={Date.now()}></RegistrationPage>}/>
                    <Route exact path="/" render={(props)=><LoginPage {...props} key={Date.now()}></LoginPage>}  />
                    <Route exact path="/read" render={(props)=><ReadPage {...props} key={Date.now()} />}/>
                    <Route exact path="/create" render={(props)=><CreatePage {...props} key={Date.now()} />}/>
                    <Route exact path="/update/:id" render={(props)=><UpdatePage {...props} key={Date.now()} />}/>
                    <Route exact path="/view/:id" render={(props)=><ViewPage {...props} key={Date.now()} />}/>
                    <Route exact path="/text-detection" render={(props)=><TextDetectionPage {...props} key={Date.now()} />}/>
                </Switch>
            </BrowserRouter>
        </Fragment>
    );
  }
}
export default App;
