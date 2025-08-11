-- Migration: Add is_selected column to ai_images table
-- This column tracks whether an image is currently selected by the user

-- Add the is_selected column
ALTER TABLE public.ai_images 
ADD COLUMN IF NOT EXISTS is_selected BOOLEAN DEFAULT false;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_ai_images_is_selected ON public.ai_images(is_selected);
CREATE INDEX IF NOT EXISTS idx_ai_images_user_selected ON public.ai_images(user_id, is_selected);

-- Update existing records to have is_selected = false (default)
UPDATE public.ai_images 
SET is_selected = false 
WHERE is_selected IS NULL;

-- Add comment for documentation
COMMENT ON COLUMN public.ai_images.is_selected IS 'Tracks if image is currently selected by user for display';
