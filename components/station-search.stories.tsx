import StationSearch from 'components/station-search';
import 'styles/tailwind.css';

export default {
  title: 'StationSearch',
  component: StationSearch,
};

export const Basic = (args: any) => <StationSearch {...args} />;
