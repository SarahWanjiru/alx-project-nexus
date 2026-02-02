const NexusLogo = ({ size = 80 }) => {
  return (
    <div
      className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg"
      style={{ width: size, height: size }}
    >
      <svg
        width={size * 0.5}
        height={size * 0.5}
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle cx="12" cy="12" r="3" fill="white" />
        <circle cx="12" cy="5" r="2" fill="white" />
        <circle cx="12" cy="19" r="2" fill="white" />
        <circle cx="5" cy="12" r="2" fill="white" />
        <circle cx="19" cy="12" r="2" fill="white" />
        <circle cx="7.5" cy="7.5" r="1.5" fill="white" />
        <circle cx="16.5" cy="16.5" r="1.5" fill="white" />
        <circle cx="7.5" cy="16.5" r="1.5" fill="white" />
        <circle cx="16.5" cy="7.5" r="1.5" fill="white" />
      </svg>
    </div>
  );
};

export default NexusLogo;
