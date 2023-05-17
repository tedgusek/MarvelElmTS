interface Character {
  name: string;
  description: string;
  thumbnail: Thumbnail;
}

interface Thumbnail {
  path: string;
  extension: string;
}

export { Character, Thumbnail };
