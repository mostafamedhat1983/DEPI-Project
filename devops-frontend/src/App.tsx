import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Navigation } from './components/layout/Navigation';
import { Banner } from './components/layout/Banner';
import { Footer } from './components/layout/Footer';
import { CompareDrawer } from './components/ProductComparison/CompareDrawer';
import { HomePage } from './components/pages/HomePage';
import { CategoryPage } from './components/pages/CategoryPage';
import { ProductDetailsPage } from './components/pages/ProductDetailsPage';
import { Cart } from './components/Cart/Cart';
import { WishlistPage } from './components/pages/WishlistPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { OrdersPage } from './components/pages/OrdersPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { LoginForm } from './components/Auth/LoginForm';
import { SignupForm } from './components/Auth/SignupForm';
import { CheckoutSuccess } from './components/checkout/CheckoutSuccess';
import { ComparePage } from './components/pages/ComparePage';
import { ShippingPage } from './components/pages/ShippingPage';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { TermsPage } from './components/pages/TermsPage';
import { SitemapPage } from './components/pages/SitemapPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <Navigation />
        <Banner />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/category/:category/:subcategory" element={<CategoryPage />} />
            <Route path="/product/:productId" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/sitemap" element={<SitemapPage />} />
          </Routes>
        </main>
        
        <Footer />
        <CompareDrawer />
      </div>
    </Router>
  );
}

export default App;