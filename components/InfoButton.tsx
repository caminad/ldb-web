export default function InfoButton(props: {
  onClick: () => void;
  hidden: boolean;
}) {
  return (
    <button
      className="hover:text-blue-500 focus:text-blue-500"
      onClick={props.onClick}
      hidden={props.hidden}
    >
      <svg
        className="information-circle w-6 h-6 rounded-full"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
      >
        <title>Information</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="sr-only">Information</span>
    </button>
  );
}
