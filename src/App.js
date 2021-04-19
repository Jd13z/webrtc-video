// import logo from './logo.svg';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import VideoCatch from './components/VideoCatch';
import VideoRecordComp from './components/VideoRecordComp';

function App() {
  return (
    <div>
      <span>Add Span</span>
      <BrowserRouter>
        <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/:id" component={VideoRecordComp} exact />
        <Route path="/catch/:id" component={VideoCatch} />
      </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
