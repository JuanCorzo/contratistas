import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker} from "react-google-maps";
import axios from 'axios';
import global from '../../Global';
import icono from '../../../src/assets/images/icon2.png';

var tabe = [];

const Map = ()=>{
    axios.get(global.url + "reportes/mapasx", global.autentica)
    .then(res => {
        tabe = res.data;
    });
    return (
        <GoogleMap defaultZoom={6} defaultCenter={{ lat:4.7047337885725815, lng:-74.07011920579085}}>
            {
                tabe.map((cons, i) => {
                    return (
                        <Marker key={i} position={{lat: parseFloat(cons.apo_lat), lng:parseFloat(cons.apo_lon)}}
                        icon={{url: icono}} />
                    )
                })
            }
        </GoogleMap>
    );
}
export default withScriptjs(withGoogleMap(Map))