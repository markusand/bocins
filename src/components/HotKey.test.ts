import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import { userEvent } from '@testing-library/user-event';
import Hotkey from './HotKey.vue';

describe('Hotkey', () => {
	it('should render key labels', () => {
		render(Hotkey, { props: { keys: 'ctrl+s' } });
		expect(screen.getByText('ctrl')).toBeInTheDocument();
		expect(screen.getByText('s')).toBeInTheDocument();
	});

	it('should render escape as ESC', () => {
		render(Hotkey, { props: { keys: 'escape' } });
		expect(screen.getByText('ESC')).toBeInTheDocument();
	});

	it('should emit press on matching keydown', async () => {
		const { emitted } = render(Hotkey, { props: { keys: 'ctrl+s' } });
		await userEvent.keyboard('{Control>}s{/Control}');
		expect(emitted().press).toBeTruthy();
	});

	it('should not emit when disabled', async () => {
		const { emitted } = render(Hotkey, { props: { keys: 'ctrl+s', disabled: true } });
		await userEvent.keyboard('{Control>}s{/Control}');
		expect(emitted().press).toBeFalsy();
	});
});
