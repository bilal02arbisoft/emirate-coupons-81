# TODO: Debug and Fix Category Filtering in StoresPage.jsx

## Current Issue
- Selecting a category from the dropdown doesn't show related stores
- Filtering logic appears correct but may have data structure mismatch

## Debug Steps
- [x] Add detailed console logging to inspect actual API data structures
- [x] Verify category IDs match store categories arrays
- [x] Check if API is returning expected data format
- [x] Test filtering with different categories

## Potential Fixes
- [x] Update filtering logic if data structures don't match
- [x] Add error handling for missing data
- [x] Ensure category IDs are consistent between stores and categories

## Testing
- [ ] Test each category filter individually
- [ ] Verify "All Categories" shows all stores
- [ ] Check console logs for data structure insights

## Fix Applied
- **Issue Identified**: Store categories use full names like "Electronics & Gadgets" while category IDs are simplified like "electronics"
- **Solution**: Added category normalization logic to convert store category names to matching category IDs
- **Implementation**:
  - Created category name to ID mapping
  - Normalized store categories during data processing
  - Updated filtering to use normalized categories
  - Maintained original store data for UI display
