export interface showReelI {
  title: string;
  vimeoId: string;
  thumbnail: string;
  stats: {
    views: number;
    likes: number;
    comments: number;
    repost: number;
  };
}

/** High-res Vimeo thumbnail via vumbnail.com (free, no API key). */
function vimeoThumb(id: string) {
  return `https://vumbnail.com/${id}_large.jpg`;
}

// Example project data — replace with your own Vimeo IDs, titles, and stats.
export const showRealData: showReelI[] = [
  {
    title: "Project One",
    vimeoId: "000000000", // TODO: replace with your Vimeo ID
    thumbnail: vimeoThumb("000000000"),
    stats: {
      views: 100000,
      likes: 10000,
      comments: 100,
      repost: 500,
    },
  },
  {
    title: "Project Two",
    vimeoId: "000000000", // TODO: replace with your Vimeo ID
    thumbnail: vimeoThumb("000000000"),
    stats: {
      views: 100000,
      likes: 10000,
      comments: 100,
      repost: 500,
    },
  },
  {
    title: "Project Three",
    vimeoId: "000000000", // TODO: replace with your Vimeo ID
    thumbnail: vimeoThumb("000000000"),
    stats: {
      views: 100000,
      likes: 10000,
      comments: 100,
      repost: 500,
    },
  },
  {
    title: "Project Four",
    vimeoId: "000000000", // TODO: replace with your Vimeo ID
    thumbnail: vimeoThumb("000000000"),
    stats: {
      views: 100000,
      likes: 10000,
      comments: 100,
      repost: 500,
    },
  },
  {
    title: "Project Five",
    vimeoId: "000000000", // TODO: replace with your Vimeo ID
    thumbnail: vimeoThumb("000000000"),
    stats: {
      views: 100000,
      likes: 10000,
      comments: 100,
      repost: 500,
    },
  },
];
