import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/vue';
import { userEvent } from '@testing-library/user-event';
import DatePicker from './DatePicker.vue';

beforeAll(() => {
	HTMLElement.prototype.showPopover ??= vi.fn();
	HTMLElement.prototype.hidePopover ??= vi.fn();
});

describe('DatePicker', () => {
	it('should show placeholder when no date selected', () => {
		render(DatePicker, { props: { modelValue: undefined } });
		expect(screen.getByText('Select date')).toBeInTheDocument();
	});

	it('should show custom placeholder', () => {
		render(DatePicker, { props: { modelValue: undefined, placeholder: 'Pick one' } });
		expect(screen.getByText('Pick one')).toBeInTheDocument();
	});

	it('should display selected date', () => {
		const date = new Date(2025, 0, 15);
		render(DatePicker, { props: { modelValue: date } });
    expect(screen.queryByText('Select date')).not.toBeInTheDocument();
  });

	it('should display formatted date with formatter', () => {
		const date = new Date(2025, 0, 15);
		const formatter = (d: Date) => d.toLocaleDateString('en', { month: 'short', day: 'numeric' });
		render(DatePicker, { props: { modelValue: date, formatter } });
		expect(screen.getByText('Jan 15')).toBeInTheDocument();
	});

	it('should clear date when clear button clicked', async () => {
		const date = new Date(2025, 0, 15);
		render(DatePicker, { props: { modelValue: date, clearable: true } });
		expect(screen.queryByText('Select date')).not.toBeInTheDocument();
		await userEvent.click(screen.getByRole('button', { name: 'Clear' }));
		expect(screen.getByText('Select date')).toBeInTheDocument();
	});

	it('should display formatted date range', () => {
		const start = new Date(2025, 0, 10);
		const end = new Date(2025, 0, 20);
		const formatter = (d: Date) => d.toLocaleDateString('en', { month: 'short', day: 'numeric' });
		render(DatePicker, { props: { modelValue: [start, end], formatter } });
		expect(screen.getByText('Jan 10')).toBeInTheDocument();
		expect(screen.getByText('Jan 20')).toBeInTheDocument();
	});

	it('should clear date range when clear button clicked', async () => {
		const start = new Date(2025, 0, 10);
		const end = new Date(2025, 0, 20);
		render(DatePicker, { props: { modelValue: [start, end], clearable: true } });
		await userEvent.click(screen.getByRole('button', { name: 'Clear' }));
		expect(screen.getByText('Select date')).toBeInTheDocument();
	});

	it('should render preset buttons when presets enabled', () => {
		render(DatePicker, { props: { modelValue: undefined, presets: true, lazy: false } });
		expect(screen.getByText('today')).toBeInTheDocument();
		expect(screen.getByText('yesterday')).toBeInTheDocument();
		expect(screen.getByText('WTD')).toBeInTheDocument();
		expect(screen.getByText('MTD')).toBeInTheDocument();
		expect(screen.getByText('YTD')).toBeInTheDocument();
	});

	it('should render custom separator slot in range', () => {
		const start = new Date(2025, 0, 10);
		const end = new Date(2025, 0, 20);
		render(DatePicker, {
			props: { modelValue: [start, end] },
			slots: { separator: 'to' },
		});
		expect(screen.getByText('to')).toBeInTheDocument();
	});

	it('should render custom placeholder slot', () => {
		render(DatePicker, {
			props: { modelValue: undefined },
			slots: { placeholder: 'Choose...' },
		});
		expect(screen.getByText('Choose...')).toBeInTheDocument();
	});

	it('should pass date to date slot', () => {
		const date = new Date(2025, 0, 15);
		render(DatePicker, {
			props: { modelValue: date },
			slots: {
				date: ({ date }: { date: Date }) => `day:${date.getDate()}`,
			},
		});
		expect(screen.getByText('day:15')).toBeInTheDocument();
	});

	it('should pass dates to dates slot', () => {
		const start = new Date(2025, 0, 10);
		const end = new Date(2025, 0, 20);
		render(DatePicker, {
			props: { modelValue: [start, end] },
			slots: {
				dates: ({ dates }: { dates: [Date, Date] }) =>
					`${dates[0].getDate()}-${dates[1].getDate()}`,
			},
		});
		expect(screen.getByText('10-20')).toBeInTheDocument();
	});

	it('should apply disabled state', () => {
		render(DatePicker, { props: { modelValue: undefined, disabled: true } });
		expect(screen.getByRole('button')).toBeDisabled();
	});

	it('should apply invalid class', () => {
		const { container } = render(DatePicker, {
      props: { modelValue: undefined, invalid: true },
    });
		expect(container.querySelector('.is-invalid')).toBeInTheDocument();
	});
});
