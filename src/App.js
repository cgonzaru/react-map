import React from 'react';
import { fetchLocation } from './services/fetchLocation';
import ReactMapGL from 'react-map-gl';
import Marker from 'react-google-maps';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: [],
      viewport: {
        latitude: 45.4211,
        longitude: -75.6903,
        width: 400,
        higth: 400,
        zoom: 10
      },
      mounted: false
    }
    
  }

  componentDidMount() {
    this.getLocation();
    this.setState({ mounted: true})
  }

  getLocation() {
    fetchLocation()
      .then(data => {
        //limpiamos el texto que resulta de la petición
        let result = data.split("(");
        result = result[1];
        result = result.replace(";"," ");
        result = result.replace(")", " ");
        console.log(result)
        result = JSON.parse(result);
        //nos iteresan ciertos datos que los recogeremos del estado
        this.setState({
          location: result.features
        });

      })
  }

  render() {
    const { viewport, mounted, location } = this.state;
    return (
      <div style={{height: '100%', width: '100%'}}>
        
        <ReactMapGL
          {...viewport}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxApiAccessToken={"pk.eyJ1IjoiY2dvbnphcnUiLCJhIjoiY2sycDFiMGozMGI5NTNncHBuM2NpOHVsbyJ9.r7mu0ZDQk0jhZw4wALC8dg"}
          onViewportChange={(viewport) => {
            if (mounted) { this.setState({ viewport })}
          }}
        >
          {location.map(item => {
            return (
            <Marker
              key={item.id}
              latitude={item.geometry.coordinates[1]}
              longitude={item.geometry.coordinates[0]}
            >
              
            </Marker>

            );
          })}
          
        </ReactMapGL>
      </div>
    );
  }
}

export default App;
