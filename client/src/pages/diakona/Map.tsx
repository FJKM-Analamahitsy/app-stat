import api from "@utils/api";
import { FC, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const Map: FC = () => {
  const posFiangonana: any = [-18.874445079089178, 47.549243413401385];
  useEffect(() => {
    api.get("/member?sampana=DIAKONA").then((res) => {
      console.log(res.data);
    });
  }, []);
  return (
    <div className="h-full">
      <div></div>
      <div className="w-full h-full">
        <MapContainer
          center={posFiangonana}
          zoom={16}
          scrollWheelZoom={false}
          className="h-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
