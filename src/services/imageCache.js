import { supabase } from '../lib/supabase.js';
import {
  generateImageHash,
  generateUniqueHash,
  normalizeStyleName,
  normalizeColorCode
} from '../utils/imageHash.js';

/**
 * Convert displayed image element to blob using canvas
 * @param {HTMLImageElement} imgElement - The displayed image element
 * @returns {Promise<Blob|null>} - Image blob or null if failed
 */
const convertDisplayedImageToBlob = async (imgElement) => {
  return new Promise((resolve) => {
    try {
      // Create canvas and draw the already-loaded image
      const canvas = document.createElement('canvas');
      canvas.width = imgElement.naturalWidth || imgElement.width;
      canvas.height = imgElement.naturalHeight || imgElement.height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(imgElement, 0, 0);

      // Convert to blob
      canvas.toBlob((blob) => {
        console.log('✅ Converted displayed image to blob:', blob?.size, 'bytes');
        resolve(blob);
      }, 'image/png', 0.9);
    } catch (error) {
      console.error('❌ Canvas conversion failed:', error);
      resolve(null);
    }
  });
};

/**
 * Upload displayed image to Supabase Storage
 * @param {HTMLImageElement} imgElement - The displayed image element
 * @param {string} fileName - Unique filename for storage
 * @returns {Promise<string|null>} - Supabase Storage URL or null if failed
 */
