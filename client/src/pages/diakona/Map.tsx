import L from "leaflet";
import api from "@utils/api";
import { FC, Fragment, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Avatar from "@components/Avatar";
import { useNavigate } from "react-router-dom";

const customIcon = new L.Icon({
  iconUrl: "/marker.png",
  iconSize: [25, 25],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const Map: FC = () => {
  const posFiangonana: any = [-18.874445079089178, 47.549243413401385];
  const [data, setData] = useState<any[]>([]);
  const navigate = useNavigate();
  const sum = () => {
    return data.reduce((p, c) => {
      return p + c.count;
    }, 0);
  };
  useEffect(() => {
    api.get("/diacre/gps").then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <div className="h-full">
      <div className="p-2 bg-primary text-white">
        <p>
          {data.length} Location - {sum()} Diakona
        </p>
      </div>
      <div className="w-full h-[calc(100%-40px)]">
        <MapContainer
          center={posFiangonana}
          zoom={16}
          scrollWheelZoom={true}
          className="h-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {data.map((v, i) => {
            return (
              <Fragment key={i}>
                {v._id[0] && (
                  <Marker position={v._id} icon={customIcon}>
                    <Popup>
                      <div>
                        <p className="font-medium text-base !m-0">
                          {v.count} diakona
                        </p>
                        {v.diakona.map((d: any) => {
                          return (
                            <div
                              onClick={() => navigate("/christian/" + d._id)}
                              className="cursor-pointer"
                            >
                              <Avatar label={`${d.fullname}`} />
                            </div>
                          );
                        })}
                      </div>
                    </Popup>
                  </Marker>
                )}
              </Fragment>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
