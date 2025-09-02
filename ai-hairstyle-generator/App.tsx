import React, { useState, useCallback } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, StatusBar, Platform } from 'react-native';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { StyleSelector } from './components/StyleSelector';
import { ResultViewer } from './components/ResultViewer';
import type { Hairstyle, UploadedImage } from './types';
import { HAIRSTYLES } from './constants';
import { ImageIcon } from './components/icons/ImageIcon';
import { Image } from 'react-native';
import { Text } from 'react-native';


const App: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<Hairstyle | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (image: UploadedImage) => {
    resetState();
    setUploadedImage(image);
  };
  
  const handleStyleSelect = useCallback(async (style: Hairstyle) => {
    if (!uploadedImage) {
      setError('Please upload an image first.');
      return;
    }

    setSelectedStyle(style);
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    // This is where you would call your Gemini service.
    // Since this is a conceptual conversion, we'll simulate the call.
    // In a real app, you would uncomment the following lines:
    /*
    try {
      const { applyHairstyle } = require('./services/geminiService');
      const newImageBase64 = await applyHairstyle(uploadedImage.base64, uploadedImage.mimeType, style.name);
      setGeneratedImage(`data:image/png;base64,${newImageBase64}`);
    } catch (err) {
      console.error(err);
      setError('Failed to generate hairstyle. The AI may be busy or the image could not be processed. Please try again.');
    } finally {
      setIsLoading(false);
    }
    */
    
    // Simulating API call for demonstration
    setTimeout(() => {
        setGeneratedImage(uploadedImage.url); // for demo, just show original image
        setIsLoading(false);
    }, 2000);

  }, [uploadedImage]);
  
  const handleDiscard = () => {
    setGeneratedImage(null);
    setSelectedStyle(null);
    setError(null);
  };

  const resetState = () => {
    setUploadedImage(null);
    setSelectedStyle(null);
    setGeneratedImage(null);
    setIsLoading(false);
    setError(null);
  };


  return (
    <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#1e293b" />
        <Header />
        <ScrollView contentContainerStyle={styles.container}>
            {!uploadedImage ? (
            <ImageUploader onImageUpload={handleImageUpload} />
            ) : (
            <View style={styles.mainContent}>
                {/* Current Image */}
                <View style={styles.panel}>
                    <View style={styles.panelHeader}>
                        <ImageIcon />
                        <Text style={styles.panelTitle}>Current Image</Text>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: uploadedImage.url }} style={styles.image} resizeMode="contain" />
                    </View>
                </View>

                {/* Styled Preview */}
                <ResultViewer
                    isLoading={isLoading}
                    error={error}
                    generatedImage={generatedImage}
                    onDiscard={handleDiscard}
                />
                
                {/* Preset Styles */}
                <StyleSelector
                    styles={HAIRSTYLES}
                    selectedStyle={selectedStyle}
                    onStyleSelect={handleStyleSelect}
                    onReset={resetState}
                />
            </View>
            )}
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#0f172a',
    },
    container: {
        padding: 16,
    },
    mainContent: {
        gap: 16,
    },
    panel: {
        backgroundColor: '#1e293b',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#334155',
        padding: 16,
    },
    panelHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    panelTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#cbd5e1',
    },
    imageContainer: {
        aspectRatio: 1,
        backgroundColor: 'rgba(51, 65, 85, 0.5)',
        borderRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});


export default App;