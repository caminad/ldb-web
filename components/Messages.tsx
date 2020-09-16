import DOMPurify from 'dompurify';

function Message(props: { rawHTML: string }) {
  const dirty = props.rawHTML
    .replace(
      // Add styling to anchors.
      /<[a] /gi,
      '$&class="font-medium text-blue-500 hover:underline" '
    )
    .replace(
      // Normalize National Rail URLs to avoid insecure redirect.
      /\bhttps?:\/\/(?:www\.)?nationalrail.co.uk\//gi,
      'https://www.nationalrail.co.uk/'
    );

  const __html = DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['a', 'p'],
    ALLOWED_ATTR: ['class', 'href'],
  });

  return <li className="mt-2" dangerouslySetInnerHTML={{ __html }} />;
}

export default function Messages(props: { items: string[] }) {
  return (
    <ul className="text-gray-700 text-sm">
      {props.items.map((rawHTML, index) => (
        <Message key={index} rawHTML={rawHTML} />
      ))}
    </ul>
  );
}
