import React, { useEffect } from "react";
import { Switch, Route, Link, Redirect, useLocation } from "react-router-dom";
import numeral from "numeral";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { Doughnut } from "react-chartjs-2";

import InfoCard from "./components/InfoCard/InfoCard";
import Map from "./components/Map/Map";
import Table from "./components/Table/Table";
import MyChart from "./components/Chart/Chart";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "./redux/actions";
import { changeCountry } from "./redux/actions";

import {
  capitalizeFirstLetter,
  casesTypeColors,
  diagramOptions,
  normalizeNumbers,
} from "./utils/utils";

import "./App.scss";
import "leaflet/dist/leaflet.css";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const countries = useSelector((state) => state.appState.countries);
  const targetCountry = useSelector((state) => state.appState.targetCountry);
  const countryInfo = useSelector((state) => state.appState.countryInfo);
  const tableData = useSelector((state) => state.appState.tableData);
  const mapCountries = useSelector((state) => state.appState.mapCountries);
  const mapCenter = useSelector((state) => state.appState.mapCenter);
  const mapZoom = useSelector((state) => state.appState.mapZoom);
  const casesType = useSelector((state) => state.appState.casesType);
  const timeline = useSelector((state) => state.appState.timeline);

  useEffect(() => {
    dispatch(actions.initializeCountiesData());
  }, [dispatch]);

  const handleCountryChange = async (e) => {
    const countryKey = e.target.value;
    dispatch(changeCountry(countryKey));
  };

  return (
    <div className="app">
      <div className="app__left-block">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <div className="app__header-buttons">
            <ButtonGroup color="primary" variant="contained">
              <Link to="/map">
                <Button disabled={location.pathname.endsWith("/map")}>
                  Map
                </Button>
              </Link>
              <Link to="/chart">
                <Button disabled={location.pathname.endsWith("/chart")}>
                  Chart
                </Button>
              </Link>
            </ButtonGroup>
            <div className="app__dropdown">
              <Select
                variant="outlined"
                value={targetCountry}
                onChange={handleCountryChange}
              >
                <MenuItem key="worldwide" value="worldwide">
                  Worldwide
                </MenuItem>
                {countries.map(({ value, name }) => (
                  <MenuItem key={value} value={value}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
        </div>
        <Switch>
          <Route path="/map">
            <div className="app__statistics">
              <InfoCard
                className="app__cases"
                active={casesType === "cases"}
                casesType={casesType}
                onClick={() => dispatch(actions.setCasesType("cases"))}
                key="Cases"
                title="Cases"
                cases={normalizeNumbers(countryInfo.todayCases)}
                total={normalizeNumbers(countryInfo.cases)}
              />
              <InfoCard
                className="app__recovered"
                active={casesType === "recovered"}
                casesType={casesType}
                onClick={() => dispatch(actions.setCasesType("recovered"))}
                key="Recovered"
                title="Recovered"
                cases={normalizeNumbers(countryInfo.todayRecovered)}
                total={normalizeNumbers(countryInfo.recovered)}
              />
              <InfoCard
                className="app__deaths"
                active={casesType === "deaths"}
                casesType={casesType}
                onClick={() => dispatch(actions.setCasesType("deaths"))}
                key="Deaths"
                title="Deaths"
                cases={normalizeNumbers(countryInfo.todayDeaths)}
                total={normalizeNumbers(countryInfo.deaths)}
              />
            </div>
            <div className="app__map">
              <Map
                countries={mapCountries}
                casesType={casesType}
                center={mapCenter}
                zoom={mapZoom}
              />
            </div>
          </Route>
          <Route path="/chart">
            <div className="app__diagrams">
              <div className="diagrams__container">
                <div className="diagrams__title">Total</div>
                <Doughnut
                  data={{
                    labels: ["Cases", "Recovered", "Deaths"],
                    datasets: [
                      {
                        label: "Daily data",
                        title: "DAILY",
                        data: [
                          countryInfo.cases,
                          countryInfo.recovered,
                          countryInfo.deaths,
                        ],
                        backgroundColor: [
                          casesTypeColors.cases.hex,
                          casesTypeColors.recovered.hex,
                          casesTypeColors.deaths.hex,
                        ],
                        hoverOffset: 10,
                      },
                    ],
                  }}
                  options={diagramOptions}
                  onElementsClick={(element) => {
                    console.log("elements", element[0]);
                    if (
                      !countryInfo.cases &&
                      !countryInfo.recovered &&
                      !countryInfo.deaths
                    )
                      return;
                    switch (element?.[0]?._index) {
                      case 0: {
                        dispatch(actions.setCasesType("cases"));
                        break;
                      }
                      case 1: {
                        dispatch(actions.setCasesType("recovered"));
                        break;
                      }
                      case 2: {
                        dispatch(actions.setCasesType("deaths"));
                        break;
                      }
                      default: {
                        break;
                      }
                    }
                  }}
                />
              </div>
              <div className="diagrams__container">
                <div className="diagrams__title">Today</div>
                <Doughnut
                  data={{
                    labels: [
                      "Today`s Cases",
                      "Today`s Recovered",
                      "Today`s Deaths",
                    ],
                    datasets: [
                      {
                        label: "Daily data",
                        data: [
                          countryInfo.todayCases,
                          countryInfo.todayRecovered,
                          countryInfo.todayDeaths,
                        ],
                        backgroundColor: [
                          casesTypeColors.cases.rgba,
                          casesTypeColors.recovered.rgba,
                          casesTypeColors.deaths.rgba,
                        ],
                        hoverOffset: 10,
                      },
                    ],
                  }}
                  options={diagramOptions}
                  onElementsClick={(element) => {
                    if (
                      !countryInfo.todayCases &&
                      !countryInfo.todayCases &&
                      !countryInfo.todayCases
                    )
                      return null;
                    switch (element?.[0]?._index) {
                      case 0: {
                        dispatch(actions.setCasesType("cases"));
                        break;
                      }
                      case 1: {
                        dispatch(actions.setCasesType("recovered"));
                        break;
                      }
                      case 2: {
                        dispatch(actions.setCasesType("deaths"));
                        break;
                      }
                      default: {
                        break;
                      }
                    }
                  }}
                />
              </div>
            </div>
            <div className="app__chart">
              <MyChart
                casesType={casesType}
                timeline={timeline}
                country={targetCountry}
              />
            </div>
          </Route>
          <Redirect to="/map" />
        </Switch>
      </div>
      <div className="app__right-block">
        <Card>
          <CardContent>
            <h2>Live worldwide {casesType}</h2>
            <h3>
              {`Total: ${numeral(
                tableData.reduce((acc, country) => acc + country[casesType], 0)
              ).format("0,0")} `}
              <br />
              {`Today: +${numeral(
                tableData.reduce(
                  (acc, country) =>
                    acc + country[`today${capitalizeFirstLetter(casesType)}`],
                  0
                )
              ).format("0,0")}`}
            </h3>
            <Table countries={tableData} casesType={casesType} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
