import {
  getWikipediaLinkAndDescription,
  wikipediaExtractQuery,
  wikipediaOpenSearch,
} from "./wikipedia";

it("wikipediaOpenSearch", async () => {
  const ret = await wikipediaOpenSearch("The Matrix");
  expect(ret).toEqual([
    "The Matrix",
    "The Matrix (franchise)",
    "The Matrix Reloaded",
    "The Matrix Revolutions",
    "The Matrix 4",
    "The Matrix Online",
    "The Matrix: Music from the Motion Picture",
    "The Matrix: Path of Neo",
    "The Matrix (club)",
    "The Matrix (team)",
    "The Matrix Reloaded: The Album",
    "The Matrix Revisited",
    "The Matrixial Gaze",
    "The Matrix: Original Motion Picture Score",
    "The Matrix (The Matrix album)",
    "The Matrix Reloaded (score)",
    "The Matrix Revolutions: Music from the Motion Picture",
    "The Matrix Theatre Company",
    "The Matrix defense",
    "The Matrix Awards",
    "The Matrix Revolutions (score)",
    "The Matrix (magazine)",
    "The Matrix (disambiguation)",
    "The Matrix (Eric Prydz song)",
    "The Matrix (Smokepurpp song)",
    "The Matrix (Doctor Who)",
    "The Matrimony (song)",
    "The Matrimony",
    "The Matriarch",
    "The Matrimonial Momentum",
    "The Matrimonial Bed",
    "The Meatrix",
    "The Matrimonial Metric",
    "The Atrix (band)",
    "The Matriarch: Barbara Bush and the Making of an American Dynasty",
    "The Matriarch: The Kathy Pettingil Story",
    "The Matrimonial Vanity Fair",
    "Theatrix (role-playing game)",
    "Theatrix Interactive",
    "Theatrix's Hollywood",
    "Theatrix",
  ]);
});

it("wikipediaExtractQuery", async () => {
  const ret = await wikipediaExtractQuery("The Matrix");
  expect(ret).toEqual(
    'The Matrix is a 1999 American science fiction action film written and directed by the Wachowskis, and produced by Joel Silver. It stars Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving, and Joe Pantoliano and is the first installment in the Matrix franchise. It depicts a dystopian future in which humanity is unknowingly trapped inside a simulated reality, the Matrix, created by intelligent machines to distract humans while using their bodies as an energy source. When computer programmer Thomas Anderson, under the hacker alias "Neo", uncovers the truth, he "is drawn into a rebellion against the machines" along with other people who have been freed from the Matrix.\nThe Matrix is an example of the cyberpunk subgenre of science fiction. The Wachowskis\' approach to action scenes was influenced by Japanese animation and martial arts films, and the film\'s use of fight choreographers and wire fu techniques from Hong Kong action cinema influenced subsequent Hollywood action film productions. The film popularized a visual effect known as "bullet time", in which the heightened perception of certain characters is represented by allowing the action within a shot to progress in slow-motion while the camera appears to move through the scene at normal speed, allowing the sped-up movements of certain characters to be perceived normally. While some critics have praised the film for its handling of difficult subjects, others have said the deeper themes are largely overshadowed by its action scenes.\nThe Matrix was first released in the United States on March 31, 1999, and grossed over $460 million worldwide. It was well-received by many critics and won four Academy Awards, as well as other accolades, including BAFTA Awards and Saturn Awards. The Matrix was praised for its innovative visual effects, action sequences, cinematography and entertainment value. The film is considered to be among the best science fiction films of all time, and was added to the National Film Registry for preservation in 2012. The success of the film led to the release of two feature film sequels in 2003, The Matrix Reloaded and The Matrix Revolutions, which were also written and directed by the Wachowskis, and produced by Joel Silver. The Matrix franchise was further expanded through the production of comic books, video games and animated short films, with which the Wachowskis were heavily involved. The franchise has also inspired books and theories expanding on some of the religious and philosophical ideas alluded to in the films. A fourth film is scheduled for release on December 22, 2021.'
  );
});

it("getWikipediaLinkAndDescription", async () => {
  const ret = await getWikipediaLinkAndDescription(
    "The Matrix",
    "1999-03-30T00:00:00Z"
  );
  expect(ret).toEqual({
    wikipediaPageLink: "https://en.wikipedia.org/wiki/The_Matrix",
    wikipediaDescriptionExtract:
      'The Matrix is a 1999 American science fiction action film written and directed by the Wachowskis, and produced by Joel Silver. It stars Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving, and Joe Pantoliano and is the first installment in the Matrix franchise. It depicts a dystopian future in which humanity is unknowingly trapped inside a simulated reality, the Matrix, created by intelligent machines to distract humans while using their bodies as an energy source. When computer programmer Thomas Anderson, under the hacker alias "Neo", uncovers the truth, he "is drawn into a rebellion against the machines" along with other people who have been freed from the Matrix.\nThe Matrix is an example of the cyberpunk subgenre of science fiction. The Wachowskis\' approach to action scenes was influenced by Japanese animation and martial arts films, and the film\'s use of fight choreographers and wire fu techniques from Hong Kong action cinema influenced subsequent Hollywood action film productions. The film popularized a visual effect known as "bullet time", in which the heightened perception of certain characters is represented by allowing the action within a shot to progress in slow-motion while the camera appears to move through the scene at normal speed, allowing the sped-up movements of certain characters to be perceived normally. While some critics have praised the film for its handling of difficult subjects, others have said the deeper themes are largely overshadowed by its action scenes.\nThe Matrix was first released in the United States on March 31, 1999, and grossed over $460 million worldwide. It was well-received by many critics and won four Academy Awards, as well as other accolades, including BAFTA Awards and Saturn Awards. The Matrix was praised for its innovative visual effects, action sequences, cinematography and entertainment value. The film is considered to be among the best science fiction films of all time, and was added to the National Film Registry for preservation in 2012. The success of the film led to the release of two feature film sequels in 2003, The Matrix Reloaded and The Matrix Revolutions, which were also written and directed by the Wachowskis, and produced by Joel Silver. The Matrix franchise was further expanded through the production of comic books, video games and animated short films, with which the Wachowskis were heavily involved. The franchise has also inspired books and theories expanding on some of the religious and philosophical ideas alluded to in the films. A fourth film is scheduled for release on December 22, 2021.',
  });
});
