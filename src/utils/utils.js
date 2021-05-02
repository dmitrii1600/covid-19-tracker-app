import numeral from "numeral";

export const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    rgba: "rgba(204, 16, 52, 0.5)",
    multiplier: 200,
  },
  recovered: {
    hex: "#7dd71d",
    rgba: "rgba(125, 215, 29, 0.5)",
    multiplier: 300,
  },
  deaths: {
    hex: "#000000",
    rgba: "rgba(0, 0, 0, 0.5)",
    multiplier: 500,
  },
};

export const diagramOptions = {
  responsive: true,
  maintainAspectRatio: true,
  legend: {
    display: false,
  },
  elements: {
    arc: {
      borderWidth: 3,
    },
  },
  tooltips: {
    callbacks: {
      title: function (tooltipItem, data) {
        return data["labels"][tooltipItem[0]["index"]];
      },
      label: function (tooltipItem, data) {
        return numeral(
          data["datasets"][0]["data"][tooltipItem["index"]]
        ).format("+0,0");
      },
    },
  },
};

export const chartOptions = {
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

export const sortData = (data, casesType = "cases") => {
  let sortedData = [...data];
  sortedData.sort((a, b) => b[casesType] - a[casesType]);
  return sortedData;
};

export const normalizeNumbers = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const normalizeChartData = (data, casesType, dataType) => {
  const targetData = dataType === "worldwide" ? data : data.timeline;
  let chartData = [];
  let lastDataPoint;
  for (let date in targetData[casesType]) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: targetData[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = targetData[casesType][date];
  }
  return chartData;
};

export const capitalizeFirstLetter = (string) =>
  string[0].toUpperCase() + string.slice(1);
