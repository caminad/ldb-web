import InfoButton from 'components/InfoButton';
import useDistanceToNow from 'hooks/useDistanceToNow';
import { useReducer } from 'react';

export default function Summary(props: {
  label: string;
  generatedAt: string | undefined;
  messages: string[];
}) {
  const [showMessages, toggleShowMessages] = useReducer(
    (state) => !state,
    false
  );

  const distanceToNow = useDistanceToNow(props.generatedAt);

  return (
    <div>
      <div className="relative pr-8">
        <span className="inline-block font-extrabold">{props.label}</span>{' '}
        <span className="inline-block text-gray-700 text-sm">
          {distanceToNow && <>(updated {distanceToNow})</>}
        </span>{' '}
        <span className="absolute top-0 right-0">
          <InfoButton
            onClick={toggleShowMessages}
            hidden={props.messages.length === 0}
          />
        </span>
      </div>

      <ul className="text-gray-700 text-sm" hidden={!showMessages}>
        {props.messages.map((message, index) => (
          <li key={index} className="mt-2 whitespace-pre-line">
            {message
              .replace(/<\/?.*?>/g, '')
              .replace(
                / More (?:information|details) can be found in Latest Travel News./,
                ''
              )}
          </li>
        ))}
      </ul>
    </div>
  );
}
