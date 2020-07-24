import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Display from './components/Display';
import PetForm from './components/PetForm';
import Detail from './components/Detail';
import Edit from './components/Edit';
import { Link, Router } from '@reach/router';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="tex-center">
          <div className="jumbotron mt-5">
            <h1>Welcome to Pet Shelter!</h1>
            <hr/>
            <h3>These pets are looking for a good home...</h3>
          </div>
          <Link className="btn btn-warning mt-3 mr-2" to="/">Pets List</Link>
          <Link className="btn btn-warning mt-3" to="/new">Add Pet</Link>
        </div>
      </div>
        <Router>
          <PetForm path="/new"/>
          <Display path="/" />
          <Detail path="/pet/:_id"/>
          <Edit path="/pet/update/:_id"/>
        </Router>
    </div>
  );
}

export default App;
