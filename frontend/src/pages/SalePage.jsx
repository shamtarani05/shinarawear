import React, { useEffect, useState } from 'react';
import MedicineCard from '../components/MedicineCard';
import CategoryFilter from '../components/CategoryFilter';
import styles from '../styles/productspage.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const categories = [
  "Men's Collection",
  "Women's Collection",
  "Ethnic Wear",
  "Accessories",
];

const PRODUCTS_PER_PAGE = 24;

const SalePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchSaleProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        let url = `http://localhost:3000/products?discountMin=10&page=${currentPage}&limit=${PRODUCTS_PER_PAGE}`;
        if (selectedCategory) url += `&category=${encodeURIComponent(selectedCategory)}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch sale products');
        const data = await response.json();
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
      } catch {
        setProducts([]);
        setTotalPages(1);
        setError('Failed to load sale products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchSaleProducts();
  }, [selectedCategory, currentPage]);

  const handlePageChange = (pageNumber) => {
    window.scrollTo(0, 0);
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    pageNumbers.push(
      <button key="prev" onClick={() => handlePageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className={styles.paginationButton} aria-label="Previous page">&laquo;</button>
    );
    if (startPage > 1) {
      pageNumbers.push(
        <button key={1} onClick={() => handlePageChange(1)} className={`${styles.paginationButton} ${1 === currentPage ? styles.activePage : ''}`}>1</button>
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="ellipsis1" className={styles.paginationEllipsis}>...</span>);
      }
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button key={i} onClick={() => handlePageChange(i)} className={`${styles.paginationButton} ${i === currentPage ? styles.activePage : ''}`}>{i}</button>
      );
    }
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="ellipsis2" className={styles.paginationEllipsis}>...</span>);
      }
      pageNumbers.push(
        <button key={totalPages} onClick={() => handlePageChange(totalPages)} className={`${styles.paginationButton} ${totalPages === currentPage ? styles.activePage : ''}`}>{totalPages}</button>
      );
    }
    pageNumbers.push(
      <button key="next" onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className={styles.paginationButton} aria-label="Next page">&raquo;</button>
    );
    return <div className={styles.paginationContainer}>{pageNumbers}</div>;
  };

  return (
    <>
      <Header />
      <main className={styles.mainContent}>
        <section className={styles.productsSection}>
          <div className={styles.sectionTitle}>On Sale</div>
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onChange={(cat) => { setSelectedCategory(cat); setCurrentPage(1); }}
          />
          {loading ? (
            <div className={styles.loadingContainer}><p>Loading...</p></div>
          ) : error ? (
            <div className={styles.errorContainer}><p>{error}</p></div>
          ) : products.length === 0 ? (
            <div className={styles.noProducts}><p>No sale products found.</p></div>
          ) : (
            <div className={styles.productsGrid}>
              {products.map(product => (
                <div className={styles.productGridItem} key={product._id || product.id}>
                  <MedicineCard product={product} />
                </div>
              ))}
            </div>
          )}
          {renderPagination()}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SalePage; 