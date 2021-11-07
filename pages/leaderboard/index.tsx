// mui
import { Typography, Box, Theme, Card } from "@mui/material";
import { makeStyles } from "@mui/styles";

// next
import { GetServerSideProps } from "next";

// components
import LeaderboardRow from "../../components/LeaderboardRow";

// constants
import { TEST_NAME } from "../../constants";
import { LEADERBOARD_DUMMY_DATA } from "../../constants/dummyData";

// firebase
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../firebase";

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

export default function Leaderboard({ props }: { props: any }) {
  console.log(props);
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
          {LEADERBOARD_DUMMY_DATA.map((data, index) => {
            return <LeaderboardRow data={data} key={index} />;
          })}
        </Box>
      </Card>
    </Box>
  );
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const q = query(collection(db, "examines"), orderBy("rank"));
//   const d = await getDocs(q);
//   let out: any[] = [];
//   d.docs.forEach((doc) => {
//     out.push(doc.data());
//   });
//   return {
//     props: out,
//   };
// };
