// next
import Link from "next/link";

// mui
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function ResourceCard({ resource }: { resource?: any }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {resource?.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {resource?.type.replace("application/", "")}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button size="small">
          <Link href={resource?.link}>
            <a>Download</a>
          </Link>
        </Button>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          {resource?.size}
        </Typography>
      </CardActions>
    </Card>
  );
}

export default ResourceCard;
