import { Pressable, StyleSheet, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { ThemedText } from '../themed-text';
import { PostImageGrid } from './PostImageGrid';

export type CommunityCardType = {
    title: string;
    description: string;
    icon: string;
    onPress: () => void;
}

export function CommunityCard({ title, description, icon, onPress }: CommunityCardType) {
    return (
        <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 12 }}>
                <View style={{ gap: 16, flexDirection: "row", alignItems: "center" }}>
                    <Image
                        source={{ uri: "https://cdn.dribbble.com/userupload/16872204/file/original-26f31594aef1dbd378f369ed68eb8f4e.png" }}
                        style={{ width: 28, height: 28, borderRadius: 6 }}
                    />
                    <View>
                        <ThemedText type="default">FupporBuzz</ThemedText>
                        <ThemedText type="code">Suggest for you</ThemedText>
                    </View>
                </View>
                <Pressable>
                    <ThemedText type='link'>Follow</ThemedText>
                </Pressable>
            </View>
            <View style={{ marginVertical: 16, overflow: "hidden" }}>
                <PostImageGrid
                    images={[
                        { uri: "https://i.pinimg.com/1200x/78/71/71/787171bff0b6c50caa54d196df548c35.jpg" },
                        { uri: "https://i.pinimg.com/1200x/25/9d/e2/259de226b5a4e17833dc61528f6d76d4.jpg" },
                        { uri: "https://i.pinimg.com/736x/66/e9/ef/66e9efa3ffec02ddaa6b917f710dc0f7.jpg" },
                    ]}
                />
            </View>
            <View style={{ flexDirection: "row", gap: 10, paddingHorizontal: 12, justifyContent: "space-evenly" }}>
                <Pressable style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
                    <SymbolView name='heart' size={16} tintColor='black' />
                    <ThemedText type='link'>12k</ThemedText>
                </Pressable>
                <Pressable style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
                    <SymbolView name='message' size={16} tintColor='black' />
                    <ThemedText type='link'>12k</ThemedText>
                </Pressable>
                <Pressable style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
                    <ThemedText type='link'>Share</ThemedText>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.three,
        paddingHorizontal: Spacing.four,
        paddingVertical: Spacing.four,
        borderRadius: Spacing.four,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255, 255, 255, 0.14)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        color: '#ffffff',
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '500',
        flexShrink: 1,
    },
    description: {
        color: '#ffffff',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '400',
        flexShrink: 1,
    },
});