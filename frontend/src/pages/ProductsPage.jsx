import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MedicineCard from '../components/MedicineCard';
import styles from '../styles/productspage.module.css';
import { apiUrl } from '../utils/api';

const ProductsPage = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  const [priceRange, setPriceRange] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');

  const PRODUCTS_PER_PAGE = 25;

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(apiUrl(`/products/${category}?page=${currentPage}&limit=${PRODUCTS_PER_PAGE}`));
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`);
        }

        const data = await response.json();

        setProducts(data.products);
        setFilteredProducts(data.products); // Initial load = server-paginated data
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProductsByCategory();
    }
  }, [category, currentPage]);

  // Apply filters and search
  useEffect(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name?.toLowerCase().includes(q) ||
        p.manufacturer?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      );
    }

    if (priceRange !== 'all') {
      result = result.filter(p => {
        const price = p.price;
        switch (priceRange) {
          case 'under1000': return price < 1000;
          case '1000to2000': return price >= 1000 && price <= 2000;
          case '2000to5000': return price > 2000 && price <= 5000;
          case 'over5000': return price > 5000;
          default: return true;
        }
      });
    }

    if (ratingFilter !== 'all') {
      const minRating = parseInt(ratingFilter);
      result = result.filter(p => p.rating >= minRating);
    }

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      default: result.sort((a, b) => a.id - b.id); break;
    }

    setFilteredProducts(result);
  }, [products, searchQuery, priceRange, ratingFilter, sortBy]);

  const handlePageChange = (pageNumber) => {
    window.scrollTo(0, 0);
    setSearchParams({ page: pageNumber.toString() });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ page: '1' });
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    pageNumbers.push(
      <button key="prev" onClick={() => handlePageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className={styles.paginationButton} aria-label="Previous page">
        &laquo;
      </button>
    );

    if (startPage > 1) {
      pageNumbers.push(
        <button key={1} onClick={() => handlePageChange(1)} className={`${styles.paginationButton} ${1 === currentPage ? styles.activePage : ''}`}>
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="ellipsis1" className={styles.paginationEllipsis}>...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button key={i} onClick={() => handlePageChange(i)} className={`${styles.paginationButton} ${i === currentPage ? styles.activePage : ''}`}>
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="ellipsis2" className={styles.paginationEllipsis}>...</span>);
      }
      pageNumbers.push(
        <button key={totalPages} onClick={() => handlePageChange(totalPages)} className={`${styles.paginationButton} ${totalPages === currentPage ? styles.activePage : ''}`}>
          {totalPages}
        </button>
      );
    }

    pageNumbers.push(
      <button key="next" onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className={styles.paginationButton} aria-label="Next page">
        &raquo;
      </button>
    );

    return pageNumbers;
  };

  return (
    <div className={styles.productsPageContainer}>
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.searchSection}>
          <form className={styles.searchContainer} onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search by product name, brand, or description..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className={styles.searchButton}>Search</button>
          </form>
        </div>

        {loading ? (
          <div className={styles.loadingContainer}><p>Loading products...</p></div>
        ) : error ? (
          <div className={styles.errorContainer}><p>{error}</p></div>
        ) : (
          <>
            <div className={styles.filterSection}>
              <h2>Filter Options</h2>
              <div className={styles.filterOptions}>
                <div className={styles.filterGroup}>
                  <label>Price Range (PKR)</label>
                  <select className={styles.filterSelect} value={priceRange} onChange={(e) => { setPriceRange(e.target.value); setSearchParams({ page: '1' }); }}>
                    <option value="all">All Prices</option>
                    <option value="under1000">Under PKR 1,000</option>
                    <option value="1000to2000">PKR 1,000 - 2,000</option>
                    <option value="2000to5000">PKR 2,000 - 5,000</option>
                    <option value="over5000">Over PKR 5,000</option>
                  </select>
                </div>
                <div className={styles.filterGroup}>
                  <label>Rating</label>
                  <select className={styles.filterSelect} value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
                    <option value="all">All Ratings</option>
                    <option value="4">4 & up</option>
                    <option value="3">3 & up</option>
                    <option value="2">2 & up</option>
                    <option value="1">1 & up</option>
                  </select>
                </div>
                <div className={styles.filterGroup}>
                  <label>Sort By</label>
                  <select className={styles.filterSelect} value={sortBy} onChange={(e) => { setSortBy(e.target.value); setSearchParams({ page: '1' }); }}>
                    <option value="popularity">Popularity</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={styles.productsSection}>
              <h2 className={styles.sectionTitle}>Products ({filteredProducts.length})</h2>
              <div className={styles.productsGrid}>
                {filteredProducts.map((product) => (
                  <div key={product._id || product.id} className={styles.productGridItem}>
                    <MedicineCard product={product} />
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.paginationContainer}>{renderPagination()}</div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;