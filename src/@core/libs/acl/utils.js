/**
 * Returns ability result if ACL is configured or else just return true
 * Useful if you don't know if ACL is configured or not
 * Used in @core files to handle absence of ACL without errors
 * @param {String} action CASL Actions // https://casl.js.org/v4/en/guide/intro#basics
 * @param {String} subject CASL Subject // https://casl.js.org/v4/en/guide/intro#basics
 */
export const can = () => true

/**
 * Check if user can view item based on it's ability
 * Based on item's action and resource
 * @param {Object} item navigation object item
 */
export const canViewVerticalNavMenuLink = () => true

/**
 * Check if user can view item based on it's ability
 * Based on item's action and resource & Hide group if all of it's children are hidden
 * @param {Object} item navigation object item
 */
// eslint-disable-next-line arrow-body-style
export const canViewVerticalNavMenuGroup = () => {
  return true
}

/**
 * Check if user can view item based on it's ability
 * Based on item's action and resource
 * @param {Object} item navigation object item
 */
export const canViewVerticalNavMenuHeader = () => true

/**
 * Check if user can view item based on it's ability
 * Based on item's action and resource
 * @param {Object} item navigation object item
 */
export const canViewHorizontalNavMenuLink = () => true

/**
 * Check if user can view item based on it's ability
 * Based on item's action and resource
 * @param {Object} item navigation object item
 */
export const canViewHorizontalNavMenuHeaderLink = () => true

/**
 * Check if user can view item based on it's ability
 * Based on item's action and resource & Hide group if all of it's children are hidden
 * @param {Object} item navigation object item
 */
// eslint-disable-next-line arrow-body-style
export const canViewHorizontalNavMenuGroup = () => true

// eslint-disable-next-line arrow-body-style
export const canViewHorizontalNavMenuHeaderGroup = () => true
