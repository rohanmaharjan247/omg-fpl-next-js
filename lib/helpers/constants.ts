import { Poppins } from 'next/font/google';

export const LEAGUE_ID = Number(process.env.LEAGUE_ID);
export const H2H_LEAGUE_ID = Number(process.env.H2H_LEAGUE_ID);

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-poppins',
});
