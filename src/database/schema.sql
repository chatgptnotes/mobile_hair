-- Create table for storing AI generated images
CREATE TABLE IF NOT EXISTS public.ai_images (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NULL,
  original_image_url TEXT NOT NULL,
  original_image_hash TEXT NULL, -- SHA-256 hash of original image for exact matching
  edited_image_url TEXT NULL,
  prompt TEXT NOT NULL,
  hairstyle_key TEXT NULL, -- Added for better caching (e.g., 'textured_quiff', 'pompadour')
  is_selected BOOLEAN NULL DEFAULT false, -- Track if image is currently selected by user
  status TEXT NULL DEFAULT 'processing'::text,
  created_at TIMESTAMP WITH TIME ZONE NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NULL DEFAULT now(),
  CONSTRAINT ai_images_pkey PRIMARY KEY (id),
  CONSTRAINT ai_images_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE,
  CONSTRAINT ai_images_status_check CHECK (
    (
      status = ANY (
        ARRAY[
          'processing'::text,
          'completed'::text,
          'failed'::text
        ]
      )
    )
  )
) TABLESPACE pg_default;

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_ai_images_user_id ON ai_images(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_images_status ON ai_images(status);
CREATE INDEX IF NOT EXISTS idx_ai_images_created_at ON ai_images(created_at);
CREATE INDEX IF NOT EXISTS idx_ai_images_prompt ON ai_images(prompt);
CREATE INDEX IF NOT EXISTS idx_ai_images_hairstyle_key ON ai_images(hairstyle_key);
CREATE INDEX IF NOT EXISTS idx_ai_images_original_hash ON ai_images(original_image_hash);
CREATE INDEX IF NOT EXISTS idx_ai_images_user_hairstyle ON ai_images(user_id, hairstyle_key); -- Composite index for fast user+style lookup
CREATE INDEX IF NOT EXISTS idx_ai_images_user_image_style ON ai_images(user_id, original_image_hash, hairstyle_key); -- Perfect cache match
CREATE INDEX IF NOT EXISTS idx_ai_images_is_selected ON ai_images(is_selected); -- For filtering selected images
CREATE INDEX IF NOT EXISTS idx_ai_images_user_selected ON ai_images(user_id, is_selected); -- For user's selected images

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_ai_images_updated_at
    BEFORE UPDATE ON ai_images
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE ai_images ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for now (you can restrict this later)
CREATE POLICY "Allow all operations on ai_images" ON ai_images
    FOR ALL USING (true);
