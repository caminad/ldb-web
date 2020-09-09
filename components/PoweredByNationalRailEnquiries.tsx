/**
 * - Source: https://en.wikipedia.org/wiki/File:NationalRail.svg
 * - Branding guidelines: https://www.nationalrail.co.uk/static/documents/Brand_Guidelines_Logos.zip
 *
 * > - The National Rail Enquiries logo should only be used in it’s intended corporate blue gradient, black or white.
 * > - The logo should not be warped from the original shape and proportions.
 * > - The logo opacity should always be 100% [opacity].
 * > - The logo icon must accompany the “National Rail Enquiries” text.
 */
export default function PoweredByNationalRailEnquiries() {
  return (
    <a
      className="inline-block text-nre-corporate-blue"
      href="https://www.nationalrail.co.uk/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="grid items-center gap-x-2 leading-none">
        <span className="col-start-2 opacity-75 lowercase">Powered by </span>
        <svg
          className="text-nre-corporate-blue"
          width="36"
          height="36"
          viewBox="4.9 4.9 80.9 80.9"
          fill="currentColor"
        >
          <path d="M25.8,25.7l20.5,9.4H14.5v6.4h32L30.9,49H14.5v6.3h16.4l19.5,9.4H65l-20.5-9.4h31.9V49H44.5l15.6-7.6h16.3 V35H60l-19.5-9.4H25.8 M4.9,45.3C4.9,23,23,4.9,45.3,4.9S85.8,23,85.8,45.3S67.7,85.8,45.3,85.8C23,85.8,4.9,67.7,4.9,45.3z" />
        </svg>
        <span className="text-2xl">
          <span className="font-bold">National Rail</span>{' '}
          <span className="opacity-75 tracking-tighter">Enquiries</span>
        </span>
      </div>
    </a>
  );
}
