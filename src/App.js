import React from 'react';
import { fetchLocation } from './services/fetchLocation';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: []
    }
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    fetchLocation()
      .then(data => {
        //limpiamos el texto que resulta de la petición
        let result = data.split("(");
        result = result[1];
        result = result.replace(";"," ");
        result = result.replace(")", " ");
        result = JSON.parse(result);
        console.log(result)
        //nos iteresan ciertos datos que los recogeremos del estado
        this.setState({
          location: result.features
        });

      })
  }

  render() {
    return (
      <div className="App">
        :D
      </div>
    );
  }
}

export default App;
