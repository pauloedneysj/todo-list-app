import { useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";

export default function Clock() {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [second, setSecond] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      const hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      const minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      const seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      const days = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      const months =
        date.getMonth() === 0
          ? "Janeiro"
          : date.getMonth() === 1
          ? "Fevereiro"
          : date.getMonth() === 2
          ? "Março"
          : date.getMonth() === 3
          ? "Abril"
          : date.getMonth() === 4
          ? "Maio"
          : date.getMonth() === 5
          ? "Junho"
          : date.getMonth() === 6
          ? "Julho"
          : date.getMonth() === 7
          ? "Agosto"
          : date.getMonth() === 8
          ? "Setembro"
          : date.getMonth() === 9
          ? "Outubro"
          : date.getMonth() === 10
          ? "Novembro"
          : date.getMonth() === 11
          ? "Dezembro"
          : "";
      const years = date.getFullYear();

      setHour(hours.toString());
      setMinute(minutes.toString());
      setSecond(seconds.toString());
      setDay(days.toString());
      setMonth(months);
      setYear(years.toString());
    }, 1000);
  }, []);

  return (
    <Grid container display="inline-block">
      <Grid
        item
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize={smDown ? "14px" : "17px"}
        whiteSpace="pre"
      >
        <div>{`${hour}:`}</div>
        <div>{`${minute}:`}</div>
        <div>{`${second} `}</div>
      </Grid>
      <Grid
        item
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize={smDown ? "14px" : "17px"}
        whiteSpace="pre"
      >
        <div>{`${day} de `}</div>
        <div>{`${month}, `}</div>
        <div>{`${year}`}</div>
      </Grid>
    </Grid>
  );
}
