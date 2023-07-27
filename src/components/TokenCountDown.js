import { styled } from "@mui/material/styles";
import { Box, Container, Typography, Stack, Hidden, Grid} from "@mui/material";
// hooks
import { useState, useEffect } from "react";
import { gridSpacing } from "redux/constant";

// ----------------------------------------------------------------------

// const RootStyle = styled(Page)(({ theme }) => ({
//   minHeight: "100%",
//   display: "flex",
//   alignItems: "center",
//   paddingTop: theme.spacing(15),
//   paddingBottom: theme.spacing(10),
// }));

const SeparatorStyle = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  [theme.breakpoints.up("sm")]: {
    margin: theme.spacing(0, 2.5),
  },
}));

const NumberStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  width: 140,
  height: 60,
  border: "1px solid #59f1f650",

}));

// ----------------------------------------------------------------------

export default function TokenCountDown({startTime, endTime}) {
  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const setNewTime = () => {
    const sT = startTime;
    const eT = endTime;
    let distanceToNow = 0;

    if(new Date() >= startTime){
      distanceToNow = endTime - new Date();
    } else {
      distanceToNow = startTime - new Date();
    }

    const getDays = Math.floor(distanceToNow / (1000 * 60 * 60 * 24));
    const getHours = `0${Math.floor(
      (distanceToNow % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )}`.slice(-2);
    const getMinutes = `0${Math.floor(
      (distanceToNow % (1000 * 60 * 60)) / (1000 * 60)
    )}`.slice(-2);
    const getSeconds = `0${Math.floor(
      (distanceToNow % (1000 * 60)) / 1000
    )}`.slice(-2);

    setCountdown({
      days: getDays || "00",
      hours: getHours || "00",
      minutes: getMinutes || "00",
      seconds: getSeconds || "00",
    });

  };

  useEffect(() => {
    const interval = setInterval(() => setNewTime(), 1000);
    return () => clearInterval(interval);
  },[]);

  return (
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} alignItems={'center'}>
          <Grid container spacing={gridSpacing}>
            <Grid item spacing={gridSpacing} xs={12}>
                <Typography fontSize={28} lineHeight={1.5} align="center">
                  Countdown
                </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={gridSpacing} alignItems={'center'}>

            <Grid item spacing={gridSpacing} lg={3} sm={3} md={3} style={{paddingLeft:'40px'}}>    
              <NumberStyle>
                <Typography fontSize={24}>{countdown.days} DAYS </Typography>
              </NumberStyle>
            </Grid>

            <Grid item spacing={gridSpacing} lg={3} sm={3} md={3} style={{paddingLeft:'40px'}}>
              <NumberStyle>
                <Typography fontSize={24}>{countdown.hours} HRS </Typography>
              </NumberStyle>
            </Grid>

            <Grid item spacing={gridSpacing} lg={3} sm={3} md={3} style={{paddingLeft:'40px'}}>
              <NumberStyle>
                <Typography fontSize={24}>{countdown.minutes} MINS </Typography>
              </NumberStyle>
            </Grid>

            <Grid item spacing={gridSpacing} lg={3} sm={3} md={3} style={{paddingLeft:'40px'}}>
              <NumberStyle>
                <Typography fontSize={24}>{countdown.seconds} SECS</Typography>
              </NumberStyle>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
  );
}
