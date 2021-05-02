import React, { useEffect, memo } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import { casesTypeColors } from "../../utils/utils";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import * as actions from "../../redux/actions";

import "./Chart.scss";
import { useDispatch, useSelector } from "react-redux";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

function Chart({ casesType, timeline, country }) {
  const dispatch = useDispatch();
  const chartData = useSelector((state) => state.appState.chartData);

  useEffect(() => {
    dispatch(actions.loadChartData(casesType, timeline, country));
  }, [casesType, timeline, country, dispatch]);

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
          options={options}
        />
      )}
    </div>
  );
}

export default memo(Chart);
