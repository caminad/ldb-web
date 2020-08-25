export default function PlaceholderList() {
  return (
    <ul className="flex flex-col space-y-2">
      {[4, 10, 0, 6, 2, 2, 6, 1, 6, 0, 10, 10, 10, 0, 5, 3, 0, 6, 4, 11].map(
        (x, i) => (
          <li key={i}>
            <div
              className="h-6 max-w-full rounded bg-gray-200 animate-pulse"
              style={{ width: `${15 + x}rem` }}
            />
          </li>
        )
      )}
    </ul>
  );
}
