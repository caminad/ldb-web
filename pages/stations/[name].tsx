import ErrorBoundary from 'components/error-boundary';
import Services from 'components/services';
import station_codes from 'data/station_codes.json';
import { castArray } from 'lodash';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const collator = new Intl.Collator('en-GB', {
  sensitivity: 'base',
  usage: 'search',
});

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const nameParam = castArray(context.params?.name)[0];
  for (const [name] of station_codes) {
    if (collator.compare(name, nameParam) === 0) {
      return { props: { name } };
    }
  }
  context.res.statusCode = 404;
  return { props: {} };
}

export default function StationPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();

  if (!props.name) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Services via {props.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4 m-auto container">
        <div className="flex justify-between items-baseline mb-4">
          <h1 className="text-4xl font-marker leading-none">
            Services via {props.name}
          </h1>
          <Link href="/">
            <a className="px-4 text-4xl opacity-50" title="Home">
              ×
            </a>
          </Link>
        </div>
        <ErrorBoundary>
          <Services locationName={props.name} />
        </ErrorBoundary>
      </main>
    </>
  );
}
