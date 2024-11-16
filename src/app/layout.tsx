"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '@/components/Layout';
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentPath = usePathname();

  const links = [
    { path: "/", label: "Home", disabled: currentPath == '/' },
    { path: "/create", label: "QAリスト適用", disabled: currentPath == '/create' },
    { path: "/delete", label: "QAプリセット削除", disabled: currentPath == '/delete' },
  ];
  return (
    <html lang="en">
      <body>
        <Layout links={links}>
	  {children}
	</Layout>
      </body>
    </html>
  );
}
