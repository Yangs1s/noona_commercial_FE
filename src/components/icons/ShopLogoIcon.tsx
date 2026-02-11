export const ShopLogoIcon = ({ size = 200, color = "#333" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="100"
      cy="100"
      r="80"
      fill="none"
      stroke={color}
      strokeWidth="2"
    />
    <text
      x="100"
      y="100"
      textAnchor="middle"
      dominantBaseline="central"
      fontFamily="Arial, sans-serif"
      fontSize="80"
      fill={color}
    >
      S
    </text>
  </svg>
);
