export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      {/* <main className="flex-1"> */}
        {children}
      {/* </main> */}
    </div>
  );
}