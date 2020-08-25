export default function Reason(props: { children?: string }) {
  if (!props.children) {
    return null;
  }
  return (
    <span className="text-gray-500 text-sm">
      ({props.children.replace(/^This train has been /, '')})
    </span>
  );
}
