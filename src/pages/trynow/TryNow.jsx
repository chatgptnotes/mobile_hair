import React, { useState, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import CameraCapture from '../../components/CameraCapture.jsx'; // Assuming this component exists
import Navbar from '../../components/common_components/navbar/Navbar.jsx'; // Assuming this component exists
import Header from '../home/components/Header.jsx'; // Assuming this component exists
import UserProfile from '../../components/auth/UserProfile.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { getCachedImage, cacheGeneratedImage, getCacheStats, updateImageSelection, getSelectedImages, clearAllSelections, toggleImageSelection, checkImageSelection } from '../../services/imageCache';
// Import images with correct naming to match keys
import texturedQuiffImage from '../../assets/hairStyle/textured_quiff.png';
import pompadourImage from '../../assets/hairStyle/pompadour.png';
import classicPompadourImage from '../../assets/hairStyle/classic_pompadour.png';
import sideSweptPompadourImage from '../../assets/hairStyle/side_swept_pompadour.png';
import shortSidePartImage from '../../assets/hairStyle/short_side_part.png';
import curlyTopImage from '../../assets/hairStyle/curly_top.png';

// Import test function for development
// /Users/apple/Downloads/Headz_2-main 2/src/assets/hairStyle/side_swept_pompadour.png
// /Users/apple/Downloads/Headz_2-main 2/src/assets/hairStyle/short_side_part.png
if (import.meta.env.DEV) {
  import('../../utils/testSupabase.js');
}

const TryNow = () => {
  // State management
  const [selectedStyle, setSelectedStyle] = useState({ key: '', name: '' });
  const [imagePreview, setImagePreview] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState({ message: '', type: '' });
  const [imageFile, setImageFile] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [faceShape, setFaceShape] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [qualityMode, setQualityMode] = useState('standard');
  const [cacheStats, setCacheStats] = useState({ totalCachedImages: 0 });
  const [imageLoadError, setImageLoadError] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [cropData, setCropData] = useState(null);
  const [crop, setCrop] = useState({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5,
    aspect: 1 // Square aspect ratio
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]); // Track selected images
  const [showSelectedImages, setShowSelectedImages] = useState(false); // Toggle selected images view
  const [currentImageId, setCurrentImageId] = useState(null); // Track current generated image ID
  const [currentImageSelected, setCurrentImageSelected] = useState(false); // Track if current image is selected
  const imgRef = useRef(null);

  const fileInputRef = useRef(null);

  // Configuration - Replace with your actual API key from environment variables
  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  // Hairstyle prompts
  // const HAIR_STYLE_PROMPTS = {
  //   'textured_quiff': `Add realistic textured_quiff hairstyle. Dark brown hair, choppy bangs covering forehead. Textured layers, individual hair strands visible. Natural scalp and hairline. Keep original face unchanged.`,
  //   'pompadour': `Add realistic pompadour hairstyle. Dark brown hair combed straight back from forehead. Natural shine, well-groomed appearance. Individual hair strands visible. Natural scalp and hairline. Keep original face unchanged.`,
  //   'Classic Pompadour': `Replace hair with Classic Pompadour. Dark brown, 2.5 inches on top with natural waves. Individual strands visible, realistic texture. Short fade sides. Natural hairline with roots. Keep face, lighting unchanged.`,
  //   'Side-Swept Pompadour': `Add realistic Side-Swept Pompadour hairstyle. Dark brown hair with gradual fade on sides. Longer on top, shorter on sides. Clean, professional look with natural texture. Individual hair strands visible. Keep original face unchanged.`,
  //   'Short Side Part': `Add realistic Short Side Part hairstyle. Dark brown curly hair on top with defined curls. Shorter sides, voluminous Short Side Part section. Natural curl pattern with individual strands visible. Keep original face unchanged.`,
  //   'Curly Top': `Add realistic Curly Top hairstyle. Dark brown hair with clean Curly Top. Hair combed to one side, classic professional style. Natural shine and texture with individual strands visible. Keep original face unchanged.`
  // };

    // UNIVERSAL PRESERVATION PROMPT - Applied to ALL hairstyles
    const PRESERVATION_PROMPT = `PRESERVE EXACT SAME PERSON. Keep face, glasses, beard, clothing identical. ONLY add hair to head.`;

    // Hair-specific prompts (will be combined with face preservation)
    const HAIR_STYLE_PROMPTS = {

    'textured_quiff': `Add Textured Quiff: dark brown hair, short faded sides, textured top styled upward. Keep same face, glasses, beard.`,

    'pompadour': `Add Pompadour: dark brown hair combed back with volume, faded sides. Keep same face, glasses, beard.`,

    'classic_pompadour': `Add Classic Pompadour: dark brown hair swept back with height, smooth look. Keep same face, glasses, beard.`,

    'side_swept_pompadour': `Add Side-Swept Pompadour: dark brown hair swept to side with volume. Keep same face, glasses, beard.`,

    'short_side_part': `Add Short Side Part: dark brown hair with neat side parting, professional look. Keep same face, glasses, beard.`,

    'curly_top': `Add Curly Top: dark brown curly hair on top, short faded sides. Keep same face, glasses, beard.`
  };

  // Face shape recommendations
  const FACE_SHAPE_RECOMMENDATIONS = {
    oval: ['textured_quiff', 'pompadour', 'classic_pompadour'],
    round: ['side_swept_pompadour', 'textured_quiff'],
    square: ['curly_top', 'side_swept_pompadour'],
    heart: ['short_side_part', 'classic_pompadour'],
    long: ['curly_top', 'short_side_part'],
    diamond: ['pompadour', 'textured_quiff']
  };

  // Quality modes
  const QUALITY_MODES = {
    standard: { size: '512x512', description: 'Standard Quality' },
    hd: { size: '1024x1024', description: 'High Definition' },
    professional: { size: '1024x1024', description: 'Professional Grade' }
  };

  // Load selected images when user changes
  useEffect(() => {
    if (user?.id) {
      loadSelectedImages();
    }
  }, [user?.id]);

  // Simple face shape detection (basic implementation)
  const detectFaceShape = async (imageFile) => {
    // This is a simplified version - in production, you'd use a proper face detection API
    // For now, we'll return a random recommendation to demonstrate the feature
    const shapes = ['oval', 'round', 'square', 'heart', 'long', 'diamond'];
    const detectedShape = shapes[Math.floor(Math.random() * shapes.length)];

    setFaceShape(detectedShape);
    const recommendedStyles = FACE_SHAPE_RECOMMENDATIONS[detectedShape] || [];
    setRecommendations(recommendedStyles);

    return detectedShape;
  };




  const hairstyles = [
    {
      key: 'textured_quiff',
      name: 'Textured Quiff',
      icon: '✂️',
      image: texturedQuiffImage
    },
    {
      key: 'pompadour',
      name: 'Pompadour',
      icon: '💼',
      image: pompadourImage
    },
    {
      key: 'classic_pompadour',
      name: 'Classic Pompadour',
      icon: '🎨',
      image: classicPompadourImage
    },
    {
      key: 'side_swept_pompadour',
      name: 'Side-Swept Pompadour',
      icon: '⚡',
      image: sideSweptPompadourImage
    },
    {
      key: 'short_side_part',
      name: 'Short Side Part',
      icon: '🌀',
      image: shortSidePartImage
    },
    {
      key: 'curly_top',
      name: 'Curly Top',
      icon: '📐',
      image: curlyTopImage
    }
  ];

  // Set default selection on load and load cache stats
  useEffect(() => {
    setSelectedStyle({ key: 'textured_quiff', name: 'Textured Quiff' });

    // Load cache statistics
    const loadCacheStats = async () => {
      try {
        const stats = await getCacheStats();
        setCacheStats(stats);
      } catch (error) {
        console.log('Failed to load cache stats:', error);
      }
    };

    loadCacheStats();
  }, []);

  // Clear browser cache function
  const clearBrowserCache = () => {
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => caches.delete(name));
      });
    }
    // Clear any stored results
    localStorage.removeItem('lastTransformation');
    sessionStorage.clear();
  };

  const selectHairstyle = (style) => {
    setSelectedStyle(style);
    // Clear previous results when new style is selected
    setResultImage(null);
    setImageLoadError(false);
    setStatus({ message: `✨ ${style.name} selected! Upload a photo to transform.`, type: 'success' });

    // Clear cache for fresh transformation
    clearBrowserCache();

    console.log(`🎯 Selected hairstyle: ${style.name} (${style.key})`);
    console.log(`📝 Corresponding prompt:`, HAIR_STYLE_PROMPTS[style.key]);
  };

  // Handle image selection/deselection with toggle functionality
  const handleImageToggle = async (imageId) => {
    try {
      setStatus({ message: 'Updating selection...', type: 'info' });

      const result = await toggleImageSelection(imageId, user?.id);

      if (result.success) {
        // Update current image selection state if it's the current image
        if (imageId === currentImageId) {
          setCurrentImageSelected(result.isSelected);
        }

        // Refresh selected images list
        await loadSelectedImages();

        setStatus({
          message: result.message,
          type: 'success'
        });
      } else {
        setStatus({
          message: result.message || 'Failed to update selection',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Error toggling selection:', error);
      setStatus({
        message: 'Error updating selection',
        type: 'error'
      });
    }
  };

  // Handle direct selection/deselection (for remove buttons)
  const handleImageSelection = async (imageId, isSelected) => {
    try {
      setStatus({ message: 'Updating selection...', type: 'info' });

      const result = await updateImageSelection(imageId, isSelected, user?.id);

      if (result.success) {
        // Update current image selection state if it's the current image
        if (imageId === currentImageId) {
          setCurrentImageSelected(isSelected);
        }

        // Refresh selected images list
        await loadSelectedImages();

        setStatus({
          message: result.message,
          type: 'success'
        });
      } else {
        setStatus({
          message: result.message || 'Failed to update selection',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Error updating selection:', error);
      setStatus({
        message: 'Error updating selection',
        type: 'error'
      });
    }
  };

  // Check current image selection status
  const checkCurrentImageSelection = async (imageId) => {
    if (!imageId || !user?.id) return;

    try {
      const result = await checkImageSelection(imageId, user.id);
      if (result.success) {
        setCurrentImageSelected(result.isSelected);
      }
    } catch (error) {
      console.error('Error checking image selection:', error);
    }
  };

  // Load selected images for user
  const loadSelectedImages = async () => {
    if (!user?.id) return;

    try {
      const images = await getSelectedImages(user.id);
      setSelectedImages(images);
    } catch (error) {
      console.error('Error loading selected images:', error);
    }
  };

  // Clear all selections
  const handleClearAllSelections = async () => {
    if (!user?.id) return;

    try {
      const success = await clearAllSelections(user.id);
      if (success) {
        setSelectedImages([]);
        setStatus({
          message: 'All selections cleared!',
          type: 'success'
        });
      }
    } catch (error) {
      console.error('Error clearing selections:', error);
      setStatus({
        message: 'Error clearing selections',
        type: 'error'
      });
    }
  };

  // Check if image is square
  const checkImageDimensions = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const isSquare = img.width === img.height;
          resolve({
            width: img.width,
            height: img.height,
            isSquare: isSquare,
            aspectRatio: img.width / img.height
          });
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  // Crop image using ReactCrop data with image reference for accurate scaling
  const cropImageToSquareWithRef = (imageDataUrl, cropData, imgElement) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        console.log('🖼️ Image loaded for cropping:', {
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          displayWidth: imgElement.width,
          displayHeight: imgElement.height
        });
        console.log('✂️ Crop data received:', cropData);

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (cropData && cropData.width && cropData.height) {
          // Calculate scale factor between displayed image and natural image
          const scaleX = img.naturalWidth / imgElement.width;
          const scaleY = img.naturalHeight / imgElement.height;

          console.log('🔍 Scale factors:', { scaleX, scaleY });

          // Convert crop coordinates to natural image coordinates
          const pixelCrop = {
            x: Math.round(cropData.x * scaleX),
            y: Math.round(cropData.y * scaleY),
            width: Math.round(cropData.width * scaleX),
            height: Math.round(cropData.height * scaleY),
          };

          console.log('📐 Final pixel crop (scaled):', pixelCrop);

          canvas.width = pixelCrop.width;
          canvas.height = pixelCrop.height;

          ctx.drawImage(
            img,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
          );

          console.log('✅ Canvas created:', {
            canvasWidth: canvas.width,
            canvasHeight: canvas.height
          });
        } else {
          // Fallback to center crop
          const size = Math.min(img.naturalWidth, img.naturalHeight);
          canvas.width = size;
          canvas.height = size;

          const startX = (img.naturalWidth - size) / 2;
          const startY = (img.naturalHeight - size) / 2;

          console.log('🔄 Using fallback center crop:', { size, startX, startY });

          ctx.drawImage(
            img,
            startX,
            startY,
            size,
            size,
            0,
            0,
            size,
            size
          );
        }

        canvas.toBlob((blob) => {
          if (blob) {
            console.log('✅ Blob created successfully:', blob.size, 'bytes');
            const fileName = `cropped_square_${Date.now()}.png`;
            resolve(new File([blob], fileName, { type: 'image/png' }));
          } else {
            console.error('Failed to create blob from canvas');
            resolve(null);
          }
        }, 'image/png', 0.9);
      };
      img.onerror = () => {
        console.error('Failed to load image for cropping');
        resolve(null);
      };
      img.src = imageDataUrl;
    });
  };



  const convertToPng = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            if (blob) {
              const fileName = file.name.substring(0, file.name.lastIndexOf('.')) + '.png';
              resolve(new File([blob], fileName, { type: 'image/png' }));
            } else {
              reject(new Error('Canvas to Blob conversion failed.'));
            }
          }, 'image/png');
        };
        img.onerror = () => reject(new Error('Image could not be loaded.'));
        img.src = event.target.result;
      };
      reader.onerror = () => reject(new Error('File could not be read.'));
      reader.readAsDataURL(file);
    });
  };

  const processAndPreviewFile = async (file, source = 'upload') => {
    // Check image dimensions first
    const dimensions = await checkImageDimensions(file);

    if (!dimensions.isSquare) {
      // Show crop modal if image is not square
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageToCrop(e.target.result);
        setShowCropModal(true);
        setStatus({
          message: `📐 Image is ${dimensions.width}x${dimensions.height}. Please crop to square for best results.`,
          type: 'warning'
        });
      };
      reader.readAsDataURL(file);
      return;
    }

    // If image is already square, proceed normally
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = async (e) => {
      setImagePreview({
        src: e.target.result,
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        source: source,
        dimensions: `${dimensions.width}x${dimensions.height}`
      });

      // Perform face shape detection
      try {
        setStatus({ message: '🔍 Analyzing face shape...', type: '' });
        const detectedShape = await detectFaceShape(file);
        setStatus({
          message: `✨ Face shape detected: ${detectedShape.toUpperCase()}. Recommended styles highlighted!`,
          type: 'success'
        });
      } catch (error) {
        console.log('Face detection failed:', error);
        setStatus({ message: '📸 Photo uploaded successfully!', type: 'success' });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      processAndPreviewFile(file, 'upload');
    }
  };

  const handleCameraCapture = (capturedFile) => {
    if (capturedFile) {
      processAndPreviewFile(capturedFile, 'camera');
    }
  };

  // Handle crop confirmation
  const handleCropConfirm = async () => {
    if (imageToCrop && completedCrop && imgRef.current) {
      try {
        setStatus({ message: '✂️ Cropping image...', type: '' });

        console.log('🎯 Starting crop with data:', completedCrop);
        console.log('🖼️ Image to crop:', imageToCrop.substring(0, 50) + '...');
        console.log('📏 Image ref dimensions:', {
          width: imgRef.current.width,
          height: imgRef.current.height,
          naturalWidth: imgRef.current.naturalWidth,
          naturalHeight: imgRef.current.naturalHeight
        });

        // Create cropped file using ReactCrop data with image reference
        const croppedFile = await cropImageToSquareWithRef(imageToCrop, completedCrop, imgRef.current);

        if (!croppedFile) {
          throw new Error('Failed to create cropped image');
        }

        // Set the cropped file as the main image
        setImageFile(croppedFile);

        // Create preview immediately
        const reader = new FileReader();
        reader.onload = async (e) => {
          setImagePreview({
            src: e.target.result,
            name: croppedFile.name,
            size: (croppedFile.size / 1024 / 1024).toFixed(2) + ' MB',
            source: 'cropped',
            dimensions: 'Square (cropped)'
          });

          // Close crop modal and reset crop states first
          setShowCropModal(false);
          setImageToCrop(null);
          setCropData(null);
          setCompletedCrop(null);
          setCrop({
            unit: '%',
            width: 90,
            height: 90,
            x: 5,
            y: 5,
            aspect: 1
          });

          // Perform face shape detection
          try {
            setStatus({ message: '🔍 Analyzing face shape...', type: '' });
            const detectedShape = await detectFaceShape(croppedFile);
            setStatus({
              message: `✨ Image cropped successfully! Face shape: ${detectedShape.toUpperCase()}`,
              type: 'success'
            });
          } catch (error) {
            console.log('Face detection failed:', error);
            setStatus({ message: '✂️ Image cropped successfully!', type: 'success' });
          }
        };

        reader.onerror = () => {
          setStatus({ message: 'Failed to read cropped image. Please try again.', type: 'error' });
        };

        reader.readAsDataURL(croppedFile);

      } catch (error) {
        console.error('Crop failed:', error);
        setStatus({ message: 'Crop failed. Please try again.', type: 'error' });
      }
    } else if (!imgRef.current) {
      setStatus({ message: 'Image reference not found. Please try again.', type: 'error' });
    } else {
      setStatus({ message: 'Please select a crop area first.', type: 'error' });
    }
  };

  // Handle crop cancel
  const handleCropCancel = () => {
    setShowCropModal(false);
    setImageToCrop(null);
    setCropData(null);
    setCompletedCrop(null);
    setCrop({
      unit: '%',
      width: 90,
      height: 90,
      x: 5,
      y: 5,
      aspect: 1
    });
    setStatus({ message: 'Crop cancelled. Please upload another image.', type: '' });
  };

  // Handle skip crop - use original image as is
  const handleSkipCrop = async () => {
    if (imageToCrop) {
      try {
        setStatus({ message: '📸 Using original image...', type: '' });

        // Convert data URL back to file
        const response = await fetch(imageToCrop);
        const blob = await response.blob();
        const originalFile = new File([blob], `original_${Date.now()}.png`, { type: 'image/png' });

        // Set the original file as the main image
        setImageFile(originalFile);
        setImagePreview({
          src: imageToCrop,
          name: originalFile.name,
          size: (originalFile.size / 1024 / 1024).toFixed(2) + ' MB',
          source: 'original',
          dimensions: 'Original size (not square)'
        });

        // Perform face shape detection
        try {
          setStatus({ message: '🔍 Analyzing face shape...', type: '' });
          const detectedShape = await detectFaceShape(originalFile);
          setStatus({
            message: `✨ Original image uploaded! Face shape: ${detectedShape.toUpperCase()}`,
            type: 'success'
          });
        } catch (error) {
          console.log('Face detection failed:', error);
          setStatus({ message: '📸 Original image uploaded successfully!', type: 'success' });
        }

        // Close crop modal
        setShowCropModal(false);
        setImageToCrop(null);
        setCropData(null);

      } catch (error) {
        console.error('Failed to use original image:', error);
        setStatus({ message: 'Failed to process original image. Please try again.', type: 'error' });
      }
    }
  };

  const createForeheadMask = (imageFile) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');

          // DALL-E 2 mask: transparent areas are edited, black areas are protected
          ctx.fillStyle = 'rgba(0, 0, 0, 1)'; // Opaque black protects face
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.globalCompositeOperation = 'destination-out'; // Make transparent for editing

          // OPTIMIZED hair mask - covers full hair area while protecting face
          ctx.beginPath();
          ctx.moveTo(0, 0); // Top-left
          ctx.lineTo(canvas.width, 0); // Top edge
          ctx.lineTo(canvas.width, canvas.height * 0.45); // Allow more hair area
          ctx.bezierCurveTo(
            canvas.width * 0.85, canvas.height * 0.25, // Better curve for natural hairline
            canvas.width * 0.15, canvas.height * 0.25,
            0, canvas.height * 0.45
          );
          ctx.closePath();
          ctx.fill();

          canvas.toBlob((blob) => {
            resolve(new File([blob], 'mask.png', { type: 'image/png' }));
          }, 'image/png');
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(imageFile);
    });
  };

  const editImage = async () => {
    if (!API_KEY || API_KEY.length < 20) {
      setStatus({ message: "Error: Please set your OpenAI API Key.", type: 'error' });
      return;
    }
    if (!imageFile) {
      setStatus({ message: "❌ Please upload or take a photo first!", type: 'error' });
      return;
    }
    if (!selectedStyle.key) {
      setStatus({ message: "❌ Please select a hairstyle first!", type: 'error' });
      return;
    }

    setIsProcessing(true);
    setResultImage(null);
    setImageLoadError(false);

    try {
      // Check cache first
      setStatus({ message: "🔍 Checking cache for existing transformation...", type: '' });
      const cachePrompt = `${PRESERVATION_PROMPT} ${HAIR_STYLE_PROMPTS[selectedStyle.key]}`;
      const cachedImageUrl = await getCachedImage(imageFile, selectedStyle.key, cachePrompt, user?.id);

      if (cachedImageUrl) {
        console.log('🎯 Cache hit! Using cached image:', cachedImageUrl);
        setResultImage(cachedImageUrl);
        setStatus({ message: `✅ ${selectedStyle.name} loaded from cache instantly! 🚀`, type: 'success' });
        setIsProcessing(false);
        return;
      }

      console.log('💫 Cache miss - generating new transformation');
      setStatus({ message: `🚀 Generating new ${selectedStyle.name} transformation...`, type: '' });
      let processedImageFile = imageFile;
      // Convert to PNG if necessary
      if (imageFile.type !== 'image/png') {
        setStatus({ message: `🚀 Converting image to PNG...`, type: '' });
        processedImageFile = await convertToPng(imageFile);
      }

      setStatus({ message: `🚀 Generating ${selectedStyle.name} (white background)...`, type: '' });

      // Clear cache before transformation
      clearBrowserCache();

      const maskFile = await createForeheadMask(processedImageFile);
      const basePrompt = HAIR_STYLE_PROMPTS[selectedStyle.key];

      // Create unique request with timestamp for cache busting
      const requestId = Date.now();
      const uniqueIdentifier = Math.random().toString(36).substring(7);

      // Combine preservation prompt with hair style prompt
      const finalPrompt = `${PRESERVATION_PROMPT} ${basePrompt} CRITICAL INSTRUCTIONS: Only edit the transparent mask area (hair region). Do not modify any black-masked areas (face, skin). Background MUST be pure white (#FFFFFF) or very light gray - absolutely NO black, dark, or colored backgrounds. Professional studio lighting with clean white backdrop. [ID: ${requestId}-${uniqueIdentifier}]`;

      console.log(`🎯 TRANSFORMATION DETAILS:`);
      console.log(`   Selected Style: ${selectedStyle.name} (${selectedStyle.key})`);
      console.log(`   Available Prompts:`, Object.keys(HAIR_STYLE_PROMPTS));
      console.log(`   Key Match Check: ${Object.keys(HAIR_STYLE_PROMPTS).includes(selectedStyle.key) ? '✅ FOUND' : '❌ NOT FOUND'}`);
      console.log(`   Preservation Prompt: ${PRESERVATION_PROMPT}`);
      console.log(`   Hair Style Prompt: ${basePrompt}`);
      console.log(`   Final Combined Prompt: ${finalPrompt}`);
      console.log(`   Request ID: ${requestId}-${uniqueIdentifier}`);

      if (!basePrompt) {
        console.error(`❌ CRITICAL ERROR: No prompt found for hairstyle key: "${selectedStyle.key}"`);
        console.error(`❌ Available prompt keys:`, Object.keys(HAIR_STYLE_PROMPTS));
        console.error(`❌ Selected style object:`, selectedStyle);
        throw new Error(`No prompt found for hairstyle: ${selectedStyle.key}. Available keys: ${Object.keys(HAIR_STYLE_PROMPTS).join(', ')}`);
      }

      // Verify we're using the correct style
      console.log(`✅ VERIFICATION: Transforming with ${selectedStyle.name} (${selectedStyle.key})`);

      const formData = new FormData();
      formData.append("image", processedImageFile);
      formData.append("mask", maskFile);
      formData.append("prompt", finalPrompt);
      formData.append("model", "dall-e-2");
      formData.append("n", "1");
      formData.append("size", QUALITY_MODES[qualityMode].size);
      formData.append("response_format", "b64_json");

      console.log(`🎨 Using quality mode: ${qualityMode} (${QUALITY_MODES[qualityMode].size})`);

      const response = await fetch(`https://api.openai.com/v1/images/edits?_t=${requestId}&_r=${uniqueIdentifier}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
          "X-Request-ID": `${requestId}-${uniqueIdentifier}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || 'An unknown error occurred');
      }

      const data = await response.json();
      console.log('🔍 API Response:', data);

      if (!data.data || !data.data[0]) {
        throw new Error('Invalid response from OpenAI API - no image data received');
      }

      // Handle base64 response format
      let imageDataUrl;
      if (data.data[0].b64_json) {
        // Convert base64 to data URL with cache busting
        imageDataUrl = `data:image/png;base64,${data.data[0].b64_json}`;
        console.log('�️ Received base64 image data');
      } else if (data.data[0].url) {
        // Fallback to URL if available with cache busting
        imageDataUrl = `${data.data[0].url}?_t=${requestId}&_r=${uniqueIdentifier}`;
        console.log('🖼️ Received image URL:', imageDataUrl);
      } else {
        throw new Error('No image data or URL in API response');
      }

      // Set the image data with cache busting
      setResultImage(imageDataUrl);

      // Store for download purposes
      window.currentImageData = imageDataUrl;

      // Cache the generated image for future use
      setStatus({ message: `💾 Saving to cache for faster future access...`, type: '' });
      const cacheId = await cacheGeneratedImage(processedImageFile, selectedStyle.key, finalPrompt, imageDataUrl, user?.id);

      if (cacheId) {
        console.log('✅ Image successfully cached with ID:', cacheId);
        setCurrentImageId(cacheId); // Store the current image ID for selection
        setCurrentImageSelected(false); // New images are not selected by default
        // Check if this image is already selected (in case of cache hit)
        await checkCurrentImageSelection(cacheId);
        // Update cache stats
        const updatedStats = await getCacheStats();
        setCacheStats(updatedStats);
      } else {
        console.log('⚠️ Failed to cache image, but transformation successful');
      }

      setStatus({ message: `✅ ${selectedStyle.name} Applied Successfully! Clean white background. 🎉`, type: 'success' });

      // Update transformation counter
      const currentCount = parseInt(localStorage.getItem('transformationCount') || '0');
      localStorage.setItem('transformationCount', (currentCount + 1).toString());

      // Store transformation for comparison
      localStorage.setItem('lastTransformation', JSON.stringify({
        style: selectedStyle.name,
        timestamp: Date.now(),
        imageData: imageDataUrl,
        userId: user?.id || 'anonymous'
      }));

      console.log(`✅ Transformation successful: ${selectedStyle.name}`);

    } catch (error) {
      setStatus({ message: `Error: ${error.message}`, type: 'error' });
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = async () => {
    if (resultImage || window.currentImageData) {
      try {
        const imageData = resultImage || window.currentImageData;
        const link = document.createElement('a');

        // Handle both base64 data URLs and regular URLs
        if (imageData.startsWith('data:')) {
          // Base64 data URL - can download directly
          link.href = imageData;
        } else {
          // Regular URL - might need to fetch and convert
          try {
            const response = await fetch(imageData);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            link.href = url;
          } catch (fetchError) {
            // Fallback to direct URL
            link.href = imageData;
          }
        }

        link.download = `hairstyle-${selectedStyle.key}-${Date.now()}.png`;
        link.click();

        setStatus({ message: '💾 Download started!', type: 'success' });
      } catch (error) {
        console.error('Download failed:', error);
        setStatus({ message: 'Download failed. Please try again.', type: 'error' });
      }
    }
  };

  const reset = () => {
    setImagePreview(null);
    setImageFile(null);
    setResultImage(null);
    setCurrentImageId(null); // Clear current image ID
    setCurrentImageSelected(false); // Reset selection state
    setStatus({ message: '', type: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const { user } = useAuth();

  // return (
  //   <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
  //     {/* Custom Header with User Profile */}
  //     <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-800 shadow-lg">
  //       <div className="container mx-auto px-4 py-4">
  //         <div className="flex items-center justify-between">
  //           {/* Logo and Title */}
  //           <div className="flex items-center space-x-3">
  //             <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
  //               <span className="text-2xl">💇‍♀️</span>
  //             </div>
  //             <div>
  //               <h1 className="text-2xl font-bold text-white">HeadZ</h1>
  //               <p className="text-blue-100 text-sm">AI Hairstyle Transformation</p>
  //             </div>
  //           </div>

  //           {/* User Profile */}
  //           <UserProfile />
  //         </div>
  //       </div>
  //     </div>

  //     <Navbar />

  //     <div className="container mx-auto px-4 py-8">
  //       <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl mx-auto p-6 md:p-8">

  //         <div className="text-center mb-6">
  //           <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
  //             Transform your look instantly with our free AI hairstyle changer
  //           </h1>
  //           <p className="text-gray-600">
  //             Upload your photo and try different hairstyles and colors instantly
  //           </p>
  //         </div>

  //         <div className="bg-blue-50 border-l-4 border-indigo-400 p-4 mb-6 rounded-lg">
  //           <h4 className="font-bold text-gray-800 mb-2">📋 How to use:</h4>
  //           <ol className="list-decimal list-inside text-gray-700 text-sm space-y-1">
  //             <li><strong>Select a hairstyle</strong> from the gallery below.</li>
  //             <li><strong>Upload or take a photo</strong> using the buttons.</li>
  //             <li><strong>Click "Transform Hair"</strong> to see the magic!</li>
  //           </ol>
  //         </div>

  //         {selectedStyle.name && (
  //           <div className="mb-6 p-5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl text-white text-center shadow-lg">
  //             <div className="text-xl font-bold mb-2">✨ Selected Hairstyle</div>
  //             <div className="text-lg opacity-95 uppercase tracking-wide">{selectedStyle.name}</div>
  //           </div>
  //         )}

  //         {faceShape && recommendations.length > 0 && (
  //           <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-400 rounded-lg">
  //             <h4 className="font-bold text-green-800 mb-2">🎯 AI Recommendations for {faceShape.toUpperCase()} face:</h4>
  //             <p className="text-green-700 text-sm">
  //               Based on your face shape, we recommend: {recommendations.map(key =>
  //                 hairstyles.find(h => h.key === key)?.name
  //               ).filter(Boolean).join(', ')}
  //             </p>
  //           </div>
  //         )}

  //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
  //           {hairstyles.map((style) => {
  //             const isRecommended = recommendations.includes(style.key);
  //             const isSelected = selectedStyle.key === style.key;

  //             return (
  //               <div
  //                 key={style.key}
  //                 className={`cursor-pointer transition-all duration-300 hover:scale-105 group relative ${
  //                   isSelected
  //                     ? 'ring-4 ring-green-500'
  //                     : isRecommended
  //                       ? 'ring-3 ring-blue-400'
  //                       : 'ring-2 ring-transparent'
  //                 } rounded-2xl`}
  //                 onClick={() => selectHairstyle(style)}
  //               >
  //                 {isRecommended && (
  //                   <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold z-10">
  //                     AI Pick
  //                   </div>
  //                 )}
  //               <div className="h-56 md:h-64 bg-white rounded-xl flex flex-col items-center justify-center text-gray-800 font-bold text-center p-4 shadow-md transition-all duration-300 group-hover:shadow-xl border-2 border-gray-200">
  //                 <div className="flex flex-col items-center justify-center h-full">
  //                   <img
  //                     src={style.image}
  //                     alt={style.name}
  //                     className="w-28 h-28 md:w-32 md:h-32 object-contain rounded-lg mb-2"
  //                   />
  //                   <div className="text-base font-semibold">{style.name}</div>
  //                 </div>
  //               </div>
  //             </div>
  //             );
  //           })}
  //         </div>

  //         <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 mb-6 text-center bg-gray-50">
  //           {!imagePreview ? (
  //             <>
  //               <div className="flex justify-center gap-4 mb-4">
  //                 <button onClick={() => setIsCameraOpen(true)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
  //                   📷 Take Photo
  //                 </button>
  //                 <button onClick={() => fileInputRef.current?.click()} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
  //                   📁 Upload File
  //                 </button>
  //               </div>
  //               <p className="text-xs text-gray-500">Supports JPG, PNG, WebP. Non-PNG images will be converted.</p>
  //             </>
  //           ) : (
  //             <div className="text-center">
  //               <div className="relative inline-block">
  //                 <img
  //                   src={imagePreview.src}
  //                   alt="Preview"
  //                   className="max-w-full max-h-48 mx-auto rounded-lg shadow-md mb-2"
  //                 />
  //                 <button onClick={reset} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors" aria-label="Remove image">
  //                   ×
  //                 </button>
  //               </div>
  //               <div className="text-sm text-gray-600">
  //                 <span className="font-medium">{imagePreview.name}</span> - <span>{imagePreview.size}</span>
  //               </div>
  //               <button onClick={reset} className="text-purple-600 hover:text-purple-700 text-sm font-medium mt-2">
  //                 Change Photo
  //               </button>
  //             </div>
  //           )}
  //           <input
  //             ref={fileInputRef}
  //             type="file"
  //             accept="image/jpeg,image/png,image/webp"
  //             onChange={handleFileUpload}
  //             className="hidden"
  //           />
  //         </div>

  //         {/* Quality Mode Selector */}
  //         <div className="mb-6 p-4 bg-gray-50 rounded-lg">
  //           <h4 className="font-bold text-gray-800 mb-3">🎨 Quality Mode:</h4>
  //           <div className="flex flex-wrap gap-2 justify-center">
  //             {Object.entries(QUALITY_MODES).map(([mode, config]) => (
  //               <button
  //                 key={mode}
  //                 onClick={() => setQualityMode(mode)}
  //                 className={`px-4 py-2 rounded-lg font-medium transition-all ${
  //                   qualityMode === mode
  //                     ? 'bg-indigo-500 text-white shadow-lg'
  //                     : 'bg-white text-gray-700 hover:bg-indigo-100'
  //                 }`}
  //               >
  //                 {config.description}
  //               </button>
  //             ))}
  //           </div>
  //         </div>

  //         <div className="text-center mb-6">
  //           <button
  //             onClick={editImage}
  //             disabled={isProcessing}
  //             className={`px-8 py-3 rounded-lg font-bold text-white transition-all duration-300 w-full md:w-auto ${isProcessing
  //                 ? 'bg-blue-300 cursor-not-allowed'
  //                 : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
  //               }`}
  //           >
  //             {isProcessing ? 'Processing...' : '✨ Transform Hair'}
  //           </button>
  //         </div>

  //         {status.message && (
  //           <div className={`text-center p-3 rounded-lg font-medium mb-6 ${status.type === 'error' ? 'text-red-600 bg-red-50' :
  //               status.type === 'success' ? 'text-green-600 bg-green-50' :
  //                 'text-blue-600 bg-blue-50'
  //             }`}>
  //             {status.message}
  //           </div>
  //         )}

  //         {arPreview && !resultImage && (
  //           <div className="flex flex-col items-center mb-6">
  //             <h3 className="text-lg font-bold text-gray-800 mb-4">🔮 AR Preview</h3>
  //             <div className="relative">
  //               <img
  //                 src={arPreview}
  //                 alt="AR Preview"
  //                 className="w-80 h-80 object-cover rounded-2xl border-4 border-purple-500 shadow-2xl"
  //               />
  //               <div className="absolute top-2 left-2 bg-purple-500 text-white px-2 py-1 rounded text-xs font-bold">
  //                 PREVIEW
  //               </div>
  //             </div>
  //             <p className="text-sm text-gray-600 mt-2 text-center max-w-xs">
  //               This is a quick preview. Click "Transform Hair" for the actual AI transformation!
  //             </p>
  //           </div>
  //         )}

  //         {resultImage && (
  //           <div className="flex flex-col items-center">
  //             <h3 className="text-2xl font-bold text-gray-800 mb-6">✨ Transformation Complete!</h3>

  //             {/* Before/After Comparison */}
  //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
  //               {imagePreview && (
  //                 <div className="text-center">
  //                   <h4 className="font-bold text-gray-700 mb-2">BEFORE</h4>
  //                   <img
  //                     src={imagePreview.src}
  //                     alt="Original"
  //                     className="w-64 h-64 object-cover rounded-xl border-2 border-gray-300 shadow-lg"
  //                   />
  //                 </div>
  //               )}
  //               <div className="text-center">
  //                 <h4 className="font-bold text-gray-700 mb-2">AFTER</h4>
  //                 <div className="relative">
  //                   {resultImage && !imageLoadError ? (
  //                     <img
  //                       src={resultImage}
  //                       alt="Transformed Hair"
  //                       className="w-64 h-64 object-cover rounded-xl border-4 border-indigo-500 shadow-2xl"
  //                       onError={(e) => {
  //                         console.error('❌ Image failed to load:', resultImage);
  //                         setImageLoadError(true);
  //                         setStatus({
  //                           message: 'Image loading failed. The transformation was successful but the image cannot be displayed. Please try downloading or transforming again.',
  //                           type: 'error'
  //                         });
  //                       }}
  //                       onLoad={() => {
  //                         console.log('✅ Image loaded successfully:', resultImage);
  //                         setImageLoadError(false);
  //                       }}
  //                     />
  //                   ) : resultImage && imageLoadError ? (
  //                     <div className="w-64 h-64 bg-red-100 rounded-xl border-4 border-red-300 flex flex-col items-center justify-center text-red-600 text-sm p-4">
  //                       <div className="text-center">
  //                         <div className="text-2xl mb-2">⚠️</div>
  //                         <div className="font-bold mb-1">Image Load Failed</div>
  //                         <div className="text-xs">Transformation completed but image cannot be displayed</div>
  //                         <button
  //                           onClick={() => {
  //                             setImageLoadError(false);
  //                             // Force reload by adding new timestamp
  //                             const newUrl = resultImage.split('?')[0] + '?t=' + Date.now();
  //                             setResultImage(newUrl);
  //                           }}
  //                           className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
  //                         >
  //                           Retry Load
  //                         </button>
  //                       </div>
  //                     </div>
  //                   ) : (
  //                     <div className="w-64 h-64 bg-gray-200 rounded-xl border-4 border-gray-300 flex items-center justify-center">
  //                       <span className="text-gray-500">Loading...</span>
  //                     </div>
  //                   )}
  //                   <div className="absolute top-2 right-2 bg-indigo-500 text-white px-2 py-1 rounded text-xs font-bold">
  //                     {selectedStyle.name}
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>

  //             <div className="flex flex-wrap gap-4 justify-center">
  //               <button
  //                 onClick={downloadImage}
  //                 className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-lg transition-all"
  //               >
  //                 💾 Download Result
  //               </button>
  //               <button
  //                 onClick={() => {
  //                   setResultImage(null);
  //                   setArPreview(null);
  //                   setImageLoadError(false);
  //                   setStatus({ message: 'Ready for next transformation!', type: 'success' });
  //                 }}
  //                 className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg shadow-lg transition-all"
  //               >
  //                 🔄 Try Another Style
  //               </button>
  //               {imageLoadError && (
  //                 <button
  //                   onClick={() => {
  //                     console.log('🔍 Debug Info:');
  //                     console.log('Current resultImage:', resultImage);
  //                     console.log('Current imageData:', window.currentImageData);
  //                     console.log('Image Load Error:', imageLoadError);
  //                     console.log('Is Base64:', resultImage?.startsWith('data:'));

  //                     // Try to open image in new tab
  //                     if (resultImage) {
  //                       if (resultImage.startsWith('data:')) {
  //                         // Base64 data URL - open directly
  //                         window.open(resultImage, '_blank');
  //                       } else {
  //                         // Regular URL - try to open
  //                         window.open(resultImage, '_blank');
  //                       }
  //                     }
  //                   }}
  //                   className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg shadow-lg transition-all text-sm"
  //                 >
  //                   🔍 Debug Image
  //                 </button>
  //               )}
  //             </div>
  //           </div>
  //         )}

  //         <CameraCapture
  //           isOpen={isCameraOpen}
  //           onCapture={handleCameraCapture}
  //           onClose={() => setIsCameraOpen(false)}
  //         />
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
  <div className="min-h-screen bg-gray-50">
    <Navbar />

    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Transform your look instantly with our free AI hairstyle changer
          </h1>
          <p className="text-gray-600 text-lg">
            Upload your photo and try different hairstyles and colors instantly
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* Left Side - Hairstyle Gallery */}
          <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-lg">

            {/* Hairstyle Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {hairstyles.map((style) => (
                <div
                  key={style.key}
                  className={`relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                    selectedStyle.key === style.key ? 'ring-4 ring-blue-500 shadow-lg' : 'hover:shadow-md'
                  }`}
                  onClick={() => selectHairstyle(style)}
                >
                  <img
                    src={style.image}
                    alt={style.name}
                    className="w-full h-48 md:h-52 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-4">
                    <p className="text-base font-semibold text-center">{style.name}</p>
                  </div>
                  {selectedStyle.key === style.key && (
                    <div className="absolute top-3 right-3 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                      <span className="text-sm">✓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
            <div className="flex justify-between items-center mb-6">
              <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <span className="text-xl">←</span>
              </button>
              <div className="text-center">
                {selectedStyle.name ? (
                  <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold">
                    ✨ Selected: {selectedStyle.name}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">Choose a hairstyle</div>
                )}
              </div>
              <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <span className="text-xl">→</span>
              </button>
            </div>

            {/* Color Palette */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Choose Hair Color</h3>
              <div className="flex flex-wrap gap-4 justify-center">
                {['#8B4513', '#654321', '#2F1B14', '#D2691E', '#CD853F', '#F4A460', '#DEB887', '#D2B48C', '#BC8F8F', '#A0522D', '#8FBC8F', '#20B2AA', '#4682B4', '#6495ED', '#9370DB', '#BA55D3', '#FF69B4', '#FF1493'].map((color, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 rounded-full cursor-pointer border-3 border-gray-300 hover:border-gray-500 hover:scale-110 transition-all duration-200 shadow-md hover:shadow-lg"
                    style={{ backgroundColor: color }}
                    title={`Color ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Generate Button */}
            {/* Warning Message */}
            {imagePreview && selectedStyle.key && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> AI may sometimes change facial features. We're working to improve face preservation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={editImage}
              disabled={isProcessing || !imagePreview || !selectedStyle.key}
              className={`w-full py-4 rounded-xl font-semibold text-white transition-all text-lg ${
                isProcessing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : !imagePreview || !selectedStyle.key
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {isProcessing ? `Generating ${selectedStyle.name}...` : !imagePreview ? 'Upload Photo First' : !selectedStyle.key ? 'Select Hairstyle' : `Generate ${selectedStyle.name}`}
            </button>
          </div>

          {/* Right Side - Upload Area */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">

            {!imagePreview ? (
              <div
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center h-96 flex flex-col justify-center hover:border-blue-400 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="text-6xl mb-4">📤</div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Upload Your Photo</h3>
                <p className="text-gray-500 mb-4">Drag and drop your image here or click to select</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    📁 Choose File
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsCameraOpen(true);
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    📷 Take Photo
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-4">
                  Supports JPG, JPEG, PNG or WebP (Max 5MB)
                </p>
              </div>
            ) : (
              <div className="text-center">
                <div className="relative inline-block">
                  <img
                    src={imagePreview.src}
                    alt="Preview"
                    className="w-full h-96 object-cover rounded-xl mb-4 shadow-md"
                  />
                  <button
                    onClick={reset}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                    title="Remove image"
                  >
                    ×
                  </button>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <div><span className="font-medium">{imagePreview.name}</span></div>
                  <div>{imagePreview.size} • {imagePreview.dimensions || 'Unknown size'}</div>
                  {imagePreview.source && (
                    <div className="text-xs text-blue-600 mt-1">
                      Source: {imagePreview.source === 'cropped' ? '✂️ Cropped' :
                               imagePreview.source === 'camera' ? '📷 Camera' :
                               imagePreview.source === 'original' ? '📸 Original' : '📁 Upload'}
                    </div>
                  )}
                </div>
                <button
                  onClick={reset}
                  className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
                >
                  Change Photo
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileUpload}
              className="hidden"
            />

            {/* Quality Mode Selector */}
            {imagePreview && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3 text-center">🎨 Quality Mode</h4>
                <div className="flex flex-col gap-2">
                  {Object.entries(QUALITY_MODES).map(([mode, config]) => (
                    <button
                      key={mode}
                      onClick={() => setQualityMode(mode)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                        qualityMode === mode
                          ? 'bg-indigo-500 text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:bg-indigo-100 border border-gray-200'
                      }`}
                    >
                      {config.description} ({config.size})
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Face Shape Detection Results */}
            {faceShape && recommendations.length > 0 && (
              <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-400 rounded-lg">
                <h4 className="font-bold text-green-800 mb-2">🎯 AI Recommendations</h4>
                <p className="text-green-700 text-sm">
                  Face shape: <span className="font-semibold">{faceShape.toUpperCase()}</span>
                </p>
                <p className="text-green-700 text-sm mt-1">
                  Recommended: {recommendations.map(key =>
                    hairstyles.find(h => h.key === key)?.name
                  ).filter(Boolean).join(', ')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Status Messages */}
        {status.message && (
          <div className={`mt-6 text-center p-4 rounded-xl font-medium shadow-sm ${
            status.type === 'error' ? 'text-red-700 bg-red-50 border border-red-200' :
            status.type === 'success' ? 'text-green-700 bg-green-50 border border-green-200' :
            'text-blue-700 bg-blue-50 border border-blue-200'
          }`}>
            {status.message}
          </div>
        )}

        {/* Cache Stats */}
        {cacheStats.totalCachedImages > 0 && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              <span className="mr-1">💾</span>
              {cacheStats.totalCachedImages} transformations cached for instant access
            </div>
          </div>
        )}



        {/* Result Display */}
        {resultImage && (
          <div className="mt-8 bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              ✨ Transformation Complete!
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="text-center">
                <h4 className="font-bold text-gray-700 mb-4 text-lg">BEFORE</h4>
                <div className="relative inline-block">
                  <img
                    src={imagePreview?.src}
                    alt="Before"
                    className="w-80 h-80 object-cover rounded-xl shadow-lg border-2 border-gray-200"
                  />
                  <div className="absolute top-3 left-3 bg-gray-800 text-white px-3 py-1 rounded text-sm font-bold">
                    ORIGINAL
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h4 className="font-bold text-gray-700 mb-4 text-lg">AFTER</h4>
                <div className="relative inline-block">
                  <img
                    src={resultImage}
                    alt="After"
                    className="w-80 h-80 object-cover rounded-xl shadow-lg border-4 border-purple-500"
                    onError={(e) => {
                      console.error('❌ Image failed to load:', resultImage, e);
                      setImageLoadError(true);
                      setStatus({
                        message: 'Image loading failed. The transformation was successful but the image cannot be displayed. Please try downloading or transforming again.',
                        type: 'error'
                      });
                    }}
                    onLoad={() => {
                      console.log('✅ Image loaded successfully:', resultImage);
                      setImageLoadError(false);
                    }}
                    style={{
                      minHeight: '320px',
                      backgroundColor: '#f3f4f6',
                      display: imageLoadError ? 'none' : 'block'
                    }}
                  />
                  {imageLoadError && (
                    <div className="w-80 h-80 bg-gray-100 rounded-xl shadow-lg border-4 border-purple-500 flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="text-4xl mb-2">🖼️</div>
                        <p className="text-gray-600 font-medium">Image Loading Failed</p>
                        <p className="text-sm text-gray-500 mt-1">Transformation completed successfully</p>
                        <button
                          onClick={downloadImage}
                          className="mt-3 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                        >
                          Download Result
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded text-sm font-bold">
                    {selectedStyle.name}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button
                onClick={downloadImage}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                💾 Download Result
              </button>
              <button
                onClick={() => {
                  if (currentImageId) {
                    handleImageToggle(currentImageId);
                  } else {
                    setStatus({
                      message: 'Please wait for the image to be saved before selecting',
                      type: 'error'
                    });
                  }
                }}
                disabled={!currentImageId}
                className={`px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all ${
                  !currentImageId
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : currentImageSelected
                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
                }`}
              >
                {!currentImageId
                  ? '⏳ Saving...'
                  : currentImageSelected
                  ? '❌ Deselect Image'
                  : '⭐ Select This Image'
                }
              </button>
              <button
                onClick={() => {
                  setResultImage(null);
                  setArPreview(null);
                  setCurrentImageId(null); // Clear current image ID
                  setCurrentImageSelected(false); // Reset selection state
                  setImageLoadError(false);
                  setStatus({ message: 'Ready for next transformation!', type: 'success' });
                }}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                🔄 Try Another Style
              </button>
              {imageLoadError && (
                <button
                  onClick={() => {
                    console.log('🔍 Debug Info:');
                    console.log('Current resultImage:', resultImage);
                    console.log('Current imageData:', window.currentImageData);
                    console.log('Image Load Error:', imageLoadError);
                    console.log('Is Base64:', resultImage?.startsWith('data:'));

                    // Try to open image in new tab
                    if (resultImage) {
                      if (resultImage.startsWith('data:')) {
                        // Base64 data URL - open directly
                        window.open(resultImage, '_blank');
                      } else {
                        // Regular URL - try to open
                        window.open(resultImage, '_blank');
                      }
                    }
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  🔍 Debug Image
                </button>
              )}
            </div>
          </div>
        )}

        {/* Selected Images Section - Always show if user is logged in */}
        {user && (
          <div className="mt-8">
            {selectedImages.length > 0 ? (
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 shadow-lg border border-green-200">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    Selected Images
                  </h3>
                  <p className="text-sm text-gray-600">
                    {selectedImages.length} image{selectedImages.length !== 1 ? 's' : ''} selected for download
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSelectedImages(!showSelectedImages)}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  {showSelectedImages ? '🙈 Hide' : '👁️ Show'}
                  <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                    {selectedImages.length}
                  </span>
                </button>
                <button
                  onClick={handleClearAllSelections}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  🗑️ Clear All
                </button>
              </div>
            </div>

                {showSelectedImages && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {selectedImages.map((image, index) => (
                      <div key={image.id || index} className="relative group">
                        <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all border-2 border-green-400 bg-green-50">
                          {/* Selected indicator badge */}
                          <div className="absolute top-2 left-2 z-10">
                            <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg">
                              ✓
                            </div>
                          </div>

                          <img
                            src={image.edited_image_url || image.original_image_url}
                            alt={`Selected ${index + 1}`}
                            className="w-full h-32 object-cover group-hover:scale-105 transition-transform"
                          />

                          {/* Remove button */}
                          <div className="absolute top-2 right-2 z-10">
                            <button
                              onClick={() => handleImageSelection(image.id, false)}
                              className="bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg transition-all hover:scale-110"
                              title="Remove from selection"
                            >
                              ✕
                            </button>
                          </div>

                          {/* Image info overlay */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                            <p className="text-white text-xs font-medium truncate">
                              {image.hairstyle_key ? image.hairstyle_key.replace('_', ' ').toUpperCase() : 'Unknown Style'}
                            </p>
                            <p className="text-green-300 text-xs">
                              ✓ Selected
                            </p>
                          </div>

                          {/* Hover overlay with actions */}
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleImageSelection(image.id, false)}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-lg transition-all"
                              >
                                Remove
                              </button>
                              <button
                                onClick={() => {
                                  // Download functionality for selected image
                                  const link = document.createElement('a');
                                  link.href = image.edited_image_url || image.original_image_url;
                                  link.download = `hairstyle_${image.hairstyle_key || 'image'}_${Date.now()}.png`;
                                  link.click();
                                }}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-lg transition-all"
                              >
                                Download
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Empty state when no images are selected */
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 shadow-lg border border-gray-200 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="bg-gray-300 text-gray-600 rounded-full w-16 h-16 flex items-center justify-center text-2xl">
                    📋
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">
                      No Images Selected Yet
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Generate some hairstyles and click "⭐ Select This Image" to add them to your collection
                    </p>
                    <div className="text-sm text-gray-500">
                      💡 Tip: Selected images will appear here for easy access and download
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <CameraCapture
          isOpen={isCameraOpen}
          onCapture={handleCameraCapture}
          onClose={() => setIsCameraOpen(false)}
        />

        {/* Crop Modal */}
        {showCropModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-auto">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">✂️ Crop Your Image</h3>
                <p className="text-gray-600">
                  Drag the corners to adjust the crop area. The image will be cropped to a perfect square.
                </p>
              </div>

              {imageToCrop && (
                <div className="mb-6">
                  <div className="flex justify-center">
                    <div className="max-w-lg w-full">
                      <ReactCrop
                        crop={crop}
                        onChange={(c) => {
                          setCrop(c);
                          console.log('Crop changed:', c);
                        }}
                        onComplete={(c) => {
                          setCompletedCrop(c);
                          console.log('Crop completed:', c);
                        }}
                        aspect={1}
                        minWidth={50}
                        minHeight={50}
                        keepSelection
                        className="max-w-full"
                      >
                        <img
                          ref={imgRef}
                          src={imageToCrop}
                          alt="Image to crop"
                          className="max-w-full h-auto"
                          style={{ maxHeight: '400px' }}
                          onLoad={(e) => {
                            const { naturalWidth, naturalHeight, width, height } = e.currentTarget;
                            console.log('Image loaded for crop:', { naturalWidth, naturalHeight, width, height });

                            const size = Math.min(width, height);
                            const x = (width - size) / 2;
                            const y = (height - size) / 2;

                            setCrop({
                              unit: 'px',
                              width: size * 0.8,
                              height: size * 0.8,
                              x: x + (size * 0.1),
                              y: y + (size * 0.1),
                              aspect: 1
                            });
                          }}
                          onError={(e) => {
                            console.error('Failed to load image for cropping:', e);
                            setStatus({ message: 'Failed to load image for cropping. Please try again.', type: 'error' });
                          }}
                        />
                      </ReactCrop>
                    </div>
                  </div>

                  <div className="text-center mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      💡 <strong>Interactive Crop:</strong> Drag the corners of the blue box to select the area you want to keep.
                      The crop area is automatically set to square for best transformation results.
                    </p>
                    {completedCrop && (
                      <div className="mt-2 text-xs text-blue-600">
                        📐 Selected area: {Math.round(completedCrop.width)} × {Math.round(completedCrop.height)} pixels
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleCropConfirm}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  ✂️ Crop to Square
                </button>
                <button
                  onClick={handleSkipCrop}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  📸 Use Original
                </button>
                <button
                  onClick={handleCropCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  ❌ Cancel
                </button>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">📋 Options Explained:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-700">
                  <div className="text-center">
                    <div className="text-lg mb-1">✂️</div>
                    <div className="font-medium">Crop to Square</div>
                    <div>Best for AI transformation. Creates perfect square from center.</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg mb-1">📸</div>
                    <div className="font-medium">Use Original</div>
                    <div>Keep original dimensions. May affect AI results.</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg mb-1">❌</div>
                    <div className="font-medium">Cancel</div>
                    <div>Go back and choose a different image.</div>
                  </div>
                </div>
                <div className="mt-3 text-center text-xs text-blue-600">
                  💡 <strong>Recommendation:</strong> Square images (1:1 ratio) work best with our AI hairstyle transformation
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default TryNow;