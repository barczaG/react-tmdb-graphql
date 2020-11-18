import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import { useLazyQuery, useQuery } from "@apollo/client";
import { Search, SearchVariables } from "./__generated__/Search";
import AlignItemsList from "./Results";
import { Movie } from "./types";
import MovieDialog from "./MovieDialog";
import { SEARCH } from "./operations";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function App() {
  const classes = useStyles();
  const [term, setTerm] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>(
    undefined
  );
  const handleTitleClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setDialogOpen(true);
  };
  const [search, { loading, error, called }] = useLazyQuery<
    Search,
    SearchVariables
  >(SEARCH, {
    onCompleted: (data) => {
      const movies: Movie[] = [];

      data.search.edges?.forEach((edge) => {
        if (edge?.node?.__typename === "MovieResult") {
          movies.push({
            title: edge.node.title,
            rating: edge.node.rating,
            keywords: edge.node.details.genres.map((genre) => genre.name),
            poster: edge.node.details.poster,
            releaseDate: edge.node.details.releaseDate,
            imdbID: edge.node.details.imdbID,
          });
        }
      });
      setMovies(movies);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    search({ variables: { term } });
  };
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <MovieIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          TMDB
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="search"
                label="Movie title"
                name="search"
                autoComplete="email"
                onChange={(e) => setTerm(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {loading && (
              <CircularProgress size={30} style={{ color: "white" }} />
            )}
            {!loading && "Search"}
          </Button>
        </form>
      </div>
      <AlignItemsList movies={movies} handleClick={handleTitleClick} />
      <Box mt={5}>© Apex Lab</Box>
      <MovieDialog
        movie={selectedMovie}
        setOpen={setDialogOpen}
        isOpen={isDialogOpen}
      />
    </Container>
  );
}
