import { Header } from "../_header/header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      {/* <main className="flex-1"> */}
      <Header />

        {children}
      {/* </main> */}
    </div>
  );
}