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
  const mode = localStorage.getItem("darkMode");
  const onDarkModeChange = (v: boolean) => localStorage.setItem("darkMode", v);

  const links = [
    { path: "/", label: "Home", disabled: currentPath == '/' },
    { path: "/create", label: "QAリスト適用", disabled: currentPath == '/create' },
    { path: "/preset", label: "QAリスト作成", disabled: currentPath == '/preset' },
    { path: "/delete", label: "QAプリセット削除", disabled: currentPath == '/delete' },
    { path: "/result", label: "QA解答データ参照", disabled: currentPath == '/result' },
  ];
  return (
    <html lang="en">
      <body>
        <Layout links={links} mode={mode} onDarkModeChange={onDarkModeChange}>
	  {children}
	</Layout>
      </body>
    </html>
  );
}
