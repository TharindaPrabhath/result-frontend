// mui
import { Typography, Box, Theme, Card, useTheme, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";

// next
import Head from "next/head";
// import { GetStaticProps } from "next";

// components
import LeaderboardRow from "../../components/LeaderboardRow";

// constants
import { TEST_NAME } from "../../constants/exam";

// firebase
// import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
// import db from "../../firebase/index";

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
    gap: theme.spacing(8),
  },
}));

export default function Leaderboard() {
  // const data = props.data as LeaderboardData[];
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Box className={classes.box}>
      <Head>
        <title>Result-Leaderboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
          <Box>
            <Box
              bgcolor={theme.palette.secondary.main}
              sx={{ padding: theme.spacing(1) }}
            >
              <Typography
                textAlign="center"
                fontWeight={theme.typography.fontWeightBold}
                color={theme.palette.secondary.contrastText}
              >
                Physical Science Stream
              </Typography>
            </Box>
            <Stack gap={theme.spacing(1)}>
              <LeaderboardRow
                data={{
                  name: "AD Alwela",
                  school: "Bandarawela Central College",
                  zScore: 2.6361,
                  rank: 1,
                }}
              />
              <LeaderboardRow
                data={{
                  name: "Chamoda Pramudika",
                  school: "G/Sri Devananda College",
                  zScore: 2.2934,
                  rank: 2,
                }}
              />
              <LeaderboardRow
                data={{
                  name: "Tharuka Cooray",
                  school: "Mahamaya Girls College - Kandy",
                  zScore: 2.1233,
                  rank: 3,
                }}
              />
            </Stack>
          </Box>

          <Box>
            <Box
              bgcolor={theme.palette.secondary.main}
              sx={{ padding: theme.spacing(1) }}
            >
              <Typography
                textAlign="center"
                fontWeight={theme.typography.fontWeightBold}
                color={theme.palette.secondary.contrastText}
              >
                Biological Science Stream
              </Typography>
            </Box>
            <Stack gap={theme.spacing(1)}>
              <LeaderboardRow
                data={{
                  name: "Benuljith Karunarathne ",
                  school: "Royal College - Colombo 7",
                  zScore: 2.6001,
                  rank: 1,
                }}
              />
              <LeaderboardRow
                data={{
                  name: " W.M.S.S.BANDARA",
                  school: "Kingswood College - Kandy",
                  zScore: 2.2311,
                  rank: 2,
                }}
              />
              <LeaderboardRow
                data={{
                  name: " Hasini Perera",
                  school: "Sripalee  College ",
                  zScore: 2.0417,
                  rank: 3,
                }}
              />
            </Stack>
          </Box>
          {/* {data.map((d, index) => {
            return <LeaderboardRow data={d} key={index} />;
          })} */}
        </Box>
      </Card>
    </Box>
  );
}

// export const getStaticProps: GetStaticProps = async () => {
//   const q = query(collection(db, "examines"), orderBy("rank"), limit(10));
//   const d = await getDocs(q);
//   let out: LeaderboardData[] = [];
//   d.docs.forEach((doc) => {
//     const obj = doc.data();
//     out.push({
//       name: obj.name,
//       // school: obj.school,
//       stream: obj.stream,
//       rank: obj.rank,
//       zScore: obj.zScore,
//     });
//   });
//   return {
//     props: {
//       data: out,
//     },
//   };
// };
