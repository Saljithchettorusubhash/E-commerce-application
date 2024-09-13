// middleware/convertExpiry.middleware.js

/**
 * Convert MM/YY format to an ISO 8601 date string for the last day of the month.
 * @param {string} monthYear - Expiry date in MM/YY format.
 * @returns {string} - ISO 8601 date string.
 */
function convertExpiryToDateTime(monthYear) {
    const [month, year] = monthYear.split('/').map(Number);
    const date = new Date(year + 2000, month, 0); // Set to the last day of the month
    return date.toISOString().split('T')[0] + 'T00:00:00Z'; // Convert to ISO 8601 format
  }
  
  /**
   * Middleware to convert expiry date from MM/YY to ISO 8601 format.
   */
  function convertExpiryDate(req, res, next) {
    if (req.body.expiry_date) {
      req.body.expiry_date = convertExpiryToDateTime(req.body.expiry_date);
    }
    next();
  }
  
  export default convertExpiryDate;
  