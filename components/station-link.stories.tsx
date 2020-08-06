import StationLink from 'components/station-link';
import 'styles/tailwind.css';

export default {
  title: 'StationLink',
  component: StationLink,
};

export const Basic = (args: any) => <StationLink {...args} />;
