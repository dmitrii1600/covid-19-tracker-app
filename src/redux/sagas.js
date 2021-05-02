import * as actions from "./actions";
import { normalizeChartData } from "../utils/utils";
import { put, takeEvery, all } from "redux-saga/effects";

export function* onInitializeCountriesData() {
  try {
    let response = yield fetch("https://disease.sh/v3/covid-19/all");
    const countryData = yield response.json();

    response = yield fetch("https://disease.sh/v3/covid-19/countries");
    const countriesData = yield response.json();

    const countries = countriesData.map((country) => ({
      name: country.country,
      value: country.countryInfo.iso3,
    }));

    return yield put(
      actions.initializeCountiesDataSuccess(
        countries,
        countriesData,
        countriesData,
        countryData
      )
    );
  } catch (e) {
    return yield put(actions.initializeCountiesDataFailure(e));
  }
}

export function* onChangeCountry(action) {
  try {
    const { countryKey } = action.payload;
    const url =
      countryKey === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryKey}`;

    const response = yield fetch(url);
    const data = yield response.json();

    const mapCenter =
      countryKey === "worldwide"
        ? [0, 0]
        : [data?.countryInfo?.lat, data?.countryInfo?.long];

    return yield put(actions.changeCountrySuccess(countryKey, mapCenter, data));
  } catch (e) {
    return yield put(actions.changeCountryFailure(e));
  }
}

export function* onLoadChartData(action) {
  try {
    const { casesType, timeline, country } = action.payload;
    const url =
      country === "worldwide"
        ? `https://disease.sh/v3/covid-19/historical/all?lastdays=${timeline}`
        : `https://disease.sh/v3/covid-19/historical/${country}?lastdays=${timeline}`;
    const response = yield fetch(url);
    const data = yield response.json();

    const chartData = normalizeChartData(data, casesType, country);

    return yield put(actions.loadChartDataSuccess(chartData));
  } catch (e) {
    return yield put(actions.loadChartDataFailure(e));
  }
}

export function* watchSagas() {
  yield takeEvery(
    actions.initializeCountiesData().type,
    onInitializeCountriesData
  );
  yield takeEvery(actions.changeCountry().type, onChangeCountry);
  yield takeEvery(actions.loadChartData().type, onLoadChartData);
}

export default function* watchersRootSaga() {
  yield all([watchSagas()]);
}
