import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import "./InfoCard.scss";

function InfoCard({ title, cases, casesType, total, active, onClick }) {
  return (
    <Card
      className={`info-card ${active && "info-card--active"} ${
        casesType === "recovered" && "info-card--green"
      } ${casesType === "deaths" && "info-card--black"}`}
      onClick={onClick}
    >
      <CardContent>
        <Typography className="info-card__title">{title}</Typography>
        <h2 className="info-card__cases">{`${cases} Daily`}</h2>
        <Typography className="info-card__total">{`${total} Total`}</Typography>
      </CardContent>
    </Card>
  );
}

export default InfoCard;
