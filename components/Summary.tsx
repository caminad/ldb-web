import { useToggleState } from '@react-stately/toggle';
import { ToggleProps } from '@react-types/checkbox';
import dynamic from 'next/dynamic';

const Messages = dynamic(() => import('components/Messages'));
const InfoToggleButton = dynamic(() => import('components/InfoToggleButton'));

export default function Summary(
  props: ToggleProps & { messages: string[] | undefined }
) {
  const toggleState = useToggleState(props);

  return (
    <div className="relative mb-4">
      <div className="pr-8 whitespace-no-wrap overflow-x-auto">
        {props.children}
      </div>

      {props.messages && (
        <div className="absolute top-0 right-0 -my-2">
          <InfoToggleButton toggleState={toggleState} {...props} />
        </div>
      )}

      {props.messages && toggleState.isSelected && (
        <Messages items={props.messages} />
      )}
    </div>
  );
}
