import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CommunityCard } from "@/components/community-related/CommunityCard";
import { SidebarMenuButton } from "@/components/sidebar/sidebar-menu-button";
import { ThemedView } from "@/components/themed-view";
import { communityData } from "@/constants/community-data";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <View style={styles.header}>
          <SidebarMenuButton />
        </View>

        <FlatList
          style={styles.list}
          data={communityData}
          renderItem={({ item }) => (
            <ThemedView style={styles.stepContainer}>
              <CommunityCard
                title={item.title}
                description={item.description}
                icon={item.icon}
                onPress={() => {
                  console.log("Selected community:", item.id);
                }}
                authorName={item.authorName}
                authorImage={item.authorImage}
                timeAgo={item.timeAgo}
                postImages={item.postImages}
                likeCount={item.likeCount}
                commentCount={item.commentCount}
                shareCount={item.shareCount}
                isFollowing={item.isFollowing}
              />
            </ThemedView>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingHorizontal: Spacing.three,
            paddingBottom: BottomTabInset + Spacing.three,
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  header: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.three,
  },
  safeArea: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    gap: Spacing.three,
    maxWidth: MaxContentWidth,
  },
  list: {
    flex: 1,
    width: "100%",
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: "stretch",
    borderRadius: Spacing.three,
    marginBottom: Spacing.three,
  },
});
