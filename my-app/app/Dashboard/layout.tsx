import ChatBox from "@/components/ChatBox";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ChatBox />
    </>
  );
}
