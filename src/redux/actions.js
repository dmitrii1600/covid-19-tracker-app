export const initializeCountiesData = () => ({
  type: "INITIALIZE_COUNTRIES_DATA",
});

export const initializeCountiesDataSuccess = (
  countries,
  tableData,
  mapCountries,
  countryInfo
) => ({
  type: "INITIALIZE_COUNTRIES_DATA_SUCCESS",
  payload: { countries, tableData, mapCountries, countryInfo },
});

export const initializeCountiesDataFailure = (error) => ({
  type: "INITIALIZE_COUNTRIES_DATA_FAILURE",
  payload: error,
});

export const changeCountry = (countryKey) => ({
  type: "CHANGE_COUNTRY",
  payload: { countryKey },
});

export const changeCountrySuccess = (countryKey, mapCenter, data) => ({
  type: "CHANGE_COUNTRY_SUCCESS",
  payload: { countryKey, mapCenter, data },
});

export const changeCountryFailure = (error) => ({
  type: "CHANGE_COUNTRY_Failure",
  payload: error,
});

export const loadChartData = (casesType, timeline, country) => ({
  type: "LOAD_CHART_DATA",
  payload: {
    casesType,
    timeline,
    country,
  },
});

export const loadChartDataSuccess = (chartData) => ({
  type: "LOAD_CHART_DATA_SUCCESS",
  payload: { chartData },
});

export const loadChartDataFailure = (error) => ({
  type: "LOAD_CHART_DATA_FAILURE",
  payload: error,
});

export const setCasesType = (casesType) => ({
  type: "SET_CASES_TYPE",
  payload: {
    casesType,
  },
});

export const setTimeline = (timeline) => ({
  type: "SET_TIMELINE",
  payload: {
    timeline,
  },
});
