import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import ButtonGroup from './ButtonGroup.vue';

describe('ButtonGroup', () => {
  it('should render as group with slot content', () => {
    render(ButtonGroup, {
      slots: { default: '<button>A</button><button>B</button>' },
    });
    expect(screen.getByRole('group')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('should disable fieldset', () => {
    render(ButtonGroup, {
      props: { disabled: true },
      slots: { default: '<button>A</button>' },
    });
    expect(screen.getByRole('group')).toBeDisabled();
  });
});
