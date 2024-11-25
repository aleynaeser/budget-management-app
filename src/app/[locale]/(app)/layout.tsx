import Header from '@components/Header';
import NotificationContainer from '@components/Notification';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id='app-layout'>
      <Header />
      <NotificationContainer />
      {children}
    </div>
  );
}
