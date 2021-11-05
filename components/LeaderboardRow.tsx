import { Typography, Box, Theme, Card } from "@mui/material";
import { grey } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import { isEmpty } from "../utils";

export interface LeaderboardData {
  name: string;
  school?: string;
  rank: number;
  zScore: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  box: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "0.5em 1em",
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
    <Card className={classes.box}>
      <Box style={{ width: "2em" }}>
        <Typography sx={{ fontWeight: 600 }}>{data.rank}</Typography>
      </Box>
      <Box>
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
