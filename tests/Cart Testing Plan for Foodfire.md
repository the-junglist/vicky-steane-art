Cart Testing Plan for Foodfire
-----
1. Add to Cart Basic Flow

Add a product to cart.

Notification appears confirming add.

Click 'View Cart'.

Confirm:

Product is in cart.

Product quantity = 1.

Product stock status matches local browser cookie session

2. Add Multiple Products

Add a second product.

View Cart.

Confirm:

First product still there.

Second product added correctly.

Quantities and stock match.

3. Increase / Decrease Quantity

Increase quantity of a product in cart.

Check:

Quantity updates immediately.

Total price updates correctly.

Decrease quantity back to 1.

Check qty on product page now matches decreased ammount 

4. Remove Item

Remove one product from cart.

Confirm:

Product is no longer listed.

Total price updates.

Refresh page.

Confirm cart state is still correct.

5. Navigate Away and Back

Add item to cart.

Navigate to Home.

Navigate back to Cart.

Confirm cart still holds items properly.

6. Guest Cart Persistence

Add items to cart (without being logged in).

Refresh browser.

Confirm cart still has items (local cookie or storage works).

7. Proceed to Checkout

Click 'Proceed to Checkout'.

Confirm:

Cart syncs with WooCommerce.

Items, quantities, and total price match.

8. Out of Stock Check

Simulate backend stock change to 'Out of Stock'.

Refresh Cart page.

Confirm:

Out of stock warning shows.

Cannot proceed to checkout for that item.

9. Cart Empty State

Remove all items.

Confirm:

Cart shows empty message.

No 'Proceed to Checkout' button.

10. Device / Viewport Tests

Repeat key flows on:

Desktop.

Mobile.

Tablet.

Confirm cart layout and behaviors are responsive.

Bonus (Advanced)
Test cookie expiration (simulate time passing).

Test switching tabs: add to cart in one tab, check cart updates in second tab.

Simulate server error (e.g., WooCommerce API unavailable) on checkout.
