import { useEffect } from 'react';
import styles from '../styles/alert.module.css';

const Alert = ({ message, type, isVisible, onClose }) => {
    useEffect(() => {
      if (isVisible) {
        // Auto-dismiss after 2 seconds
        const timer = setTimeout(() => {
          onClose();
        }, 2000);
        
        return () => clearTimeout(timer);
      }
    }, [isVisible, onClose]);
    
    if (!isVisible) return null;
    
    // Icons for different alert types
    const getIcon = () => {
      switch(type) {
        case 'success':
          return (
            <div className={styles.icon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18457 2.99721 7.13633 4.39828 5.49707C5.79935 3.85782 7.69279 2.71538 9.79619 2.24015C11.8996 1.76491 14.1003 1.98234 16.07 2.86" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 4L12 14.01L9 11.01" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          );
        case 'error':
          return (
            <div className={styles.icon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#F44336" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 9L9 15" stroke="#F44336" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 9L15 15" stroke="#F44336" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          );
        case 'info':
          return (
            <div className={styles.icon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16V12" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8H12.01" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          );
        default:
          return null;
      }
    };
    
    return (
      <div className={`${styles.alert} ${styles[type]}`}>
        <div className={styles.content}>
          {getIcon()}
          <span className={styles.message}>{message}</span>
        </div>
        <button 
          className={styles.closeButton} 
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      </div>
    );
  };
  
  export default Alert;