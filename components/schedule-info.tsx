import clsx from 'clsx';
import { ReactNode } from 'react';

function Row(props: {
  label: string;
  children?: ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <div
      className={clsx('grid grid-cols-2 items-baseline', props.className)}
      title={props.title}
    >
      <span className="opacity-50 font-light text-xs">{props.label}</span>
      {props.children || (
        <span className="border-b h-0 w-1/2 self-center m-auto" />
      )}
    </div>
  );
}

function Alteration(props: { scheduled: string; estimated?: string }) {
  const isTimeEstimate = props.estimated?.includes(':');

  return (
    <>
      <del className="line-through opacity-50">{props.scheduled}</del>
      <ins
        className={clsx(
          'no-underline font-marker',
          isTimeEstimate ? 'col-start-2' : 'col-span-2'
        )}
      >
        {props.estimated}
      </ins>
    </>
  );
}

function Time(props: { scheduled: string; estimated?: string }) {
  if (props.scheduled && props.estimated !== 'On time') {
    return <Alteration {...props} />;
  }
  return <>{props.scheduled}</>;
}

interface ScheduleInfoProps {
  platform?: string;
  sta?: string;
  eta?: string;
  std?: string;
  etd?: string;
}

export default function ScheduleInfo(props: ScheduleInfoProps) {
  return (
    <div className="flex flex-col space-y-2 justify-start w-40 text-center">
      <Row label="arrives">
        {props.sta && <Time scheduled={props.sta} estimated={props.eta} />}
      </Row>
      <Row label="platform">
        {props.platform && (
          <span className="text-2xl font-casual">{props.platform}</span>
        )}
      </Row>
      <Row label="departs">
        {props.std && <Time scheduled={props.std} estimated={props.etd} />}
      </Row>
    </div>
  );
}
