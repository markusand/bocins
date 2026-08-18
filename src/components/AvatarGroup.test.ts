import { h } from 'vue';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import AvatarGroup from './AvatarGroup.vue';
import Avatar from './Avatar.vue';

const avatars = () => [
  h(Avatar, { name: 'Alice', src: null }),
  h(Avatar, { name: 'Bob', src: null }),
  h(Avatar, { name: 'Charlie', src: null }),
];

describe('AvatarGroup', () => {
  it('should render avatars inside the group', () => {
    render(AvatarGroup, { slots: { default: avatars } });
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });
});
