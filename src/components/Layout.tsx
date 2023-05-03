import Navbar from "./Navbar";

import Footer from "./Footer";

const Layout = ({ children }: any) => {
  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <Navbar />
      <div style={{flex: 1, marginTop: "90px"}} id="top">
      {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
