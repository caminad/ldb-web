import clsx from 'clsx';

function Label(props: { children: string | undefined }) {
  return <dt className="opacity-50 font-light text-xs">{props.children}</dt>;
}

function ScheduledTime(props: {
  children: string | undefined;
  onTime: boolean;
}) {
  return (
    <dd
      className={clsx({
        'opacity-50 line-through': props.children && !props.onTime,
        'border-b h-0 w-1/2 m-auto': !props.children,
      })}
    >
      {props.children}
    </dd>
  );
}

function EstimatedTime(props: { children: string | undefined }) {
  return (
    <dd
      className={clsx('font-marker col-start-2', {
        'col-start-2': props.children?.includes(':'),
        'sr-only': props.children === 'On time',
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
        'text-2xl font-casual': props.children,
        'border-b h-0 w-1/2 m-auto': !props.children,
      })}
    >
      {props.children}
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
}) {
  return (
    <dl
      className={clsx(
        'grid grid-cols-2 text-center items-baseline',
        props.className
      )}
    >
      <Label>arrives</Label>
      <ScheduledTime onTime={props.eta === 'On time'}>
        {props.sta}
      </ScheduledTime>
      <EstimatedTime>{props.eta}</EstimatedTime>

      <Label>platform</Label>
      <Platform>{props.platform}</Platform>

      <Label>departs</Label>
      <ScheduledTime onTime={props.etd === 'On time'}>
        {props.std}
      </ScheduledTime>
      <EstimatedTime>{props.etd}</EstimatedTime>
    </dl>
  );
}
