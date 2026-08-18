import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import TreeList from './TreeList.vue';

const schema = [
	{
    name: 'Fruits',
    children: [{ name: 'Apple' }, { name: 'Banana' }],
  },
	{
    name: 'Vegetables',
    children: [{ name: 'Carrot' }],
  },
	{ name: 'Grains' },
];

describe('TreeList', () => {
	it('should render tree role', () => {
		render(TreeList, {
      // @ts-expect-error TS can't infer generic component type
			props: { schema, nameNode: 'name', childrenNode: 'children' },
		});
		expect(screen.getByRole('tree')).toBeInTheDocument();
	});

	it('should render top-level items', () => {
		render(TreeList, {
      // @ts-expect-error TS can't infer generic component type
			props: { schema, nameNode: 'name', childrenNode: 'children' },
		});
		expect(screen.getByText('Fruits')).toBeInTheDocument();
		expect(screen.getByText('Vegetables')).toBeInTheDocument();
		expect(screen.getByText('Grains')).toBeInTheDocument();
	});

	it('should render nested items inside details', () => {
		render(TreeList, {
      // @ts-expect-error TS can't infer generic component type
			props: { schema, nameNode: 'name', childrenNode: 'children', open: true },
		});
		expect(screen.getByText('Apple')).toBeInTheDocument();
		expect(screen.getByText('Banana')).toBeInTheDocument();
		expect(screen.getByText('Carrot')).toBeInTheDocument();
	});

	it('should render treeitems', () => {
		render(TreeList, {
      // @ts-expect-error TS can't infer generic component type
			props: { schema, nameNode: 'name', childrenNode: 'children', open: true },
		});
		expect(screen.getAllByRole('treeitem').length).toBeGreaterThanOrEqual(3);
	});

	it('should pass item and path to default slot', () => {
		render(TreeList, {
      // @ts-expect-error TS can't infer generic component type
			props: { schema: [{ name: 'Root' }], nameNode: 'name', childrenNode: 'children' },
			slots: {
        // @ts-expect-error TS can't infer generic component type
				default: ({ item, path }: { item: Record<string, unknown>, path: unknown[] }) => `${item.name}[${path.join('/')}]`,
			},
		});
		expect(screen.getByText('Root[Root]')).toBeInTheDocument();
	});
});
