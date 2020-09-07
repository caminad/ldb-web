export default function Platform(props: {
  direction: 'out' | 'in';
  children?: string;
}) {
  return (
    <div className="h-5 flex-shrink-0 flex font-semibold tabular-nums uppercase">
      <div className="w-9 h-full text-white flex-grow text-center">
        <div
          className="w-full h-full flex items-center bg-gray-700 rounded-l leading-none"
          title={`platform ${props.children || 'unknown'}`}
        >
          <div className="m-auto text-xs">
            {props.children || (
              <svg
                className="inline w-5 h-5 -my-5"
                role="img"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  // small minus
                  fillRule="evenodd"
                  d="M3 9a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
      <div className="text-white flex-grow text-center text-xs">
        {props.direction === 'in' && (
          <svg
            className="inline w-6 h-5 bg-pink-500 rounded-r"
            role="img"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              // small arrow-narrow-left
              fillRule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {props.direction === 'out' && (
          <svg
            className="inline w-6 h-5 bg-purple-500 rounded-r"
            role="img"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              // small arrow-narrow-right
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
