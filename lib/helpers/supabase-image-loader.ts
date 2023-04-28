const projectId = process.env.NEXT_PUBLIC_SUPABASE_URL; // your supabase project id

type SupabaseImageLoaderProps = {
  src: string;
  width: string;
  quality: string;
};

export default function supabaseLoader({
  src,
  width,
  quality,
}: SupabaseImageLoaderProps) {
  return `${projectId}/storage/v1/render/image/public/${src}?width=${width}&quality=${
    quality || 75
  }`;
}
