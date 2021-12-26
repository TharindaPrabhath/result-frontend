// mui
import { Typography, Box, Theme, Card } from "@mui/material";
import { grey } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";

import { isEmpty } from "../utils";

export interface LeaderboardData {
  name: string;
  stream?: string;
  school?: string;
  rank: number;
  zScore: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "0.5em 1em",
    height: "4em",
  },
  zScore: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

export default function LeaderboardRow({ data }: { data: LeaderboardData }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Box sx={{ flex: 1 }}>
        <Typography sx={{ fontWeight: 600 }}>{data.rank}</Typography>
      </Box>
      <Box sx={{ flex: 2, width: "100%" }}>
        <Typography sx={{ fontWeight: 600 }}>{data.name}</Typography>
        {!isEmpty(data.school!) && (
          <Typography color={grey[500]}>{data.school}</Typography>
        )}
      </Box>
      <Box className={classes.zScore}>
        <Typography>{data.zScore}</Typography>
      </Box>
    </Card>
  );
}
