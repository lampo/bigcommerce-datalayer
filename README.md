# BigCommerce GA4 Ecommerce dataLayer

**Note**: the script has been drastically changed from the forked version to adapt to our GTM specifications.

A dataLayer implementation for BigCommerce, based upon the [Google Analytics 4 Ecommerce specification](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce).

Brought to you by [Fueled Inc](https://fueled.io).

## Overview

dataLayers provide a uniformed way for tracking and attribution scripts, such as Segment's Analytics.js library, to interact with your BigCommerce site. Implementing a dataLayer will ensure that all scripts use consistent attribution values and calculations. They can also cut down on custom code. Finally, they are exposed to Google Tag Manager, if you choose to implement tracking via GTM.

This dataLayer project implements Google's _"Google Analytics v4 Ecommerce Event Specification"_, as described in the following docs:

* https://developers.google.com/analytics/devguides/collection/ga4/ecommerce
* https://developers.google.com/tag-manager/ecommerce-ga4

## Installation

This project is installed via [BigCommerce's Script Manager](https://support.bigcommerce.com/s/article/Using-Script-Manager). The script should be loaded on all pages.

 1. From your dashboard open the Storefront settings and under that, click into Script manager.
 2. Click the "Create Script" button
 3. Give the script a name and (optional) description, make sure it's running on **All Pages** and is set to **Essential**
 4. Select a script type of **Script** and in the bellow text box type in following `<script></script>`
 5. Paste your [compiled script](https://github.com/fueled-io/bigcommerce-datalayer/blob/main/dist/dataLayer.min.js) inside the script tags you added. `<script>Your code</script>`
 6. Save

## Build

  **Note**: I had issues with build-min script in that minified code didn't work correctly. Instead, I used https://www.uglifyjs.net/ and chose to Mangle names and Mangle function names. I pasted the results into dist/dataLayer.min.js.

  To build and bundle the dataLayer from source, run (You will need [Node](https://nodejs.org/) installed):

`npm install`  this will install the required components
`npm run build-min` this is compile the minified script into the `./dist` folder 
`npm run build` this will create a copy of the script using Webpacks eval function

## Ecommerce Events Tracked via the dataLayer

* [Product/Item List Views/Impressions](https://developers.google.com/tag-manager/ecommerce-ga4#measure_productitem_list_viewsimpressions)
* [Product/Item List Clicks](https://developers.google.com/tag-manager/ecommerce-ga4#measure_productitem_list_clicks)
* [Product/Item Detail Views](https://developers.google.com/tag-manager/ecommerce-ga4#measure_viewsimpressions_of_productitem_details)
* [Adds/Removes from Cart](https://developers.google.com/tag-manager/ecommerce-ga4#measure_additions_or_removals_from_a_shopping_cart)
* [View Cart](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#view_cart)
* Checkout Events exposed to the dataLayer
  * The [begin_checkout](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#begin_checkout) event fires when the /checkout page loads
  * The [add_payment_info](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#add_payment_info) fires when billing info is added during checkout
* [Purchases](https://developers.google.com/tag-manager/ecommerce-ga4#measure_purchases)

_Additional script variable definitions coming soon._

## Customization

This script has been designed to work with HTML elements generated by BigCommerce's default theme, Cornerstone. It can be extended to work with custom themes, as well as legacy Blueprint themes, to track additional client interactions.

To modify the selectors the script watches for you can make those changes starting on `line 86` of `./src/index.js`

    var  productDetailsButton = document.getElementsByClassName('card-figure__link') || []; //Product card selector  
    var  mainPageAddButton = document.querySelectorAll("[data-button-type='add-cart']") || []; //Add to cart button selector
    var  productPageAddButton = document.getElementById('form-action-addToCart'); //Add to cart form selector
    var  cartPageRemoveButton = document.getElementsByClassName('cart-remove') || []; //Remove from cart button selector
    var  cartButton = document.getElementsByClassName('navUser-item--cart') || []; //Show Cart selector

Once your customizations are made you can follow the build/installation instructions.

## Need Support?

As an open source project, this solution is provided _as is_, without warranty or a commitment to customer support. That said, we are committed to the BigCommerce community and will do our best to answer questions and help you leverage this dataLayer. If you have questions, please feel free to email hello@fueled.io.

## Licensing

This is an open source project, licensed under the [GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html).
