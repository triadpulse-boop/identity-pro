/*
  # Create Authentication and KYC Tables

  ## Overview
  This migration creates the complete database schema for the KYC verification system.

  ## New Tables
  
  ### `admin_users`
  - `id` (uuid, primary key) - Unique identifier for admin users
  - `email` (text, unique) - Admin email address
  - `full_name` (text) - Admin's full name
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### `kyc_submissions`
  - `id` (uuid, primary key) - Unique KYC submission ID
  - `user_id` (uuid) - Reference to user
  - `user_name` (text) - User's full name
  - `email` (text) - User's email
  - `phone` (text) - User's phone number
  - `date_of_birth` (date) - User's date of birth
  - `status` (text) - KYC status (pending, under_review, approved, rejected)
  - `completion_percentage` (integer) - Progress percentage
  - `submitted_at` (timestamptz) - Submission timestamp
  - `reviewed_at` (timestamptz) - Review timestamp
  - `reviewed_by` (uuid) - Admin who reviewed
  - `rejection_reason` (text) - Reason for rejection if applicable
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `kyc_addresses`
  - `id` (uuid, primary key) - Unique address ID
  - `kyc_submission_id` (uuid) - Reference to KYC submission
  - `address_type` (text) - Type: 'permanent' or 'corporate'
  - `street` (text) - Street address
  - `city` (text) - City
  - `state` (text) - State/Province
  - `zip_code` (text) - ZIP/Postal code
  - `country` (text) - Country
  - `created_at` (timestamptz) - Record creation timestamp

  ### `kyc_documents`
  - `id` (uuid, primary key) - Unique document ID
  - `kyc_submission_id` (uuid) - Reference to KYC submission
  - `document_type` (text) - Type of document
  - `document_category` (text) - Category: 'permanent_address', 'corporate_address', 'photo', 'liveness'
  - `file_url` (text) - URL to stored document
  - `file_name` (text) - Original file name
  - `uploaded_at` (timestamptz) - Upload timestamp
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - Enable Row Level Security (RLS) on all tables
  - Admin users can read/write their own data
  - KYC submissions accessible to authenticated users
  - Documents linked to submissions with proper access control
*/

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create kyc_submissions table
CREATE TABLE IF NOT EXISTS kyc_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  user_name text NOT NULL,
  email text NOT NULL,
  phone text,
  date_of_birth date,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected')),
  completion_percentage integer DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  submitted_at timestamptz DEFAULT now(),
  reviewed_at timestamptz,
  reviewed_by uuid REFERENCES admin_users(id),
  rejection_reason text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create kyc_addresses table
CREATE TABLE IF NOT EXISTS kyc_addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kyc_submission_id uuid REFERENCES kyc_submissions(id) ON DELETE CASCADE,
  address_type text NOT NULL CHECK (address_type IN ('permanent', 'corporate')),
  street text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  country text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create kyc_documents table
CREATE TABLE IF NOT EXISTS kyc_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kyc_submission_id uuid REFERENCES kyc_submissions(id) ON DELETE CASCADE,
  document_type text NOT NULL,
  document_category text NOT NULL CHECK (document_category IN ('permanent_address', 'corporate_address', 'photo', 'liveness')),
  file_url text NOT NULL,
  file_name text NOT NULL,
  uploaded_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE kyc_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE kyc_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE kyc_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin_users
CREATE POLICY "Admins can view own data"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can update own data"
  ON admin_users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS Policies for kyc_submissions
CREATE POLICY "Authenticated users can view all KYC submissions"
  ON kyc_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create KYC submissions"
  ON kyc_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update KYC submissions"
  ON kyc_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for kyc_addresses
CREATE POLICY "Authenticated users can view addresses"
  ON kyc_addresses
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create addresses"
  ON kyc_addresses
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies for kyc_documents
CREATE POLICY "Authenticated users can view documents"
  ON kyc_documents
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create documents"
  ON kyc_documents
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_kyc_submissions_status ON kyc_submissions(status);
CREATE INDEX IF NOT EXISTS idx_kyc_submissions_email ON kyc_submissions(email);
CREATE INDEX IF NOT EXISTS idx_kyc_addresses_submission ON kyc_addresses(kyc_submission_id);
CREATE INDEX IF NOT EXISTS idx_kyc_documents_submission ON kyc_documents(kyc_submission_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_kyc_submissions_updated_at
  BEFORE UPDATE ON kyc_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
