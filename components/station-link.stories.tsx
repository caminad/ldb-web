import React from 'react';
import '../styles/tailwind.css';
import StationLink from './station-link';

export default { title: 'StationLink' };

export function currentStation() {
  return <StationLink isCurrent={true}>Current Station</StationLink>;
}

export function currentStationVia() {
  return (
    <StationLink isCurrent={true} via="via Some Other Station">
      Current Station
    </StationLink>
  );
}

export function anotherStation() {
  return <StationLink isCurrent={false}>Another Station</StationLink>;
}

export function anotherStationVia() {
  return (
    <StationLink isCurrent={false} via="via Some Other Station">
      Another Station
    </StationLink>
  );
}
