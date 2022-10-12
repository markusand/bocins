export const unique = () => Math.random().toString(36).slice(2);

export const normalize = (string = '') => string.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
