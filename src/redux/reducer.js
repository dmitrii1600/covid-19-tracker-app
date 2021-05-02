import * as actions from "./actions";

const initialState = {
  countries: [],
  targetCountry: "worldwide",
  countryInfo: {},
  tableData: [],
  mapCountries: [],
  mapCenter: [0, 0],
  mapZoom: 2,
  casesType: "cases",
  timeline: 30,
  chartData: [],
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case actions.initializeCountiesDataSuccess().type: {
      const {
        countries,
        tableData,
        mapCountries,
        countryInfo,
      } = action.payload;
      return {
        ...state,
        countries,
        tableData,
        mapCountries,
        countryInfo,
      };
    }
    case actions.changeCountrySuccess().type: {
      const { countryKey, mapCenter, data } = action.payload;
      return {
        ...state,
        targetCountry: countryKey,
        mapCenter,
        countryInfo: { ...data },
        mapZoom: 4,
      };
    }
    case actions.loadChartDataSuccess().type: {
      const { chartData } = action.payload;
      return {
        ...state,
        chartData,
      };
    }
    case actions.setCasesType().type: {
      const { casesType } = action.payload;
      return {
        ...state,
        casesType,
      };
    }
    case actions.setTimeline().type: {
      const { timeline } = action.payload;
      return {
        ...state,
        timeline,
      };
    }
    default:
      return state;
  }
}
