import { Pressable, StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/theme";
import { Image } from "expo-image";
import { ThemedText } from "../themed-text";
import { PostActionBar } from "./PostActionBar";
import { PostImageGrid } from "./PostImageGrid";

export type CommunityCardType = {
  title: string;
  description: string;
  icon: string;
  onPress: () => void;
  authorName: string;
  authorImage: string;
  timeAgo: string;
  postImages: string[];
  likeCount: number;
  commentCount: number;
  shareCount: number;
  isFollowing?: boolean;
};

export function CommunityCard({
  title,
  description,
  icon,
  onPress,
  authorName,
  authorImage,
  timeAgo,
  postImages,
  likeCount,
  commentCount,
  shareCount,
  isFollowing,
}: CommunityCardType) {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ gap: 16, flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{
              uri: "https://cdn.dribbble.com/userupload/16872204/file/original-26f31594aef1dbd378f369ed68eb8f4e.png",
            }}
            style={{ width: 28, height: 28, borderRadius: 6 }}
          />
          <View>
            <ThemedText type="default">{authorName}</ThemedText>
            <ThemedText type="code">{timeAgo}</ThemedText>
          </View>
        </View>
        <Pressable onPress={onPress}>
          <ThemedText type="link">
            {isFollowing ? "Following" : "Follow"}
          </ThemedText>
        </Pressable>
      </View>
      <View style={{ gap: 2, paddingVertical: 4 }}>
        <ThemedText type="small">{title}</ThemedText>
        <ThemedText type="tiny">{description}</ThemedText>
      </View>
      <View style={{ marginVertical: 16, overflow: "hidden" }}>
        <PostImageGrid images={postImages as any} />
      </View>
      <PostActionBar
        likeCount={likeCount}
        commentCount={commentCount}
        shareCount={shareCount}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.14)",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: "#ffffff",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
    flexShrink: 1,
  },
  description: {
    color: "#ffffff",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    flexShrink: 1,
  },
});
