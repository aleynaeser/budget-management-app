'use client';

export default function Error({ error }: { error: Error; reset: () => void }) {
  return <div className='error'>{error.message}</div>;
}
