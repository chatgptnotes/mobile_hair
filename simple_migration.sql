-- Simple migration: Add is_selected column to existing ai_images table

ALTER TABLE public.ai_images 
ADD COLUMN is_selected BOOLEAN DEFAULT false;
