import { it, expect, vi } from 'vitest';
import { useFiles } from './use.files';

const createFile = (name: string, size = 100, type = 'image/png') =>
	new File(['x'.repeat(size)], name, { type });

const toFileList = (files: File[]): FileList => {
	const list = { length: files.length, item: (i: number) => files[i] ?? null };
	files.forEach((f, i) => Object.defineProperty(list, i, { value: f }));
	return list as unknown as FileList;
};

it('should add files', () => {
	const { files, addFiles } = useFiles({}, vi.fn());
	addFiles(toFileList([createFile('a.png')]));
	expect(files.value).toHaveLength(1);
	expect(files.value[0].name).toBe('a.png');
});

it('should remove file by name', () => {
	const { files, addFiles, removeFile } = useFiles({ multiple: true }, vi.fn());
	const file = createFile('a.png');
	addFiles(toFileList([file, createFile('b.png')]));
	removeFile(file);
	expect(files.value).toHaveLength(1);
	expect(files.value[0].name).toBe('b.png');
});

it('should error FILES_ERROR when fileList is undefined', () => {
	const onError = vi.fn();
	const { addFiles } = useFiles({}, onError);
	addFiles(undefined);
	expect(onError).toHaveBeenCalledWith('FILES_ERROR');
});

it('should limit to 1 file when multiple is falsy', () => {
	const onError = vi.fn();
	const { addFiles } = useFiles({}, onError);
	addFiles(toFileList([createFile('a.png'), createFile('b.png')]));
	expect(onError).toHaveBeenCalledWith('FILES_AMOUNT_ERROR');
});

it('should limit to n files when multiple is a number', () => {
	const onError = vi.fn();
	const { files, addFiles } = useFiles({ multiple: 2 }, onError);
	addFiles(toFileList([createFile('a.png'), createFile('b.png')]));
	expect(files.value).toHaveLength(2);

	addFiles(toFileList([createFile('c.png')]));
	expect(onError).toHaveBeenCalledWith('FILES_AMOUNT_ERROR');
});

it('should allow unlimited files when multiple is true', () => {
	const onError = vi.fn();
	const { files, addFiles } = useFiles({ multiple: true }, onError);
	addFiles(toFileList([createFile('a.png'), createFile('b.png'), createFile('c.png')]));
	expect(files.value).toHaveLength(3);
	expect(onError).not.toHaveBeenCalled();
});

it('should error SIZE_ERROR and skip file exceeding maxSize', () => {
	const onError = vi.fn();
	const { files, addFiles } = useFiles({ maxSize: 1, multiple: true }, onError);
	addFiles(toFileList([createFile('big.png', 2000), createFile('small.png', 500)]));
	expect(onError).toHaveBeenCalledWith('SIZE_ERROR', expect.objectContaining({ name: 'big.png' }));
	expect(files.value).toHaveLength(1);
	expect(files.value[0].name).toBe('small.png');
});

it('should error EXTENSION_ERROR and skip file with wrong format', () => {
	const onError = vi.fn();
	const { files, addFiles } = useFiles({ formats: 'image/png,jpg', multiple: true }, onError);
	addFiles(toFileList([createFile('a.png'), createFile('b.gif', 100, 'image/gif')]));
	expect(onError).toHaveBeenCalledWith('EXTENSION_ERROR', expect.objectContaining({ name: 'b.gif' }));
	expect(files.value).toHaveLength(1);
});

it('should match format by extension', () => {
	const onError = vi.fn();
	const { files, addFiles } = useFiles({ formats: 'jpg' }, onError);
	addFiles(toFileList([createFile('photo.jpg', 100, 'image/jpeg')]));
	expect(files.value).toHaveLength(1);
	expect(onError).not.toHaveBeenCalled();
});
