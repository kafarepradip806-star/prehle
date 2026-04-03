import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/components/auth/AuthProvider";
// import AIBubble from "@/components/ai/AIBubble";
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          <Header />
          {children}
          {/* <AIBubble/> */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
