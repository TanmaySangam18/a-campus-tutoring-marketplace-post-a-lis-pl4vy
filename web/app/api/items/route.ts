import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseUrl, supabaseAnonKey } from '../../lib/supabase';
import { createClient } from '@supabase/supabase-js';

const supabaseUrlEnv = process.env.SUPABASE_URL;
const supabaseAnonKeyEnv = process.env.SUPABASE_ANON_KEY;

const supabase = supabaseUrlEnv && supabaseAnonKeyEnv
  ? createClient(supabaseUrlEnv, supabaseAnonKeyEnv)
  : {
      from: async () => ({ data: [] }),
      insert: async () => ({ data: [] }),
      delete: async () => ({ data: [] }),
    };

export async function GET() {
  const { data } = await supabase.from('tutors').select('*');
  return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST({ request }) {
  const { name, subject } = await request.json();
  const { data } = await supabase.from('tutors').insert([{ name, subject }]);
  return new Response(JSON.stringify(data[0]), { status: 201 });
}

export async function DELETE({ params }) {
  const { id } = params;
  await supabase.from('tutors').delete().eq('id', id);
  return new Response(null, { status: 204 });
}
