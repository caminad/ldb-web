import clsx from 'clsx';

function Label(props: { children: string | undefined }) {
  return (
    <dt className="opacity-50 tracking-tighter text-xs">{props.children}</dt>
  );
}

function ScheduledTime(props: { children: string; onTime: boolean }) {
  return (
    <dd className={clsx({ 'opacity-50 line-through': !props.onTime })}>
      {props.children}
    </dd>
  );
}

function EstimatedTime(props: { children: string | undefined }) {
  const isFormattedTime = props.children?.includes(':');
  return (
    <dd
      className={clsx({
        'col-start-2': isFormattedTime,
        'col-span-2 font-bold': !isFormattedTime,
        hidden: props.children === 'On time',
      })}
    >
      {props.children}
    </dd>
  );
}

function Platform(props: { children: string | undefined }) {
  return (
    <dd
      className={clsx({
        'opacity-25': !props.children,
        'font-bold': props.children,
      })}
    >
      {props.children || '—'}
    </dd>
  );
}

export default function ScheduleInfo(props: {
  className?: string;
  sta?: string;
  eta?: string;
  platform?: string;
  std?: string;
  etd?: string;
  platformAvailable?: boolean;
}) {
  return (
    <dl
      className={clsx(
        'grid grid-cols-2 text-center items-baseline',
        props.className
      )}
    >
      {props.sta && (
        <>
          <Label>arrives</Label>
          <ScheduledTime onTime={props.eta === 'On time'}>
            {props.sta}
          </ScheduledTime>
          <EstimatedTime>{props.eta}</EstimatedTime>
        </>
      )}

      {props.platformAvailable && (
        <>
          <Label>platform</Label>
          <Platform>{props.platform}</Platform>
        </>
      )}

      {props.std && (
        <>
          <Label>departs</Label>
          <ScheduledTime onTime={props.etd === 'On time'}>
            {props.std}
          </ScheduledTime>
          <EstimatedTime>{props.etd}</EstimatedTime>
        </>
      )}
    </dl>
  );
}
