-- Fix RLS Policy to Allow Anonymous Inserts

-- First, drop existing policies
DROP POLICY IF EXISTS "Anyone can insert leads" ON leads;
DROP POLICY IF EXISTS "Authenticated users can read leads" ON leads;

-- Create new policies that allow anonymous inserts
CREATE POLICY "Enable insert for all users" ON leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read for authenticated users" ON leads
  FOR SELECT USING (auth.role() = 'authenticated');

-- This allows anyone to submit the form (anonymous users)
-- But only authenticated users can view the data
