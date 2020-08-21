import SearchBox from 'components/search-box';

export default {
  title: 'SearchBox',
  component: SearchBox,
  parameters: { actions: { argTypesRegex: '^on.*' } },
};

export const Basic = (args: any) => (
  <SearchBox href={location.href} asPathFn={() => location.href} {...args} />
);
