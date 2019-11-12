
import React from "react";
import { fetchLocation } from "./services/fetchLocation";
// Aquí había un problemilla exportando
import ReactMapGL, { Marker } from "react-map-gl";
import "./App.css";


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
        zoom: 1
      },
      mounted: false
    };
  }

  componentDidMount() {
    this.getLocation();
    // Esto es guay, que tengas una verificación del DOM dentro del componente :D
    this.setState({ mounted: true });
  }

  getLocation() {
    fetchLocation().then(data => {
      let result = data.split("(");
      result = result[1];
      result = result.replace(";", " ");
      result = result.replace(")", " ");
      result = JSON.parse(result);
      this.setState({
        location: result.features
      });
    });
  }

  render() {
    const { viewport, mounted, location } = this.state;
    return (
      // No te pintaba el mapa por esto:
      // Necesitas darle unas medidas cerradas al mapa, ya sea en píxeles o en vh
      <div style={{ height: "100%" }}>
        <ReactMapGL
          {...viewport}
          // Esta es una opción, sino, en el div padre
          width="100vw"
          height="100vh"
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxApiAccessToken={
            "pk.eyJ1IjoiY2dvbnphcnUiLCJhIjoiY2sycDFiMGozMGI5NTNncHBuM2NpOHVsbyJ9.r7mu0ZDQk0jhZw4wALC8dg"
          }
          onViewportChange={viewport => {
            if (mounted) {
              this.setState({ viewport });
            }
          }}
        >
          {location.map(item => {
            return (
              <Marker
                key={item.id}
                latitude={item.geometry.coordinates[1]}
                longitude={item.geometry.coordinates[0]}
              >
                {/* Para pintar algo, lo que tenías que hacer era meter algo dentro del marcador! */}
                <div className="pointer"/>
              </Marker>
            );
          })}
        </ReactMapGL>
      </div>
    );
  }
}

export default App;
