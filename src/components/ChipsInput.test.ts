import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import { userEvent } from '@testing-library/user-event';
import ChipsInput from './ChipsInput.vue';

describe('ChipsInput', () => {
	it('should render existing chips', () => {
		render(ChipsInput, { props: { modelValue: ['foo', 'bar'] } });
		expect(screen.getByText('foo')).toBeInTheDocument();
		expect(screen.getByText('bar')).toBeInTheDocument();
	});

	it('should add chip on separator input', async () => {
    render(ChipsInput, { props: { modelValue: [] } });
		const input = screen.getByRole('textbox');
		await userEvent.type(input, 'hello,');
    expect(screen.getByText('hello')).toBeInTheDocument();
	});

	it('should remove chip on button click', async () => {
		render(ChipsInput, { props: { modelValue: ['foo', 'bar'] } });
		const buttons = screen.getAllByRole('button');
		await userEvent.click(buttons[0]);
		expect(screen.queryByText('foo')).not.toBeInTheDocument();
		expect(screen.getByText('bar')).toBeInTheDocument();
	});

	it('should remove last chip on backspace with empty input', async () => {
		render(ChipsInput, { props: { modelValue: ['foo', 'bar'] } });
		const input = screen.getByRole('textbox');
		await userEvent.click(input);
		await userEvent.keyboard('{Backspace}');
		expect(screen.getByText('foo')).toBeInTheDocument();
		expect(screen.queryByText('bar')).not.toBeInTheDocument();
	});

	it('should deduplicate chips', async () => {
		const { emitted } = render(ChipsInput, { props: { modelValue: ['foo'] } });
		const input = screen.getByRole('textbox');
		await userEvent.type(input, 'foo,');
		expect(emitted()['update:modelValue'].at(-1)).toEqual([['foo']]);
	});
});
