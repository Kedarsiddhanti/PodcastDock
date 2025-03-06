import Header from './Header';
import LeftSidebar from './LeftSidebar';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <Header />
      <div className="flex flex-1">
        <LeftSidebar />
        <main className="flex-1 p-4 ml-56 mt-12">{children}</main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;