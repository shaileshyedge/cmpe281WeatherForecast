// See post: http://asmaloney.com/2015/06/code/clustering-markers-on-leaflet-maps

var map = L.map( 'map', {
  center: [10.0, 5.0],
  minZoom: 2,
  zoom: 2
});

L.tileLayer( 'http://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', {
  attribution: 'Shruti,Swathi and Pramod',
  subdomains: ['otile1','otile2','otile3','otile4']
}).addTo( map );

var myURL = jQuery( 'script[src$="leaf-demo.js"]' ).attr( 'src' ).replace( 'leaf-demo.js', '' );

var myIcon = L.icon({
  iconUrl: myURL + 'images/pin.png',
  iconRetinaUrl: myURL + 'images/pin.png',
  iconSize: [20, 35],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14]
});

var markerClusters = L.markerClusterGroup();

for ( var i = 0; i < scorecard.length; ++i )
{
	
	var popup = '<br/><b>Station: </b>' +scorecard[i].STATION +
    '<br/><b>Wind Speed </b>' + scorecard[i].WIND_SPEED +
    '<br/><b>Air Pressure: </b> ' + scorecard[i].AIR_PRESSURE+
    '<br/><b>Air Temperature:</b> ' + scorecard[i].AIR_TEMPERATURE +
    '<br/><b>Relative Humidity: </b> ' + scorecard[i].RELATIVE_HUMIDITY;

  var m = L.marker( [scorecard[i].LATITUDE, scorecard[i].LONGITUDE], {icon: myIcon} )
                  .bindPopup( popup );

  markerClusters.addLayer( m );
}

map.addLayer( markerClusters );
