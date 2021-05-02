import React, { memo } from "react";
import numeral from "numeral";

import "./Table.scss";
import { capitalizeFirstLetter, sortData } from "../../utils/utils";

function Table({ countries, casesType }) {
  const sortedCountries = sortData(countries, casesType);
  const todayCasesType = `today${capitalizeFirstLetter(casesType)}`;
  return (
    <div className="table">
      {sortedCountries.map((c) => (
        <tr key={c.country}>
          <td>{c.country}</td>
          <td>
            <strong>
              {numeral(c[casesType]).format("0,0")}
              {`(+${numeral(c[todayCasesType]).format("0,0")})`}
            </strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default memo(Table);
