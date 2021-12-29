// next
import Head from "next/head";
import { GetStaticProps } from "next";

// mui
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { Theme, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";

// firebase
import { doc, getDoc } from "firebase/firestore";
import db from "../../firebase/index";

// constants
import { EXAM_ID } from "../../constants/exam";

// components
import ResourceCard from "../../components/ResourceCard";

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

function Resource({ exam }: any) {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <Head>
        <title>Result-Resource</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Card className={classes.card}>
        <Typography
          variant="h4"
          fontWeight={theme.typography.fontWeightBold}
          textAlign="center"
        >
          Resources
        </Typography>
        <Box
          sx={{
            backgroundColor: theme.palette.secondary.main,
            padding: theme.spacing(1),
          }}
        >
          <Typography color={theme.palette.secondary.contrastText}>
            Marking Schemes
          </Typography>
        </Box>
        <Grid container gap={theme.spacing(2)}>
          {exam?.resource?.markingSchemes?.map((scheme: any, index: number) => {
            return (
              <Grid key={index} item xs={12} md lg>
                <ResourceCard resource={scheme} />
              </Grid>
            );
          })}
        </Grid>

        <Box
          sx={{
            backgroundColor: theme.palette.secondary.main,
            padding: theme.spacing(1),
            marginTop: theme.spacing(2),
          }}
        >
          <Typography color={theme.palette.secondary.contrastText}>
            Papers
          </Typography>
        </Box>
        <Grid container gap={theme.spacing(2)}>
          {exam?.resource?.papers?.map((paper: any, index: number) => {
            return (
              <Grid key={index} item xs={12} md lg>
                <ResourceCard resource={paper} />
              </Grid>
            );
          })}
        </Grid>
      </Card>
    </Box>
  );
}

export default Resource;

export const getStaticProps: GetStaticProps = async () => {
  // get relevant exam doc
  const docRef = doc(db, "exams", EXAM_ID);
  const examDoc = await getDoc(docRef);

  return {
    props: {
      exam: examDoc.data(),
    },
  };
};
