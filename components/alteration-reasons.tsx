import clsx from 'clsx';
import isString from 'lodash/isString';

export default function AlterationReasons(props: {
  value: (string | undefined)[];
}): JSX.Element {
  const reasons = props.value.filter(isString);
  return (
    <>
      {reasons.map((reason, index, reasons) => (
        <p
          key={`${index}-${reason}`}
          className={clsx('font-casual', {
            'line-through opacity-50': index < reasons.length - 1,
          })}
        >
          {reason}
        </p>
      ))}
    </>
  );
}
