import React, { Component } from 'react'
import GoogleMap from 'google-map-react'

// import Marker from './Map/Marker'

class Map extends Component {
  renderPolylines(map, maps) {
    /** Example of rendering geodesic polyline */
    let geodesicPolyline = new maps.Polyline({
      path: this.props.markers,
      geodesic: true,
      strokeColor: '#00a1e1',
      strokeOpacity: 1.0,
      strokeWeight: 4,
      zIndex: 10,
    })
    geodesicPolyline.setMap(map)

    /** Example of rendering non geodesic polyline (straight line) */
    let nonGeodesicPolyline = new maps.Polyline({
      path: this.props.markers,
      geodesic: false,
      strokeColor: '#e4e4e4',
      strokeOpacity: 0.7,
      strokeWeight: 3
    })
    nonGeodesicPolyline.setMap(map)

    this.fitBounds(map, maps)
  }

  fitBounds(map, maps) {
    var bounds = new maps.LatLngBounds()
    for (let marker of this.props.markers) {
      bounds.extend(
        new maps.LatLng(marker.lat, marker.lng)
      )
    }
    map.fitBounds(bounds)
  }

  render() {
    return (
      <GoogleMap
        // bootstrapURLKeys={{ key: '**************************' }}
        style={{ height: '100vh', width: '100%' }}
        yesIWantToUseGoogleMapApiInternals
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        onGoogleApiLoaded={({ map, maps }) => this.renderPolylines(map, maps)}>
        <div text={'A'} lat={28.0476676} lng={-16.7263331} >a</div>
        <div text={'B'} lat={28.0479855} lng={-16.5860301} >b</div>
      </GoogleMap>
    )
  }
}

Map.defaultProps = {
  markers: [
    { lat: 28.0476676, lng: -16.7263331 },
    { lat: 28.0479855, lng: -16.5860301 }
  ],
  center: [28.1899228, -16.7477227],
  zoom: 4
}

export default Map