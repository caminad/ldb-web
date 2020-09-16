import { useToggleButton } from '@react-aria/button';
import { FocusRing } from '@react-aria/focus';
import { useToggleState } from '@react-stately/toggle';
import { ToggleProps } from '@react-types/checkbox';
import clsx from 'clsx';
import DOMPurify from 'dompurify';
import { useRef } from 'react';

function Message(props: { rawHTML: string }) {
  const dirty = props.rawHTML
    .replace(
      // Add styling to anchors.
      /<[a] /gi,
      '$&class="font-medium text-blue-500 hover:underline" '
    )
    .replace(
      // Normalize National Rail URLs to avoid insecure redirect.
      /\bhttps?:\/\/(?:www\.)?nationalrail.co.uk\//gi,
      'https://www.nationalrail.co.uk/'
    );

  const __html = DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['a', 'p'],
    ALLOWED_ATTR: ['class', 'href'],
  });

  return <li className="mt-2" dangerouslySetInnerHTML={{ __html }} />;
}

function Messages(props: { items: string[] }) {
  return (
    <ul className="text-gray-700 text-sm">
      {props.items.map((rawHTML, index) => (
        <Message key={index} rawHTML={rawHTML} />
      ))}
    </ul>
  );
}

export default function Summary(props: ToggleProps & { messages: string[] }) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const toggleState = useToggleState(props);
  const toggleButton = useToggleButton(props, toggleState, buttonRef);

  return (
    <div className="relative mb-4">
      <div className="pr-8 whitespace-no-wrap overflow-x-auto">
        {props.children}
      </div>

      <FocusRing focusRingClass="shadow-outline">
        <button
          className={clsx(
            'absolute top-0 right-0 -my-2 p-2 rounded-full cursor-pointer select-none focus:outline-none',
            {
              'text-blue-700': toggleButton.isPressed,
              'text-blue-500': toggleState.isSelected,
            }
          )}
          hidden={props.messages.length === 0}
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

      {toggleState.isSelected && <Messages items={props.messages} />}
    </div>
  );
}
