import CheckApp from '@/containers/CheckApp';
import { Metadata } from 'next';
import { headers } from 'next/headers';

type Props = {
  params: { title: string; description: string; imagePreviewURL: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const title = `${searchParams?.title || 'Ứng dụng Túc Tắc Tea'}`;
  const description = `${
    searchParams?.description ||
    'Ứng dụng giúp bạn tận hưởng những ly trà đặc biệt từ Túc Tắc.'
  }`;
  const imagePreviewURL = `${
    searchParams?.imagePreviewURL ||
    'https://scontent.fhan4-6.fna.fbcdn.net/v/t39.30808-6/447677934_439523248881519_6960822162951939674_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=K7bSCWrq8PsQ7kNvgEhvSRd&_nc_ht=scontent.fhan4-6.fna&oh=00_AYBK-XTQj6_DLUf9lluKyhGKxKP7RYhRUMX2VvER-bIJEQ&oe=6672F3AB'
  }`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imagePreviewURL,
        },
      ],
      url: process.env.NEXT_PUBLIC_BASE_URL,
      type: 'website',
    },
  };
}

export default function Page() {
  const headersList = headers();
  const userAgent = headersList.get('user-agent') || '';
  return (
    <div className="flex">
      <CheckApp userAgent={userAgent} />
    </div>
  );
}