const uploadDisplayedImageToStorage = async (imgElement, fileName) => {
  try {
    console.log('📥 Converting displayed image to blob');

    // Convert displayed image to blob
    const imageBlob = await convertDisplayedImageToBlob(imgElement);

    if (!imageBlob) {
      throw new Error('Failed to convert displayed image to blob');
    }

    console.log('📥 Image converted to blob:', imageBlob.size, 'bytes');

    // Upload to Supabase Storage
    console.log('📤 Uploading to Supabase Storage:', fileName);
    const { data, error } = await supabase.storage
      .from('generated-images')
      .upload(fileName, imageBlob, {
        contentType: 'image/png',
        upsert: false
      });

    if (error) {
      console.error('❌ Supabase upload error:', error);
      throw error;
    }

    console.log('✅ Upload successful:', data);

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('generated-images')
      .getPublicUrl(fileName);

    console.log('🔗 Generated public URL:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('❌ Error uploading to storage:', error);
    return null;
  }
};

/**
 * Upload original image file to Supabase Storage and return permanent URL
 * @param {File} imageFile - The image file to upload
 * @returns {Promise<string|null>} - Permanent URL or null if failed
 */
const uploadImageToStorage = async (imageFile) => {
  try {
    // Generate unique filename
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(7);
    const fileName = `original-${timestamp}-${randomId}.png`;

    console.log('📤 Uploading original image to Supabase Storage:', fileName);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('generated-images')
      .upload(fileName, imageFile, {
        contentType: imageFile.type || 'image/png',
        upsert: false
      });

    if (error) {
      console.error('❌ Supabase upload error:', error);
      throw error;
    }

    console.log('✅ Upload successful:', data);

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('generated-images')
      .getPublicUrl(fileName);

    console.log('🔗 Generated public URL:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('❌ Error uploading to storage:', error);
    return null;
  }
};

/**
 * Check if a generated image already exists in cache
 * @param {File} imageFile - The original image file
 * @param {string} hairstyle - Selected hairstyle key (e.g., 'textured_quiff', 'pompadour')
 * @param {string} prompt - The transformation prompt
 * @param {string} userId - Current user ID
 * @returns {Promise<string|null>} - URL of cached image or null if not found
 */
export const getCachedImage = async (imageFile, hairstyle, prompt, userId = null) => {
  try {
    // Generate hash for the original image
    const imageHash = await generateImageHash(imageFile);

    console.log('🔍 Cache lookup details:', {
      imageHash: imageHash.substring(0, 8) + '...',
      hairstyle,
      userId,
      prompt: prompt.substring(0, 50) + '...'
    });

    // Generate hash for original image to compare with cached images
    const originalImageHash = await generateImageHash(imageFile);

    // If user is logged in, check for user-specific cache first
    if (userId) {
      console.log('🔍 Checking user-specific cache for user:', userId, 'with hairstyle:', hairstyle);
      console.log('🔍 Original image hash:', originalImageHash.substring(0, 12) + '...');

      // First try: PERFECT MATCH - exact user + original_image_hash + hairstyle_key (most precise)
      const { data: perfectMatchData, error: perfectMatchError } = await supabase
        .from('ai_images')
        .select('edited_image_url, status, created_at, hairstyle_key, original_image_hash')
        .eq('user_id', userId)
        .eq('original_image_hash', originalImageHash)
        .eq('hairstyle_key', hairstyle)
        .eq('status', 'completed')
        .not('edited_image_url', 'is', null)
        .order('created_at', { ascending: false })
        .limit(1);

      if (perfectMatchError) {
        console.log('🔍 Perfect match cache query error:', perfectMatchError.code, perfectMatchError.message);
      } else if (perfectMatchData && perfectMatchData.length > 0) {
        console.log('🎯 PERFECT CACHE HIT! Same user + same image + same hairstyle:', perfectMatchData[0].edited_image_url);
        console.log('🎯 Original image hash match:', originalImageHash.substring(0, 12) + '...');
        return perfectMatchData[0].edited_image_url;
      }

      // Second try: user + hairstyle_key match (without image comparison)
      const { data: userStyleData, error: userStyleError } = await supabase
        .from('ai_images')
        .select('edited_image_url, status, created_at, hairstyle_key')
        .eq('user_id', userId)
        .eq('hairstyle_key', hairstyle)
        .eq('status', 'completed')
        .not('edited_image_url', 'is', null)
        .order('created_at', { ascending: false })
        .limit(1);

      if (userStyleError) {
        console.log('🔍 User+style cache query error:', userStyleError.code, userStyleError.message);
      } else if (userStyleData && userStyleData.length > 0) {
        console.log('🎯 User cache hit! Found transformation for same user + hairstyle_key:', userStyleData[0].edited_image_url);
        return userStyleData[0].edited_image_url;
      }

      // Third try: user + prompt pattern match (fallback for older records without hairstyle_key)
      const { data: userPromptData, error: userPromptError } = await supabase
        .from('ai_images')
        .select('edited_image_url, status, created_at')
        .eq('user_id', userId)
        .ilike('prompt', `%${hairstyle}%`)
        .eq('status', 'completed')
        .not('edited_image_url', 'is', null)
        .order('created_at', { ascending: false })
        .limit(1);

      if (userPromptError) {
        console.log('🔍 User+prompt cache query error:', userPromptError.code, userPromptError.message);
      } else if (userPromptData && userPromptData.length > 0) {
        console.log('🎯 User cache hit! Found transformation for same user + prompt pattern:', userPromptData[0].edited_image_url);
        return userPromptData[0].edited_image_url;
      }
    }

    // Fallback: check by exact prompt match (for any user)
    console.log('🔍 Checking global cache by prompt...');
    const { data, error } = await supabase
      .from('ai_images')
      .select('edited_image_url, status, created_at')
      .eq('prompt', prompt)
      .eq('status', 'completed')
      .not('edited_image_url', 'is', null)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      console.log('🔍 Global cache query error:', error.code, error.message);
      return null;
    }

    if (data && data.length > 0) {
      console.log('🔍 Global cache hit! Found completed transformation:', data[0].edited_image_url);
      return data[0].edited_image_url;
    }

    console.log('🔍 Cache miss - no completed transformation found');
    return null;
  } catch (error) {
    console.error('Error checking cached image:', error);
    return null; // Return null on error to allow fallback to generation
  }
};

/**
 * Store a newly generated image in cache
 * @param {File} imageFile - The original image file
 * @param {string} hairstyle - Selected hairstyle key (e.g., 'textured_quiff', 'pompadour')
 * @param {string} prompt - The transformation prompt
 * @param {string} generatedImageUrl - URL of the generated image
 * @param {string} userId - Current user ID
 * @returns {Promise<string|null>} - Record ID if successful, null if failed
 */
export const cacheGeneratedImage = async (imageFile, hairstyle, prompt, generatedImageUrl, userId = null) => {
  try {
    console.log('💾 Caching image details:', {
      hairstyle,
      prompt: prompt.substring(0, 50) + '...',
      imageUrl: generatedImageUrl,
      userId
    });

    // Generate hash for original image for exact matching
    const originalImageHash = await generateImageHash(imageFile);
    console.log('💾 Original image hash:', originalImageHash.substring(0, 12) + '...');

    // First, upload original image to get a permanent URL
    const originalImageUrl = await uploadImageToStorage(imageFile);
    if (!originalImageUrl) {
      console.error('Failed to upload original image to storage');
      return null;
    }

    // Insert into Supabase ai_images table
    const { data, error } = await supabase
      .from('ai_images')
      .insert({
        user_id: userId,
        original_image_url: originalImageUrl,
        original_image_hash: originalImageHash, // Store hash for exact matching
        edited_image_url: generatedImageUrl,
        prompt: prompt,
        hairstyle_key: hairstyle, // Store the hairstyle key for efficient lookups
        status: 'completed'
      })
      .select('id')
      .single();

    if (error) {
      console.log('💾 Cache insert error:', error.code, error.message);
      throw error;
    }

    console.log('💾 Image successfully cached with ID:', data.id, 'for hairstyle:', hairstyle);
    console.log('💾 Cache key: user_id=' + userId + ', image_hash=' + originalImageHash.substring(0, 8) + '..., style=' + hairstyle);
    return data.id;
  } catch (error) {
    console.error('Error caching generated image:', error);
    return null; // Return null on error but don't break the flow
  }
};

/**
 * Get statistics about cached images
 * @returns {Promise<Object>} - Cache statistics
 */
export const getCacheStats = async () => {
  try {
    const { count, error } = await supabase
      .from('ai_images')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;

    return {
      totalCachedImages: count || 0,
      success: true
    };
  } catch (error) {
    console.error('Error getting cache stats:', error);
    return {
      totalCachedImages: 0,
      success: false,
      error: error.message
    };
  }
};

/**
 * Test storage bucket access and permissions
 * @returns {Promise<Object>} - Test results
 */
export const testStorageAccess = async () => {
  console.log('🧪 Testing storage access...');

  try {
    // Test 1: List bucket contents
    const { data: listData, error: listError } = await supabase.storage
      .from('generated-images')
      .list();

    if (listError) {
      console.error('❌ Cannot list bucket:', listError);
      return { success: false, error: 'Cannot access bucket', details: listError };
    }

    console.log('✅ Bucket access OK. Current files:', listData.length);

    // Test 2: Try uploading a test file
    const testBlob = new Blob(['test'], { type: 'text/plain' });
    const testFileName = `test-${Date.now()}.txt`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('generated-images')
      .upload(testFileName, testBlob);

    if (uploadError) {
      console.error('❌ Cannot upload to bucket:', uploadError);
      return { success: false, error: 'Cannot upload to bucket', details: uploadError };
    }

    console.log('✅ Upload test successful');

    // Clean up test file
    await supabase.storage
      .from('generated-images')
      .remove([testFileName]);

    return {
      success: true,
      message: 'Storage access working correctly',
      fileCount: listData.length
    };

  } catch (error) {
    console.error('❌ Storage test failed:', error);
    return { success: false, error: error.message };
  }
};

// Make test function available globally
if (typeof window !== 'undefined') {
  window.testStorageAccess = testStorageAccess;
}
