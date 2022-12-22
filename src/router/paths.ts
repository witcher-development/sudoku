type PathParam = string;


type HomePagePath = '/';
type GamePagePath = `/game/${PathParam}`;

export type Paths = HomePagePath | GamePagePath;
