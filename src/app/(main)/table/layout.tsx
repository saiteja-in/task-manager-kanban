export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="container mx-auto w-full py-12">
        {/* <main className="flex-1"> */}
        
          {children}
        {/* </main> */}
      </div>
    );
  }