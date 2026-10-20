import { Pressable, StyleSheet, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { Image } from 'expo-image';
import { ThemedText } from '../themed-text';

export type CommunityCardType = {
    title: string;
    description: string;
    icon: string;
    onPress: () => void;
}

export function CommunityCard({ title, description, icon, onPress }: CommunityCardType) {
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ gap: 16, flexDirection: "row", alignItems: "center" }}>
                <Image
                    source={{ uri: "https://cdn.dribbble.com/userupload/16872204/file/original-26f31594aef1dbd378f369ed68eb8f4e.png" }}
                    style={{ width: 48, height: 48, borderRadius: 12 }}
                />
                <View>
                    <ThemedText type="default">FupporBuzz</ThemedText>
                    <ThemedText type="code">Suggest for you</ThemedText>
                </View>
            </View>
            <Pressable>
                <ThemedText>Follow</ThemedText>
            </Pressable>
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