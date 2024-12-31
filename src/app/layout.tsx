'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '@/components/Layout';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentPath = usePathname();
  const mode = localStorage.getItem('darkMode');
  const onDarkModeChange = (v: boolean) => localStorage.setItem('darkMode', v);

  const links = [
    { path: '/', label: 'Home', disabled: currentPath == '/' },
    {
      path: '/create',
      label: '回答する',
      disabled: currentPath == '/create',
    },
    {
      path: '/preset',
      label: '質問集を作成する',
      disabled: currentPath == '/preset',
    },
    {
      path: '/delete',
      label: '質問集を削除する',
      disabled: currentPath == '/delete',
    },
    {
      path: '/result',
      label: '解答を参照する',
      disabled: currentPath == '/result',
    },
  ];
  return (
    <html lang='en'>
      <body>
        <Layout links={links} mode={mode} onDarkModeChange={onDarkModeChange}>
          {children}
        </Layout>
      </body>
    </html>
  );
}
