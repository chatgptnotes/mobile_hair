-- Migration: Add hairstyle_key and original_image_hash columns for better caching
-- Run this in your Supabase SQL Editor if you already have the ai_images table

-- Add hairstyle_key column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'ai_images'
        AND column_name = 'hairstyle_key'
    ) THEN
        ALTER TABLE public.ai_images
        ADD COLUMN hairstyle_key TEXT NULL;

        RAISE NOTICE 'Added hairstyle_key column to ai_images table';
    ELSE
        RAISE NOTICE 'hairstyle_key column already exists';
    END IF;
END $$;

-- Add original_image_hash column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'ai_images'
        AND column_name = 'original_image_hash'
    ) THEN
        ALTER TABLE public.ai_images
        ADD COLUMN original_image_hash TEXT NULL;

        RAISE NOTICE 'Added original_image_hash column to ai_images table';
    ELSE
        RAISE NOTICE 'original_image_hash column already exists';
    END IF;
END $$;

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_ai_images_hairstyle_key ON ai_images(hairstyle_key);
CREATE INDEX IF NOT EXISTS idx_ai_images_original_hash ON ai_images(original_image_hash);
CREATE INDEX IF NOT EXISTS idx_ai_images_user_hairstyle ON ai_images(user_id, hairstyle_key);
CREATE INDEX IF NOT EXISTS idx_ai_images_user_image_style ON ai_images(user_id, original_image_hash, hairstyle_key);

-- Update existing records to extract hairstyle from prompt (optional)
-- This tries to identify common hairstyles from existing prompts
UPDATE public.ai_images 
SET hairstyle_key = CASE
    WHEN prompt ILIKE '%textured_quiff%' OR prompt ILIKE '%textured quiff%' THEN 'textured_quiff'
    WHEN prompt ILIKE '%pompadour%' THEN 'pompadour'
    WHEN prompt ILIKE '%classic_pompadour%' OR prompt ILIKE '%classic pompadour%' THEN 'classic_pompadour'
    WHEN prompt ILIKE '%side_swept_pompadour%' OR prompt ILIKE '%side swept pompadour%' THEN 'side_swept_pompadour'
    WHEN prompt ILIKE '%short_side_part%' OR prompt ILIKE '%short side part%' THEN 'short_side_part'
    WHEN prompt ILIKE '%curly_top%' OR prompt ILIKE '%curly top%' THEN 'curly_top'
    ELSE NULL
END
WHERE hairstyle_key IS NULL AND status = 'completed';

-- Show migration results
SELECT 
    hairstyle_key,
    COUNT(*) as count,
    COUNT(*) * 100.0 / SUM(COUNT(*)) OVER() as percentage
FROM public.ai_images 
WHERE status = 'completed'
GROUP BY hairstyle_key
ORDER BY count DESC;

RAISE NOTICE 'Migration completed! Check the results above.';
