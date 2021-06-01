import React, { memo, useEffect } from "react";
import { Circle, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import { calculateTravelStatus, casesTypeColors } from "../../utils/utils";
import numeral from "numeral";
import { changeCountry } from "../../redux/actions";
import { useDispatch } from "react-redux";

import "./Map.scss";

function MapViewController({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
}

function Map(props) {
  const dispatch = useDispatch();
  return (
    <div className="map">
      <MapContainer
        center={props.center}
        zoom={props.zoom}
        scrollWheelZoom={false}
        minZoom={1}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapViewController {...props} />
        {props.countries.map((country) => {
          let status;
          const result = calculateTravelStatus(
            country.active,
            country.population
          );
          switch (result) {
            case "SAFE": {
              status = (
                <span className="info-status info-status--safe">Safe</span>
              );
              break;
            }
            case "PRE-CRITICAL": {
              status = (
                <span className="info-status info-status--pre-critical">
                  Pre-Critical
                </span>
              );
              break;
            }
            case "CRITICAL": {
              status = (
                <span className="info-status info-status--critical">
                  Critical
                </span>
              );
              break;
            }
            default: {
              status = (
                <span className="info-status info-status--unknown">
                  Unknown
                </span>
              );
            }
          }
          return (
            <Circle
              center={[country.countryInfo.lat, country.countryInfo.long]}
              pathOptions={{
                color: casesTypeColors[props.casesType].hex,
                fillColor: casesTypeColors[props.casesType].rgba,
              }}
              radius={
                Math.sqrt(country[props.casesType]) *
                casesTypeColors[props.casesType].multiplier
              }
            >
              <Popup className="popup">
                <div className="info-container">
                  <div
                    className="info-flag"
                    style={{
                      backgroundImage: `url(${country.countryInfo.flag})`,
                    }}
                    onClick={() =>
                      dispatch(changeCountry(country.countryInfo.iso3))
                    }
                  />
                  <div className="info-name">
                    {country.country}&nbsp;
                    {status}
                  </div>
                  <div className="info-confirmed">
                    {`Cases: ${numeral(country.cases).format("0,0")}
            (+${numeral(country.todayCases).format("0,0")})`}
                  </div>
                  <div className="info-recovered">
                    {`Recovered: ${numeral(country.recovered).format("0,0")}
            (+${numeral(country.todayRecovered).format("0,0")})`}
                  </div>
                  <div className="info-deaths">
                    {`Deaths: ${numeral(country.deaths).format("0,0")}
            (+${numeral(country.todayDeaths).format("0,0")})`}
                  </div>
                </div>
              </Popup>
            </Circle>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default memo(Map);
