import { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: inline-block;
  margin-top: 3px;
`;

const TimeContainer = styled.div`
  display: flex;
  font-size: 17px;
  justify-content: center;
  align-items: center;
  white-space: pre;
`;

const DateContainer = styled.div`
  display: flex;
  font-size: 17px;
  justify-content: center;
  align-items: center;
  white-space: pre;
`;

export default function Clock() {
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [second, setSecond] = useState("");
  const [session, setSession] = useState("");
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
      const sessions = hours < 12 ? "AM" : "PM";
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
      setSession(sessions);
      setDay(days.toString());
      setMonth(months);
      setYear(years.toString());
    }, 1000);
  }, []);

  return (
    <Container>
      <TimeContainer>
        <div>{`${hour}:`}</div>
        <div>{`${minute}:`}</div>
        <div>{`${second} `}</div>
        <div>{`${session}`}</div>
      </TimeContainer>
      <DateContainer>
        <div>{`${day} `}</div>
        <div>{`${month}, `}</div>
        <div>{`${year}`}</div>
      </DateContainer>
    </Container>
  );
}
