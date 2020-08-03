import { isDefined } from 'helpers';

export default function AlterationReasons(props: {
  value: (string | undefined)[];
}): JSX.Element {
  const reasons = props.value.filter(isDefined);
  return (
    <>
      {reasons.map((reason, index, reasons) => (
        <p
          key={`${index}-${reason}`}
          className={
            index === reasons.length - 1
              ? 'font-casual'
              : 'font-casual line-through opacity-50'
          }
        >
          {reason}
        </p>
      ))}
    </>
  );
}
