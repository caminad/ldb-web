import clsx from 'clsx';
import { ReactNode } from 'react';

export default function DetailWrapper(props: {
  children: ReactNode;
  isCancelled?: boolean;
}) {
  return (
    <div
      className={clsx(
        'whitespace-no-wrap overflow-x-auto flex items-center space-x-1',
        {
          'text-gray-500': props.isCancelled,
        }
      )}
    >
      {props.children}
    </div>
  );
}
