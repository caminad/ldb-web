import ErrorBoundary from 'components/error-boundary';
import 'styles/tailwind.css';

export default {
  title: 'ErrorBoundary',
  component: ErrorBoundary,
};

function ExampleComponent() {
  return (
    <p className="border rounded p-4 font-bold">
      This component does not throw.
    </p>
  );
}

function ThrowingComponent(): JSX.Element {
  throw new Error('Thrown');
}

export const Basic = () => (
  <>
    <ErrorBoundary>
      <ThrowingComponent />
    </ErrorBoundary>
    <ErrorBoundary>
      <ExampleComponent />
    </ErrorBoundary>
  </>
);
