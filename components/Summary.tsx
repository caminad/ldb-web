import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { useToggleState } from 'react-stately';

const Messages = dynamic(() => import('components/Messages'));
const InfoToggleButton = dynamic(() => import('components/InfoToggleButton'));

export default function Summary({
  messages,
  children,
}: {
  messages: string[] | undefined;
  children: ReactNode;
}) {
  const toggleState = useToggleState();

  return (
    <div className="relative mb-4">
      <div className="pr-8 whitespace-no-wrap overflow-x-auto">{children}</div>

      {messages && (
        <div className="absolute top-0 right-0 -my-2">
          <InfoToggleButton toggleState={toggleState} />
        </div>
      )}

      {messages && toggleState.isSelected && <Messages items={messages} />}
    </div>
  );
}
