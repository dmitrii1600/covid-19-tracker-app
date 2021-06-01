import React, { useEffect, memo } from "react";
import Loader from "react-loader-spinner";
import { Line } from "react-chartjs-2";
import { casesTypeColors, chartOptions } from "../../utils/utils";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import * as actions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

import "./Chart.scss";

function Chart({ casesType, timeline, country }) {
  const dispatch = useDispatch();
  const chartData = useSelector((state) => state.appState.chartData);

  useEffect(() => {
    dispatch(actions.loadChartData(casesType, timeline, country));
  }, [casesType, timeline, country, dispatch]);

  if (chartData) {
    return (
      <div className="chart">
        <h2 className="chart__header">Stats {casesType}</h2>
        <div className="chart__time-dropdown">
          <Select
            variant="outlined"
            value={timeline}
            onChange={(e) => dispatch(actions.setTimeline(e.target.value))}
          >
            {[7, 30, 90, 180, 365].map((item) => (
              <MenuItem key={item} value={item}>
                {item} days
              </MenuItem>
            ))}
            <MenuItem key="all" value="all">
              All time
            </MenuItem>
          </Select>
        </div>
        {Boolean(chartData.length) && (
          <Line
            data={{
              datasets: [
                {
                  backgroundColor: casesTypeColors[casesType].rgba,
                  borderColor: casesTypeColors[casesType].hex,
                  data: chartData,
                },
              ],
            }}
            options={chartOptions}
          />
        )}
      </div>
    );
  }

  return (
    <div className="chart">
      <Loader
        className="chart__loader"
        type="Oval"
        color="#000000"
        height={50}
        width={50}
      />
    </div>
  );
}

export default memo(Chart);
