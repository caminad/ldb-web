export default function Platform(props: { children?: string }) {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center w-8 rounded bg-current text-xs font-semibold font-features tabular-numbers uppercase"
      title="Platform"
    >
      <span className="text-white">{props.children || '―'}</span>
    </div>
  );
}
