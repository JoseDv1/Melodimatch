import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
	'https://deyarmvgntzkzjhwvscn.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRleWFybXZnbnR6a3pqaHd2c2NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAzOTA1NjQsImV4cCI6MTk5NTk2NjU2NH0.wb6zWym6nbHT7COc1uT-NC9H1k0eN3NO648GnIuOWtk'
);
