export default function Operator(props: { children: string }) {
  return (
    <span
      className="px-1 border rounded text-xs font-medium tracking-tight"
      title="Operator"
    >
      {props.children}
    </span>
  );
}
