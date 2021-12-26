// mui
import { Typography, Box, Theme, Card } from "@mui/material";
import { makeStyles } from "@mui/styles";

// next
import { GetStaticProps } from "next";

// components
import LeaderboardRow, {
  LeaderboardData,
} from "../../components/LeaderboardRow";

// constants
import { TEST_NAME } from "../../constants/exam";

// firebase
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import db from "../../firebase/index";

const useStyles = makeStyles((theme: Theme) => ({
  box: { backgroundColor: theme.palette.primary.light, padding: "2em 0" },
  card: {
    padding: "4em 1em",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "70%",
      maxWidth: "50em",
    },
  },
  leaderboardBox: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
  },
}));

export default function Leaderboard(props: any) {
  const data = props.data as LeaderboardData[];
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <Card className={classes.card}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", marginTop: "-1em" }}
        >
          Leaderboard
        </Typography>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          {TEST_NAME}
        </Typography>
        <Box className={classes.leaderboardBox}>
          {data.map((d, index) => {
            return <LeaderboardRow data={d} key={index} />;
          })}
        </Box>
      </Card>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const q = query(collection(db, "examines"), orderBy("rank"), limit(10));
  const d = await getDocs(q);
  let out: LeaderboardData[] = [];
  d.docs.forEach((doc) => {
    const obj = doc.data();
    out.push({
      name: obj.name,
      // school: obj.school,
      stream: obj.stream,
      rank: obj.rank,
      zScore: obj.zScore,
    });
  });
  return {
    props: {
      data: out,
    },
  };
};
