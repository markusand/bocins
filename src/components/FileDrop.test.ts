import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/vue';
import { userEvent } from '@testing-library/user-event';
import FileDrop from './FileDrop.vue';

const createFile = (name: string, type = 'text/plain', size = 100) => {
	return new File(['x'.repeat(size)], name, { type });
};

describe('FileDrop', () => {
	it('should render default label', () => {
		render(FileDrop);
		expect(screen.getByText('Click or Drop files')).toBeInTheDocument();
	});

	it('should render custom label', () => {
		render(FileDrop, { props: { label: 'Upload here' } });
		expect(screen.getByText('Upload here')).toBeInTheDocument();
	});

	it('should show file names after selecting files', async () => {
		const { container } = render(FileDrop);
		const input = container.querySelector('input[type="file"]') as HTMLInputElement;
		await fireEvent.change(input, { target: { files: [createFile('doc.txt')] } });
		expect(screen.getByText('doc.txt')).toBeInTheDocument();
		expect(screen.queryByText('Click or Drop files')).not.toBeInTheDocument();
	});

	it('should remove file when remove button clicked', async () => {
		const { container } = render(FileDrop, { props: { multiple: true } });
		const input = container.querySelector('input[type="file"]') as HTMLInputElement;
		await fireEvent.change(input, { target: { files: [createFile('a.txt'), createFile('b.txt')] } });
		expect(screen.getByText('a.txt')).toBeInTheDocument();
		expect(screen.getByText('b.txt')).toBeInTheDocument();
		const removeButtons = screen.getAllByRole('button');
		await userEvent.click(removeButtons[0]);
		expect(screen.queryByText('a.txt')).not.toBeInTheDocument();
		expect(screen.getByText('b.txt')).toBeInTheDocument();
	});

	it('should show label again after removing all files', async () => {
		const { container } = render(FileDrop);
		const input = container.querySelector('input[type="file"]') as HTMLInputElement;
		await fireEvent.change(input, { target: { files: [createFile('a.txt')] } });
		expect(screen.queryByText('Click or Drop files')).not.toBeInTheDocument();
		await userEvent.click(screen.getByRole('button'));
		expect(screen.getByText('Click or Drop files')).toBeInTheDocument();
	});

	it('should add files on drop', async () => {
		const { container } = render(FileDrop);
		const label = container.querySelector('label')!;
		const dt = new DataTransfer();
		dt.items.add(createFile('dropped.txt'));
		await fireEvent.drop(label, { dataTransfer: dt });
		expect(screen.getByText('dropped.txt')).toBeInTheDocument();
	});

	it('should disable input when disabled', () => {
		const { container } = render(FileDrop, { props: { disabled: true } });
		const input = container.querySelector('input[type="file"]');
		expect(input).toBeDisabled();
	});
});
