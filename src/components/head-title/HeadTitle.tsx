import { HeadTitleProps } from '@/helpers/props';
import Head from 'next/head';

const HeadTitle = ({ title }: HeadTitleProps) => {
  return (
    <Head>
      <title>{`${title} - OMG Nepal`}</title>
    </Head>
  );
};

export default HeadTitle;
