import Header from '@components/Header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id='app-layout'>
      <Header />
      {children}
    </div>
  );
}
