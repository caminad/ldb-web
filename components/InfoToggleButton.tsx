import clsx from 'clsx';
import { useRef } from 'react';
import { FocusRing, useToggleButton } from 'react-aria';
import { ToggleState } from 'react-stately';

export default function InfoToggleButton({
  toggleState,
}: {
  toggleState: ToggleState;
}) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const toggleButton = useToggleButton({}, toggleState, buttonRef);

  return (
    <FocusRing focusRingClass="shadow-outline">
      <button
        className={clsx(
          'p-2 rounded-full cursor-pointer select-none focus:outline-none',
          {
            'text-blue-700': toggleButton.isPressed,
            'text-blue-500': toggleState.isSelected,
          }
        )}
        title="Information"
        aria-label="Information"
        ref={buttonRef}
        {...toggleButton.buttonProps}
      >
        <svg
          className="w-5 h-5 m-0.5 bg-white rounded-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          width="20"
          height="20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </FocusRing>
  );
}
