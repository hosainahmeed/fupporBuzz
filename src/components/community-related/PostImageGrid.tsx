import { Image as OptimizedImage, type ImageLoadEventData } from 'expo-image';
import { useCallback, useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type ImageSourcePropType,
  type LayoutChangeEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PostImageGridProps {
  images: ImageSourcePropType[];
  fullResolutionImages?: ImageSourcePropType[];
  maxVisible?: number;
  imageHeight?: number;
  borderRadius?: number;
}

type ImageRatioMap = Record<number, number>;

const GRID_GAP = 6;
const DEFAULT_SINGLE_RATIO = 4 / 3;

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(Math.max(value, minimum), maximum);
}

function getImageSourceKey(source: ImageSourcePropType, index: number): string {
  if (typeof source === 'number') return `asset-${source}-${index}`;
  const resolvedSource = Array.isArray(source) ? source[0] : source;
  return resolvedSource?.uri || `image-${index}`;
}

function getSingleImageHeight(width: number, aspectRatio: number, fallbackHeight: number): number {
  if (width <= 0) return fallbackHeight;

  const naturalHeight = width / Math.max(aspectRatio, 0.1);
  if (aspectRatio < 0.9) return clamp(naturalHeight, width * 1.08, width * 1.4);
  if (aspectRatio > 1.2) return clamp(naturalHeight, width * 0.52, width * 0.78);
  return clamp(naturalHeight, width * 0.82, width * 1.08);
}

export const PostImageGrid = ({
  images,
  fullResolutionImages,
  maxVisible = 4,
  imageHeight = 240,
  borderRadius = 9,
}: PostImageGridProps) => {
  const [isViewerVisible, setIsViewerVisible] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [imageRatios, setImageRatios] = useState<ImageRatioMap>({});
  const insets = useSafeAreaInsets();

  // const viewerImages = (fullResolutionImages?.length === images.length
  //   ? fullResolutionImages
  //   : images) as unknown as ImageSource[];
  const visibleCount = Math.min(images.length, Math.max(1, Math.min(maxVisible, 4)));
  const visibleImages = images.slice(0, visibleCount);
  const remainingCount = Math.max(images.length - visibleCount, 0);

  const singleHeight = useMemo(
    () =>
      getSingleImageHeight(
        containerWidth,
        imageRatios[0] || DEFAULT_SINGLE_RATIO,
        imageHeight
      ),
    [containerWidth, imageHeight, imageRatios]
  );
  const multiImageHeight = useMemo(
    () => (containerWidth > 0 ? clamp(containerWidth * 0.72, 230, 360) : imageHeight),
    [containerWidth, imageHeight]
  );

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width;
    setContainerWidth((current) => (Math.abs(current - width) > 1 ? width : current));
  }, []);

  const handleImageLoad = useCallback(
    (index: number, event: ImageLoadEventData) => {
      const { width, height } = event.source;
      if (!width || !height) return;
      const ratio = width / height;

      setImageRatios((current) =>
        Math.abs((current[index] || 0) - ratio) < 0.01
          ? current
          : { ...current, [index]: ratio }
      );
    },
    []
  );

  const openViewerAt = useCallback((index: number) => {
    setViewerIndex(index);
    setIsViewerVisible(true);
  }, []);

  const renderHeader = useCallback(
    () => (
      <View style={[styles.viewerHeader, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity
          onPress={() => setIsViewerVisible(false)}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          style={styles.closeButton}>
          close
        </TouchableOpacity>
      </View>
    ),
    [insets.top]
  );

  if (!images || images.length === 0) return null;

  const renderTile = (index: number, style?: object) => {
    const showOverlay = index === visibleCount - 1 && remainingCount > 0;

    return (
      <TouchableOpacity
        key={index}
        style={[styles.tile, style]}
        activeOpacity={0.92}
        onPress={() => openViewerAt(index)}>
        <OptimizedImage
          source={visibleImages[index] as any}
          onLoad={(event) => handleImageLoad(index, event)}
          style={[StyleSheet.absoluteFill, { borderRadius }]}
          contentFit="cover"
          cachePolicy="memory-disk"
          priority="normal"
          transition={120}
          allowDownscaling
          recyclingKey={`post-thumbnail-${getImageSourceKey(visibleImages[index], index)}`}
        />
        {showOverlay && (
          <View style={[StyleSheet.absoluteFill, styles.overlay, { borderRadius: borderRadius }]}>
            <Text style={styles.overlayText}>+{remainingCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const containerHeight = images.length === 1 ? singleHeight : multiImageHeight;

  return (
    <>
      <View
        onLayout={handleLayout}
        style={[styles.mediaContainer, { height: containerHeight }]}>
        {images.length === 1 ? (
          <TouchableOpacity
            style={styles.singleTile}
            activeOpacity={0.92}
            onPress={() => openViewerAt(0)}>
            <OptimizedImage
              source={images[0] as any}
              onLoad={(event) => handleImageLoad(0, event)}
              style={[StyleSheet.absoluteFill, { borderRadius }]}
              contentFit="cover"
              cachePolicy="memory-disk"
              priority="normal"
              transition={120}
              allowDownscaling
              recyclingKey={`post-thumbnail-${getImageSourceKey(images[0], 0)}`}
            />
          </TouchableOpacity>
        ) : visibleCount === 2 ? (
          <View style={styles.horizontalGrid}>
            {renderTile(0)}
            {renderTile(1)}
          </View>
        ) : visibleCount === 3 ? (
          <View style={styles.horizontalGrid}>
            {renderTile(0, styles.largeTile)}
            <View style={styles.verticalGrid}>
              {renderTile(1)}
              {renderTile(2)}
            </View>
          </View>
        ) : (
          <View style={styles.verticalGrid}>
            <View style={styles.horizontalGrid}>
              {renderTile(0)}
              {renderTile(1)}
            </View>
            <View style={styles.horizontalGrid}>
              {renderTile(2)}
              {renderTile(3)}
            </View>
          </View>
        )}
      </View>

      {/* <ImageViewing
        images={viewerImages}
        imageIndex={viewerIndex}
        visible={isViewerVisible}
        onRequestClose={() => setIsViewerVisible(false)}
        HeaderComponent={renderHeader}
      /> */}
    </>
  );
};

const styles = StyleSheet.create({
  mediaContainer: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#00223F',
  },
  singleTile: {
    flex: 1,
    position: 'relative',
  },
  horizontalGrid: {
    flex: 1,
    flexDirection: 'row',
    gap: GRID_GAP,
  },
  verticalGrid: {
    flex: 1,
    gap: GRID_GAP,
  },
  tile: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#001A30',
  },
  largeTile: {
    flex: 1.35,
  },
  overlay: {
    backgroundColor: 'rgba(168, 168, 168, 0.58)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  overlayText: {
    color: '#000000ff',
    fontSize: 28,
    fontWeight: '700',
  },
  viewerHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
