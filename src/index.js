(function () {
  var gtmDataLayer = window.gtmDataLayer || [];
  if (!window.gtmDataLayer) window.gtmDataLayer = gtmDataLayer;
  (function (w, d, s, l, i) {
    //test stores don't have qa and test in the name atm
    // var q = /(test|qa)\./.test(document.location.hostname)
    //     ? '&gtm_auth=QdsxPg__bulLcFg0npL1Xg&gtm_preview=env-5&gtm_cookies_win=x'
    //     : '';
    var q = /store\.ramseysolutions\.com/.test('store.ramseysolutions.com')
      ? ''
      : '&gtm_auth=QdsxPg__bulLcFg0npL1Xg&gtm_preview=env-5&gtm_cookies_win=x';
    w[l] = w[l] || [];
    w[l].push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js',
    });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl + q;
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'gtmDataLayer', 'GTM-5Z3Z28D');
  var pageType = '{{page_type}}';
  function clean(obj) {
    for (var propName in obj) {
      if (
        obj[propName] === null ||
        obj[propName] === undefined ||
        obj[propName].length === 0 ||
        obj[propName] === ''
      ) {
        delete obj[propName];
      } else if (typeof obj[propName] === 'object') {
        clean(obj[propName]);
      }
    }
    return obj;
  }
  function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.documentElement.textContent;
  }
  function getShopper() {
    return clean({
      customer_id: '{{customer.id}}',
      email: '{{customer.email}}',
      name: '{{customer.name}}',
      phone: '{{customer.phone}}',
      //    {{#if customer.shipping_address}}
      shipping_address: {
        address1: '{{customer.shipping_address.address1}}',
        address2: '{{customer.shipping_address.address2}}',
        city: '{{customer.shipping_address.city}}',
        company: '{{customer.shipping_address.company}}',
        country: '{{customer.shipping_address.country}}',
        first_name: '{{customer.shipping_address.first_name}}',
        last_name: '{{customer.shipping_address.last_name}}',
        address_id: '{{customer.shipping_address.id}}',
        phone: '{{customer.shipping_address.phone}}',
        state: '{{customer.shipping_address.state}}',
        zip: '{{customer.shipping_address.zip}}',
      },
      //    {{/if}}
    });
  }

  function getItems() {
    var items = [];
    //    {{#each this}}
    //      {{#or (if @key '===' "products") (if @key '===' "category") (if @key '===' "cart") (if @key '===' "product_results")}}
    //        {{#each this}}
    //          {{#or (if @key '===' "new") (if @key '===' "featured") (if @key '===' "products") (if @key '===' "category") (if @key '===' "items")}}
    //            {{#each this}}
    var item = clean({
      name: htmlDecode('{{name}}'),
      cart_item_id: '{{id}}' ? '{{id}}' : undefined,
      id: '{{sku}}',
      price: '{{price.value}}'
        ? parseFloat('{{price.value}}')
        : parseFloat('{{price.without_tax.value}}'),
      brand: htmlDecode('{{brand.name}}'),
      // item_url: htmlDecode('{{url}}'),
      // item_image_url: htmlDecode('{{image.data}}'),
      // item_list_name: htmlDecode('{{../category.name}}'),
      // item_list_id: '{{../category.id}}',
      quantity: '{{quantity}}' ? parseInt('{{quantity}}') : undefined,
    });

    //{{#each category}}
    var index = parseInt('{{@index}}');
    item[index == 0 ? 'category' : `item_category${index}`] =
      htmlDecode('{{this}}');
    //{{/each}}
    items.push(item);

    //             {{/each}}
    //          {{/or}}
    //       {{/each}}
    //    {{/or}}
    //  {{/each}}
    return items;
  }
  function getItem() {
    var item = {
      name: htmlDecode('{{product.title}}'),
      // Name or ID is required.
      price: parseFloat('{{product.price.without_tax.value}}'),
      id: '{{product.sku}}',
      brand: htmlDecode('{{product.brand.name}}'),
      // item_url: htmlDecode('{{product.url}}'),
      // item_image_url: htmlDecode('{{product.main_image.data}}'),
    };

    //{{#each product.category}}
    var index = parseInt('{{@index}}');
    item[index == 0 ? 'category' : `item_category${index}`] =
      htmlDecode('{{this}}');
    //{{/each}}

    return item;
  }

  // function pushDataLayerEcommerce(event, items) {
  //   gtmDataLayer.push({
  //       event: event,
  //       ecommerce: {
  //           items: items
  //       }
  //   });
  // }

  window.eecResetListener = function () {
    for (let item of gtmDataLayer.eec['items']) {
      var delButton = document.querySelector(
        "[data-cart-itemid='" +
          item.cart_item_id +
          "'][data-testid='cart-content-delete-button']"
      );
      delButton.addEventListener('click', function () {
        var okButton = document
          .getElementById('alert-modal')
          .querySelector('button.confirm');
        okButton.addEventListener('click', function () {
          gtmDataLayer.push({
            event: 'removeFromCart',
            ecommerce: {
              currencyCode: 'USD',
              remove: {
                products: [item],
              },
            },
          });
        });
      });
      var decButton = document.querySelector(
        "[data-cart-itemid='" +
          item.cart_item_id +
          "'][data-testid='cart-content-decrease-button']"
      );
      decButton.addEventListener('click', function () {
        gtmDataLayer.push({
          event: 'removeFromCart',
          ecommerce: {
            currencyCode: 'USD',
            remove: {
              products: [item],
            },
          },
        });
      });
      var incButton = document.querySelector(
        "[data-cart-itemid='" +
          item.cart_item_id +
          "'][data-testid='cart-content-increase-button']"
      );
      incButton.addEventListener('click', function () {
        gtmDataLayer.push({
          event: 'addToCart',
          ecommerce: {
            currencyCode: 'USD',
            add: {
              products: [item],
            },
          },
        });
      });
    }
  };
  if (pageType === 'product') {
    gtmDataLayer.push({
      event: 'detailPage',
      ecommerce: {
        currencyCode: 'USD',
        detail: {
          products: [getItem()],
        },
      },
    });
  } else if (pageType === 'orderconfirmation') {
    fetch('/api/storefront/orders/{{checkout.order.id}}', {
      credentials: 'include',
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (orderData) {
        const orderPhysicalItems = orderData.lineItems.physicalItems.map(
          (item) => {
            const container = {};
            container['id'] = Boolean(item.sku) ? item.sku : item.id;
            container['name'] = item.name;
            container['price'] = item.salePrice;
            container['quantity'] = item.quantity;
            // container['brand']  TODO
            container['category'] =
              item.categories.length > 0 ? item.categories[0] : '';
            return container;
          }
        );
        const orderDigitalItems = orderData.lineItems.digitalItems.map(
          (item) => {
            const container = {};
            container['id'] = Boolean(item.sku) ? item.sku : item.id;
            container['name'] = item.name;
            container['price'] = item.salePrice;
            container['quantity'] = item.quantity;
            // container['brand']  TODO
            container['category'] =
              item.categories.length > 0 ? item.categories[0] : '';
            return container;
          }
        );
        const orderItems = orderPhysicalItems.concat(orderDigitalItems);
        const createProductBrandFetchOpts = (product) => {
          const query = `query ProductBrand {
            site {
              product(sku: "${product.id}") {
                brand {
                  name
                }
              }
            }
          }`;
          return {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer {{ settings.storefront_api.token }}', // use auto-generated token
            },

            body: JSON.stringify({
              query,
            }),
          };
        };
        const productBrandFetches = orderItems.map((item) =>
          fetch('/graphql', createProductBrandFetchOpts(item))
            .then((response) => response.json())
            .then(({ data }) => {
              const brand = data.site.product.brand.name;
              item.brand = brand;
            })
        );
        return Promise.all(productBrandFetches).then(() => ({
          orderData,
          orderItems,
        }));
      })
      .then(function ({ orderData, orderItems }) {
        gtmDataLayer.push({
          event: 'orderPage',
          ecommerce: {
            currencyCode: 'USD',
            purchase: {
              actionField: {
                id: '{{checkout.order.id}}',
                affiliation: 'RS BigCommerce',
                revenue: orderData.orderAmount,
                tax: orderData.taxTotal,
                shipping: orderData.shippingCostTotal,
                coupon:
                  orderData.coupons.length > 0 ? orderData.coupons[0].code : '',
              },
              products: orderItems,
            },
          },
        });
      });
  } else if (pageType === 'cart') {
    window.addEventListener('load', function () {
      var cartContainer = document.querySelector('[data-cart]');
      var cartContainerConfig = {
        attributes: false,
        childList: true,
      };
      var cartContainerObserver = new MutationObserver(function (
        mutationList /*, observer*/
      ) {
        var bob = mutationList.find(function (record) {
          var rob = Array.from(record.addedNodes).find(function (node) {
            return node.outerText.startsWith('Your Cart (');
          });
          return rob !== undefined;
        });
        if (bob !== undefined) {
          window.eecResetListener();
        }
      });
      cartContainerObserver.observe(cartContainer, cartContainerConfig);
    });

    //{{#if cart.added_item.name}}
    window.addEventListener('load', function () {
      var is_reload =
        performance.getEntriesByType('navigation').type === 'reload';
      if (!is_reload && !window.item_added) {
        gtmDataLayer.push({
          event: 'addToCart',
          ecommerce: {
            currencyCode: 'USD',
            add: {
              products: [
                {
                  id: '{{cart.added_item.sku}}',
                  name: '{{cart.added_item.name}}',
                  brand: '{{cart.added_item.brand.name}}',
                  price: parseFloat('{{cart.added_item.price.value}}'),
                  quantity: parseInt('{{cart.added_item.quantity}}'),
                  //{{#each cart.added_item.category_names}}
                  //{{#if @first}}
                  category: '{{this}}',
                  //{{/if}}
                  //{{/each}}
                },
              ],
            },
          },
        });
      }

      window.item_added = true;
    });
    //{{/if}}
    window.addEventListener('load', window.eecResetListener);
  }
  window.eecGetShopper = getShopper;
  window.eecGetItems = getItems;
  window.eecGetItem = getItem;
  window.eecHtmlDecode = htmlDecode;
  window.eecClean = clean;

  //{{#if product}}
  document.addEventListener(
    'submit',
    function (e) {
      for (
        let { target } = e;
        target && target !== this;
        target = target.parentNode
      ) {
        if (target.matches('[data-cart-item-add]')) {
          gtmDataLayer.push({
            event: 'addToCart',
            ecommerce: {
              currencyCode: 'USD',
              add: {
                products: [
                  {
                    id: gtmDataLayer.eec['item'].id,
                    name: htmlDecode(gtmDataLayer.eec['item'].name),
                    brand: htmlDecode(gtmDataLayer.eec['item'].brand),
                    price: gtmDataLayer.eec['item'].price,
                    quantity: parseInt(document.getElementById('qty[]').value),
                    category:
                      htmlDecode(gtmDataLayer.eec['item'].category) || '',
                  },
                ],
              },
            },
          });
          break;
        }
      }
    },
    false
  );
  //{{/if}}

  gtmDataLayer['eec'] = {};

  //{{#or (if category.products) (if products.new) (if products.featured) (if products.top_sellers) (if cart.items) (if product_results.products)}}
  gtmDataLayer['eec']['items'] = getItems();
  //{{/or}}

  //{{#if product}}
  gtmDataLayer['eec']['item'] = getItem();
  //{{/if}}

  //{{#if cart_id}}
  gtmDataLayer['eec']['cart_id'] = '{{ cart_id }}';
  //{{/if}}

  //{{#if customer}}
  gtmDataLayer['eec']['shopper'] = getShopper();
  //{{/if}}
})();
