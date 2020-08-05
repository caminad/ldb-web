import React from 'react';
import '../styles/tailwind.css';
import StationSearch from './station-search';

export default {
  title: 'StationSearch',
  component: StationSearch,
};

export const Basic = (args: any) => <StationSearch {...args} />;
