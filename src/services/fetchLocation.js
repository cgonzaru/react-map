import { get } from "axios";

const endpoint = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp';

const fetchLocation = () => {
    return get(endpoint)
    .then(res => res.data)
};

export {fetchLocation};