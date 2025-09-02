import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { DownloadIcon } from './icons/DownloadIcon';
import { ShareIcon } from './icons/ShareIcon';
import { TrashIcon } from './icons/TrashIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { ResizeIcon } from './icons/ResizeIcon';
import { Loader } from './Loader';
import { ErrorAlert } from './ErrorAlert';


interface ResultViewerProps {
  isLoading: boolean;
  error: string | null;
  generatedImage: string | null;
  onDiscard: () => void;
}

export const ResultViewer: React.FC<ResultViewerProps> = ({ isLoading, error, generatedImage, onDiscard }) => {

  const handleDownload = async () => {
    if (!generatedImage) return;
    try {
      // Request permission to access media library
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access photo library is required!');
        return;
      }

      // Save the image to media library
      await MediaLibrary.saveToLibraryAsync(generatedImage);
      Alert.alert('Success', 'Image saved to your photo gallery!');
    } catch (err) {
      console.error('Error saving image:', err);
      Alert.alert('Error', 'Could not save the image. Please try again.');
    }
  };

  const handleShare = async () => {
    if (!generatedImage) return;
    try {
      // Check if sharing is available
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert('Error', 'Sharing is not available on this device');
        return;
      }

      await Sharing.shareAsync(generatedImage, {
        mimeType: 'image/jpeg',
        dialogTitle: 'Check out my new hairstyle!',
      });
    } catch (err) {
      console.error('Error sharing:', err);
      Alert.alert('Error', 'Could not share the image.');
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader message="Applying AI magic..." />;
    }
    if (error) {
        return <View style={{ padding: 16 }}><ErrorAlert message={error} /></View>;
    }
    if (generatedImage) {
        return (
            <View style={styles.imageWrapper}>
                <Image source={{ uri: generatedImage }} style={styles.image} resizeMode="contain" />
                 <View style={styles.overlayButtons}>
                    <TouchableOpacity onPress={handleDownload} style={styles.iconButton}><DownloadIcon /></TouchableOpacity>
                    <TouchableOpacity onPress={handleShare} style={styles.iconButton}><ShareIcon /></TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}><ResizeIcon /></TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Select a style to get started!</Text>
        </View>
    );
  }

  return (
    <View style={styles.container}>
       <View style={styles.header}>
            <LightbulbIcon />
            <Text style={styles.title}>Styled Preview</Text>
        </View>
        <View style={styles.imageContainer}>
            {renderContent()}
        </View>
        {generatedImage && !isLoading && (
            <View style={styles.actionsContainer}>
                <TouchableOpacity onPress={handleDownload} style={[styles.actionButton, styles.downloadButton]}>
                    <DownloadIcon />
                    <Text style={styles.actionButtonText}>Download</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleShare} style={[styles.actionButton, styles.shareButton]}>
                    <ShareIcon />
                    <Text style={styles.actionButtonText}>Share</Text>
                </TouchableOpacity>
                 <TouchableOpacity onPress={onDiscard} style={[styles.actionButton, styles.discardButton]}>
                    <TrashIcon />
                    <Text style={styles.actionButtonText}>Discard</Text>
                </TouchableOpacity>
            </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1e293b',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#334155',
        padding: 16,
        gap: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#cbd5e1',
    },
    imageContainer: {
        aspectRatio: 1,
        backgroundColor: 'rgba(51, 65, 85, 0.5)',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    placeholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    placeholderText: {
        color: '#94a3b8',
        textAlign: 'center',
        fontSize: 16,
    },
    imageWrapper: {
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlayButtons: {
        position: 'absolute',
        top: 8,
        right: 8,
        gap: 8,
    },
    iconButton: {
        padding: 8,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        borderRadius: 999,
    },
    actionsContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 12,
        borderRadius: 8,
    },
    actionButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    downloadButton: {
        backgroundColor: '#059669', // emerald-600
    },
    shareButton: {
        backgroundColor: '#2563eb', // blue-600
    },
    discardButton: {
        backgroundColor: '#dc2626', // red-600
    },
});
