import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Movie } from "./types";
import usePromise from "react-use-promise";
import { getWikipediaLinkAndDescription } from "./wikipedia";
import { Box, CircularProgress, Grid, Link } from "@material-ui/core";

export default function MovieDialog(props: {
  movie?: Movie;
  setOpen: (open: boolean) => void;
  isOpen: boolean;
}) {
  const handleClose = () => {
    props.setOpen(false);
  };
  if (!props.movie) return null;
  const [result, error, state] = usePromise(
    getWikipediaLinkAndDescription(props.movie.title, props.movie.releaseDate),
    [props.movie]
  );
  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.movie.title}</DialogTitle>
        <DialogContent>
          <img src={props.movie.poster} />
          <DialogContentText id="alert-dialog-description">
            {state === "pending" && <CircularProgress size={30} />}
            {state === "resolved" && (
              <>
                <Link target="_blank" href={result?.wikipediaPageLink}>
                  Wikipedia Link
                </Link>{" "}
                -{" "}
                <Link
                  target="_blank"
                  href={`https://www.imdb.com/title/${props.movie.imdbID}/`}
                >
                  IMDB Link
                </Link>
                <br />
                {result?.wikipediaDescriptionExtract}
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
