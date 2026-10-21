export type CommunityPost = {
  id: string;
  title: string;
  description: string;
  icon: string;
  authorName: string;
  authorImage: string;
  timeAgo: string;
  postImages: string[];
  likeCount: number;
  commentCount: number;
  shareCount: number;
  isFollowing: boolean;
};

export const communityData: CommunityPost[] = [
  {
    id: "community-1",
    title: "NBA Fans Community",
    description:
      "Your home for everything NBA. Share game reactions, debate the best players, and connect with basketball fans worldwide.",
    icon: "group",
    authorName: "NBA Fan Zone",
    authorImage: "https://i.pravatar.cc/150?img=12",
    timeAgo: "2 hours ago",
    postImages: [
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800",
      "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800",
    ],
    likeCount: 128,
    commentCount: 24,
    shareCount: 12,
    isFollowing: true,
  },
  {
    id: "community-2",
    title: "NBA Highlights & Dunks",
    description:
      "Relive insane dunks, clutch shots, buzzer beaters, and unforgettable plays from around the league. Which highlight is your favorite?",
    icon: "group",
    authorName: "HoopHighlights",
    authorImage: "https://i.pravatar.cc/150?img=13",
    timeAgo: "5 hours ago",
    postImages: [
      "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800",
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800",
    ],
    likeCount: 286,
    commentCount: 48,
    shareCount: 35,
    isFollowing: false,
  },
  {
    id: "community-3",
    title: "NBA Player Discussions",
    description:
      "Talk about superstars, rising rookies, MVP candidates, legendary careers, and all-time player rankings. Who is the GOAT?",
    icon: "group",
    authorName: "BasketballDebate",
    authorImage: "https://i.pravatar.cc/150?img=47",
    timeAgo: "1 day ago",
    postImages: [
      "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800",
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800",
    ],
    likeCount: 215,
    commentCount: 76,
    shareCount: 27,
    isFollowing: true,
  },
  {
    id: "community-4",
    title: "NBA Team Fan Clubs",
    description:
      "Rep your favorite NBA team, discuss matchups, celebrate wins, and talk about rivalries. Every team has a place here.",
    icon: "group",
    authorName: "TeamHoops",
    authorImage: "https://i.pravatar.cc/150?img=44",
    timeAgo: "1 day ago",
    postImages: [
      "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800",
      "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800",
    ],
    likeCount: 194,
    commentCount: 53,
    shareCount: 21,
    isFollowing: false,
  },
  {
    id: "community-5",
    title: "NBA Trades & Rumors",
    description:
      "Discuss trade rumors, free agency, draft prospects, roster moves, and blockbuster deals. Which move would change the league?",
    icon: "group",
    authorName: "HoopInsider",
    authorImage: "https://i.pravatar.cc/150?img=32",
    timeAgo: "2 days ago",
    postImages: [
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800",
      "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800",
    ],
    likeCount: 342,
    commentCount: 57,
    shareCount: 41,
    isFollowing: false,
  },
  {
    id: "community-6",
    title: "Fantasy NBA League",
    description:
      "Build your fantasy roster, compare player stats, discuss draft picks, and share strategies to dominate your fantasy league.",
    icon: "group",
    authorName: "FantasyHoops",
    authorImage: "https://i.pravatar.cc/150?img=25",
    timeAgo: "3 days ago",
    postImages: [
      "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800",
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800",
    ],
    likeCount: 176,
    commentCount: 42,
    shareCount: 19,
    isFollowing: true,
  },
];
