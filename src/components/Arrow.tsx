import React from 'react';

interface ArrowProps {
	disabled: boolean;
	left?: boolean;
	onClick: (e: React.MouseEvent<SVGSVGElement>) => void;
}

const Arrow: React.FC<ArrowProps> = (props) => {
	const { disabled, left, onClick } = props;
	const disabledClass = disabled ? ' arrow--disabled' : '';
	const arrowDirectionClass = left ? 'arrow--left' : 'arrow--right';

	return (
		<svg
			onClick={onClick}
			className={`arrow ${arrowDirectionClass}${disabledClass} cursor-pointer `}
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			width='20' // Adjust the width here
			height='20'
			fill='white'>
			{left ? (
				<path d='M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z' />
			) : (
				<path d='M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z' />
			)}
		</svg>
	);
};

export default Arrow;
