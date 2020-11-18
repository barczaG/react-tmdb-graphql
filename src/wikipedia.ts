import _ from "lodash";
import dayjs from "dayjs";
import axios from "axios";

// Returns array of titles
export async function wikipediaOpenSearch(term: string): Promise<string[]> {
  const { data } = await axios.get(`https://en.wikipedia.org/w/api.php`, {
    params: {
      format: "json",
      action: "opensearch",
      search: term,
      origin: "*",
      limit: 500,
    },
  });

  return data[1];
}

export async function wikipediaExtractQuery(term: string): Promise<string> {
  const { data } = await axios.get(`https://en.wikipedia.org/w/api.php`, {
    params: {
      format: "json",
      action: "query",
      prop: "extracts",
      explaintext: 1,
      exintro: true,
      titles: term,
      origin: "*",
    },
  });

  // Some magic in order to map the ridiculous api response from wikipedia rest api
  // HINT response example: {"batchcomplete":"","query":{"normalized":[{"from":"The_Matrix","to":"The Matrix"}],"pages":{"30007":{"pageid":30007,"ns":0,"title":"The Matrix","extract":"The Matrix is a 1999 American science fiction action film written and directed by the Wachowskis, and produced by Joel Silver. It stars Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving, and Joe Pantoliano and is the first installment in the Matrix franchise. It depicts a dystopian future in which humanity is unknowingly trapped inside a simulated reality, the Matrix, created by intelligent machines to distract humans while using their bodies as an energy source. When computer programmer Thomas Anderson, under the hacker alias \"Neo\", uncovers the truth, he \"is drawn into a rebellion against the machines\" along with other people who have been freed from the Matrix.\nThe Matrix is an example of the cyberpunk subgenre of science fiction. The Wachowskis' approach to action scenes was influenced by Japanese animation and martial arts films, and the film's use of fight choreographers and wire fu techniques from Hong Kong action cinema influenced subsequent Hollywood action film productions. The film popularized a visual effect known as \"bullet time\", in which the heightened perception of certain characters is represented by allowing the action within a shot to progress in slow-motion while the camera appears to move through the scene at normal speed, allowing the sped-up movements of certain characters to be perceived normally. While some critics have praised the film for its handling of difficult subjects, others have said the deeper themes are largely overshadowed by its action scenes.\nThe Matrix was first released in the United States on March 31, 1999, and grossed over $460 million worldwide. It was well-received by many critics and won four Academy Awards, as well as other accolades, including BAFTA Awards and Saturn Awards. The Matrix was praised for its innovative visual effects, action sequences, cinematography and entertainment value. The film is considered to be among the best science fiction films of all time, and was added to the National Film Registry for preservation in 2012. The success of the film led to the release of two feature film sequels in 2003, The Matrix Reloaded and The Matrix Revolutions, which were also written and directed by the Wachowskis, and produced by Joel Silver. The Matrix franchise was further expanded through the production of comic books, video games and animated short films, with which the Wachowskis were heavily involved. The franchise has also inspired books and theories expanding on some of the religious and philosophical ideas alluded to in the films. A fourth film is scheduled for release on December 22, 2021."}}}}
  const movieDescriptionExtract = _.chain(data)
    .get(["query", "pages"])
    // @ts-ignore
    .values()
    .get(["0", "extract"])
    .value();

  return movieDescriptionExtract;
}

const toSnakeCase = (string: string) => {
  return string.split(" ").join("_");
};

export const getWikipediaLinkAndDescription = async (
  movieTitle: string,
  movieReleaseDate: string
) => {
  const wikipediaTitleOptions = await wikipediaOpenSearch(movieTitle);

  const releaseYear = dayjs(movieReleaseDate).year();

  let wikipediaMovieTitle;

  // NOTE: The logic is based on these conventions: https://en.wikipedia.org/wiki/Wikipedia:Naming_conventions_(films)
  // Let's try to find an exact match. Movie title + release year + film = instant win
  if (
    _.includes(wikipediaTitleOptions, `${movieTitle} (${releaseYear} film)`)
  ) {
    wikipediaMovieTitle = `${movieTitle} (${releaseYear} film)`;
  }
  // If there is only one movie with the given title
  else if (_.includes(wikipediaTitleOptions, `${movieTitle} (film)`)) {
    wikipediaMovieTitle = `${movieTitle} (film)`;
  }
  // Let's fall back to the first result. This may result in some falsy match, but this is a POC, so we hope it's okay 😇
  else if (_.includes(wikipediaTitleOptions, movieTitle)) {
    wikipediaMovieTitle = wikipediaTitleOptions[0];
  }

  if (!wikipediaMovieTitle) {
    return {
      wikipediaPageLink: undefined,
      wikipediaDescriptionExtract: undefined,
    };
  }

  const wikipediaMovieTitleSnakeCase = toSnakeCase(wikipediaMovieTitle);

  const wikipediaPageLink = `https://en.wikipedia.org/wiki/${wikipediaMovieTitleSnakeCase}`;
  const wikipediaDescriptionExtract = await wikipediaExtractQuery(
    wikipediaMovieTitleSnakeCase
  );

  return { wikipediaPageLink, wikipediaDescriptionExtract };
};
