import type { Config } from 'tailwindcss';
const withMT = require('@material-tailwind/react/utils/withMT');

const config: Config = withMT({
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
		'./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
		'./node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
	],
	theme: {
		extend: {
			colors: {
				greens: '#069B03',
				bgGreen: '#D5FFD3',
				dark: '#333333',
			},
		},
		screens: {
			xs: '350px',
			sm: '480px',
			ms: '600px',
			mss: '911px',
			md: '768px',
			lg: '976px',
			ll: '1030px',
			xl: '1440px',
		},
		backgroundImage: {
			hero: "url('/hero.png')",
		},
		fontFamily: {
			poppins: ['Poppins', 'sans-serif'],
		},
	},
	plugins: [],
});
export default config;
