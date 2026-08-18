import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import Avatar from './Avatar.vue';

describe('Avatar', () => {
  it('should render image when src is provided', () => {
    render(Avatar, { props: { name: 'Jane Doe', src: '/avatar.jpg' } });
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Jane Doe');
  });

  it('should render initials when src is null', () => {
    render(Avatar, { props: { name: 'Jane Doe', src: null } });
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('should render single initial for single name', () => {
    render(Avatar, { props: { name: 'Jane', src: null } });
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('should show badge with number', () => {
    render(Avatar, { props: { name: 'Jane', src: null, badge: 5 } });
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should show empty badge when badge is true', () => {
    render(Avatar, { props: { name: 'Jane', src: null, badge: true } });
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should render badge slot content', () => {
    render(Avatar, {
      props: { name: 'Jane', src: null },
      slots: { badge: 'New' },
    });
    expect(screen.getByRole('status')).toHaveTextContent('New');
  });

  it('should not show badge by default', () => {
    render(Avatar, { props: { name: 'Jane', src: null } });
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
