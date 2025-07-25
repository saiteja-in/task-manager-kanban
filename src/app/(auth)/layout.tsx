import { Header } from "../_header/header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <main className="flex-1"> */}
      <Header />

        {children}
      {/* </main> */}
    </div>
  );
}