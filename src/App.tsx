import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReviewsProvider } from '@/context/ReviewsContext';
import { Layout } from '@/components/Layout';
import { ScrollToTop } from '@/components/ScrollToTop';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { ServicesPage } from '@/pages/ServicesPage';
import { TestimonialsPage } from '@/pages/TestimonialsPage';
import { ContactPage } from '@/pages/ContactPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { LocalSeoJsonLd } from '@/components/LocalSeoJsonLd';

export default function App() {
  return (
    <BrowserRouter>
      <ReviewsProvider>
        <LocalSeoJsonLd />
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="testimonials" element={<TestimonialsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ReviewsProvider>
    </BrowserRouter>
  );
}
