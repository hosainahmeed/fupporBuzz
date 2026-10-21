import { Pressable, View } from "react-native";
import { ThemedText } from "../themed-text";
import { CommentIcon } from "../ui/icons/Comment";
import { Heart } from "../ui/icons/Heart";
import { ShareIcon } from "../ui/icons/ShareIcon";

export function PostActionBar({
  likeCount,
  commentCount,
  shareCount,
}: {
  likeCount: number;
  commentCount: number;
  shareCount: number;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        justifyContent: "space-between",
      }}
    >
      <Pressable
        style={{
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
          paddingHorizontal: 4,
        }}
      >
        <Heart />
        <ThemedText type="link">{likeCount}k</ThemedText>
      </Pressable>
      <Pressable
        style={{
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
          paddingHorizontal: 4,
        }}
      >
        <CommentIcon />
        <ThemedText type="link">{commentCount}k</ThemedText>
      </Pressable>
      <Pressable
        style={{
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
          paddingHorizontal: 4,
        }}
      >
        <ShareIcon />
        <ThemedText type="link">{shareCount}k</ThemedText>
      </Pressable>
    </View>
  );
}
