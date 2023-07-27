// material
import { styled } from "@mui/material/styles";
import { Box, Container, Typography } from "@mui/material";
// hooks
import useCountdown from "hooks/useCountdown";

// ----------------------------------------------------------------------

// const RootStyle = styled(Page)(({ theme }) => ({
//   minHeight: "100%",
//   display: "flex",
//   alignItems: "center",
//   paddingTop: theme.spacing(15),
//   paddingBottom: theme.spacing(10),
// }));

const CountdownStyle = styled("div")({
  display: "flex",
  justifyContent: "center",
});

const SeparatorStyle = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  [theme.breakpoints.up("sm")]: {
    margin: theme.spacing(0, 2.5),
  },
}));

// ----------------------------------------------------------------------

export default function ComingSoon({date}) {
  const countdown = useCountdown(date);

  return (
    <Container>
      <div>
        <Typography variant="h2">Mint Starts In</Typography>
      </div>
      <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center", border:"solid 1px #0091e6", background:"#ccb200", mb:"10px" }}>
        <CountdownStyle>
          <div>
            <Typography variant="h2">{countdown.days}</Typography>
            <Typography sx={{ color: "text.primary", textAlign:"center", fontWeight:"bold" }}>Days</Typography>
          </div>

          <SeparatorStyle variant="h2">:</SeparatorStyle>

          <div>
            <Typography variant="h2">{countdown.hours}</Typography>
            <Typography sx={{ color: "text.primary", textAlign:"center", fontWeight:"bold" }}>Hours</Typography>
          </div>

          <SeparatorStyle variant="h2">:</SeparatorStyle>

          <div>
            <Typography variant="h2">{countdown.minutes}</Typography>
            <Typography sx={{ color: "text.primary", textAlign:"center", fontWeight:"bold" }}>Minutes</Typography>
          </div>

          <SeparatorStyle variant="h2">:</SeparatorStyle>

          <div>
            <Typography variant="h2">{countdown.seconds}</Typography>
            <Typography sx={{ color: "text.primary", textAlign:"center", fontWeight:"bold" }}>Seconds</Typography>
          </div>
        </CountdownStyle>
      </Box>
    </Container>
  );
}
