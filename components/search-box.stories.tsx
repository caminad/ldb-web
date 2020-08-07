import SearchBox from 'components/search-box';

export default {
  title: 'SearchBox',
  component: SearchBox,
  parameters: { actions: { argTypesRegex: '^on.*' } },
};

export const Basic = (args: any) => (
  <SearchBox
    suggestions={['Glasgow Queen Street', 'Heathrow Terminal 5', 'The Moon']}
    href={location.href}
    asPathFn={() => location.href}
    {...args}
  />
);
