import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/vue';
import { userEvent } from '@testing-library/user-event';
import Calendar from './Calendar.vue';

beforeAll(() => {
  HTMLElement.prototype.showPopover ??= vi.fn();
  HTMLElement.prototype.hidePopover ??= vi.fn();
});

describe('Calendar', () => {
  it('should render weekday headers', () => {
    render(Calendar, { props: { modelValue: new Date(2025, 0, 15) } });
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('Sun')).toBeInTheDocument();
  });

  it('should render localized weekday headers', () => {
    render(Calendar, { props: { modelValue: new Date(2025, 0, 15), locale: 'ca' } });
    expect(screen.getByText('dl.')).toBeInTheDocument();
    expect(screen.getByText('dg.')).toBeInTheDocument();
  });

  it('should have prev/next month navigation', () => {
    render(Calendar, { props: { modelValue: new Date(2025, 0, 15) } });
    expect(screen.getByLabelText('Previous month')).toBeInTheDocument();
    expect(screen.getByLabelText('Next month')).toBeInTheDocument();
  });

  it('should render day buttons for the month', () => {
    render(Calendar, { props: { modelValue: new Date(2025, 0, 15) } });
    expect(screen.getByText('15')).toBeInTheDocument();
    // Grid shows full weeks (42 or 35 day cells) + 2 prev/next + 2 selectors
    expect(screen.getAllByRole('button').length).toEqual(39);
  });

  it('should emit select when a day is clicked', async () => {
    const { emitted } = render(Calendar, {
      props: { modelValue: new Date(2025, 0, 15) },
    });
    await userEvent.click(screen.getByText('20'));
    const data = emitted().select as Date[][];
    expect(data).toBeDefined();
    expect(data[0][0].getDate()).toBe(20);
  });

  it('should disable excluded dates', () => {
    render(Calendar, {
      props: {
        modelValue: new Date(2025, 0, 15),
        excluded: [new Date(2025, 0, 10)],
      },
    });
    expect(screen.getByText('10').closest('button')).toBeDisabled();
  });

  it('should only enable allowed dates', () => {
    render(Calendar, {
      props: {
        modelValue: new Date(2025, 0, 15),
        allowed: [new Date(2025, 0, 10), new Date(2025, 0, 15)],
      },
    });
    expect(screen.getByText('10').closest('button')).not.toBeDisabled();
    expect(screen.getByText('15').closest('button')).not.toBeDisabled();
    expect(screen.getByText('12').closest('button')).toBeDisabled();
  });

  it('should disable dates before notBefore', () => {
    render(Calendar, {
      props: {
        modelValue: new Date(2025, 0, 15),
        notBefore: new Date(2025, 0, 10),
      },
    });
    expect(screen.getByText('9').closest('button')).toBeDisabled();
    expect(screen.getByText('10').closest('button')).not.toBeDisabled();
  });

  it('should disable dates after notAfter', () => {
    render(Calendar, {
      props: {
        modelValue: new Date(2025, 0, 15),
        notAfter: new Date(2025, 0, 20),
      },
    });
    expect(screen.getByText('20').closest('button')).not.toBeDisabled();
    expect(screen.getByText('21').closest('button')).toBeDisabled();
  });

  it('should support range selection', async () => {
    const { emitted } = render(Calendar, {
      props: { modelValue: [undefined, undefined] as [Date | undefined, Date | undefined] },
    });
    await userEvent.click(screen.getByText('5'));
    await userEvent.click(screen.getByText('10'));
    const data = emitted().select as Date[][][];
    expect(data).toHaveLength(2);
    expect(data[0][0][1].getDate()).toBe(5);
    expect(data[1][0][0].getDate()).toBe(5);
    expect(data[1][0][1].getDate()).toBe(10);
  });

  it('should change month with arrow buttons', async () => {
    render(Calendar, {
      props: { modelValue: new Date(2025, 0, 15) },
    });
    expect(screen.getByRole('button', { name: 'January' })).toBeInTheDocument();
    await userEvent.click(screen.getByLabelText('Next month'));
    expect(screen.getByRole('button', { name: 'February' })).toBeInTheDocument();
  });

  it("should change month clicking on faded other month's day", async () => {
    render(Calendar, {
      props: { modelValue: new Date(2025, 1, 15) },
    });
    expect(screen.getByRole('button', { name: 'February' })).toBeInTheDocument();
    await userEvent.click(screen.getByText('31').closest('button')!);
    expect(screen.getByRole('button', { name: 'January' })).toBeInTheDocument();
  });
});
