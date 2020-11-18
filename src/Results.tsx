import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Movie } from "./types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: "36ch",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },
  })
);

function Item(props: { movie: Movie; handleClick: (movie: Movie) => void }) {
  const classes = useStyles();
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={props.movie.title} src={props.movie.poster} />
        </ListItemAvatar>
        <ListItemText
          style={{ cursor: "pointer" }}
          primary={props.movie.title}
          onClick={() => props.handleClick(props.movie)}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                ⭐️{props.movie.rating}
              </Typography>
              <br />
              {props.movie.keywords.join(", ")}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}

export default function Results(props: {
  movies: Movie[];
  handleClick: (movie: Movie) => void;
}) {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {props.movies.map((movie) => {
        return <Item movie={movie} handleClick={props.handleClick} />;
      })}
    </List>
  );
}
