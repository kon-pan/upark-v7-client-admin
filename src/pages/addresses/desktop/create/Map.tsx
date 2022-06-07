import { Icon, LatLngTuple } from 'leaflet';
import markerIconBlue from '../../../../common/images/marker-icon-blue.png';
import markerShadow from '../../../../common/images/marker-shadow.png';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';

type MapProps = {
  position: LatLngTuple;
};

const Map = ({ position }: MapProps) => {
  const ChangeView = ({ center, zoom }: any) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  };

  return (
    <MapContainer
      className='z-0'
      center={position}
      zoom={15}
      scrollWheelZoom={true}
    >
      <ChangeView center={position} zoom={15} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker
        key={position[0]}
        draggable={false}
        icon={
          new Icon({
            iconUrl: markerIconBlue,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            shadowUrl: markerShadow,
          })
        }
        position={position}
        interactive={true}
      />
    </MapContainer>
  );
};

export default Map;
