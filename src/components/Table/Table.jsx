import React, { memo } from "react";
import numeral from "numeral";
import {
  calculateTravelStatus,
  capitalizeFirstLetter,
  sortData,
} from "../../utils/utils";

import "./Table.scss";

function Table({ countries, casesType }) {
  const sortedCountries = sortData(countries, casesType);
  const todayCasesType = `today${capitalizeFirstLetter(casesType)}`;
  return (
    <div className="table">
      {sortedCountries.map((c) => {
        const result = calculateTravelStatus(c.active, c.population);
        let status;
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
              <span className="info-status info-status--unknown">Unknown</span>
            );
          }
        }
        return (
          <tr key={c.country}>
            <td>
              {c.country}&nbsp;{status}
            </td>
            <td>
              <strong>
                {numeral(c[casesType]).format("0,0")}
                {`(+${numeral(c[todayCasesType]).format("0,0")})`}
              </strong>
            </td>
          </tr>
        );
      })}
    </div>
  );
}

export default memo(Table);
