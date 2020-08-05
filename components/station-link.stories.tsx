import React from 'react';
import '../styles/tailwind.css';
import StationLink from './station-link';

export default {
  title: 'StationLink',
  component: StationLink,
};

export const Basic = (args: any) => <StationLink {...args} />;
