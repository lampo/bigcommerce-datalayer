(function () {
  const masterPromoMap = {
    "z6agnrtx29": {
      "146": "TMMOWRKBK",
      "147": "TMMOBUNDLE",
      "161": "BSMTMMO01",
      "149": "STARTERSPEC20",
      "145": "ALLINONEPACK16",
      "142": "ENTRECAREERBKS04",
      "152": "WEDDINGGIFT04",
      "143": "ULTIMATECAREER",
      "144": "IYIKCB01",
      "153": "LIVEGIVE",
      "151": "FPUGUIDEWDVD",
      "179": "FPUV4CLASSBNDL",
      "189": "TMMOWRKBK",
      "194": "TMMOBUNDLE",
      "192": "BSMTMMO01",
      "191": "STARTERSPEC20",
      "195": "WEDDINGGIFT04",
      "193": "ULTIMATECAREER",
      "190": "IYIKCB01",
      "248": "FPKidsBundle",
      "312": "ALLINONEPACK16",
      "313": "ENTRECAREERBKS04",
      "315": "IYIKCB01",
      "316": "STARTERSPEC20",
      "317": "BSMTMMO01",
      "318": "TMMOWRKBK",
      "319": "ULTIMATECAREER",
      "320": "WEDDINGGIFT04",
      "321": "ALLINONEPACK16",
      "322": "ENTRECAREERBKS04",
      "323": "FPKidsBundle",
      "324": "TMMOBUNDLE",
      "338": "IYIKCB01",
      "339": "STARTERSPEC20",
      "340": "BSMTMMO01",
      "341": "TMMOWRKBK",
      "342": "TMMOBUNDLE",
      "343": "ULTIMATECAREER",
      "344": "WEDDINGGIFT04",
      "345": "ALLINONEPACK16",
      "346": "ENTRECAREERBKS04",
      "347": "FPKidsBundle",
      "351": "IYIKCB01",
      "352": "STARTERSPEC20",
      "353": "BSMTMMO01",
      "354": "TMMOWRKBK",
      "355": "ULTIMATECAREER",
      "356": "WEDDINGGIFT04",
      "357": "ALLINONEPACK16",
      "358": "ENTRECAREERBKS04",
      "359": "TMMOBUNDLE"
    },
    "z5er1c0d4z": {
      "117": "TMMOWRKBK",
      "118": "TMMOBUNDLE",
      "119": "BSMTMMO01",
      "120": "STARTERSPEC20",
      "121": "ALLINONEPACK16",
      "122": "ENTRECAREERBKS04",
      "123": "WEDDINGGIFT04",
      "124": "ULTIMATECAREER",
      "125": "IYIKCB01",
      "126": "LIVEGIVE",
      "127": "FPUGUIDEWDVD",
      "147": "FPUV4CLASSBNDL",
      "167": "TMMOWRKBK",
      "162": "TMMOBUNDLE",
      "163": "BSMTMMO01",
      "169": "STARTERSPEC20",
      "168": "WEDDINGGIFT04",
      "165": "ULTIMATECAREER",
      "166": "IYIKCB01",
      "180": "FPKidsBundle",
      "191": "ALLINONEPACK16",
      "192": "ENTRECAREERBKS04"
    },
    "y8887kdcrz": {
      "17": "TMMOWRKBK",
      "11": "TMMOBUNDLE",
      "16": "BSMTMMO01",
      "20": "STARTERSPEC20",
      "13": "ALLINONEPACK16",
      "19": "ENTRECAREERBKS04",
      "8": "WEDDINGGIFT04",
      "14": "ULTIMATECAREER",
      "21": "IYIKCB01",
      "15": "LIVEGIVE",
      "10": "FPUGUIDEWDVD"
    }
  };

  var gtmDataLayer = window.gtmDataLayer || [];
  if (!window.gtmDataLayer)
    window.gtmDataLayer = gtmDataLayer;

  (function(w, d, s, l, i) {
    //test stores don't have qa and test in the name atm
    // var q = /(test|qa)\./.test(document.location.hostname)
    //     ? '&gtm_auth=QdsxPg__bulLcFg0npL1Xg&gtm_preview=env-5&gtm_cookies_win=x'
    //     : '';
    var q = /store\.ramseysolutions\.com/.test('store.ramseysolutions.com')
        ? ''
        : '&gtm_auth=QdsxPg__bulLcFg0npL1Xg&gtm_preview=env-5&gtm_cookies_win=x';
    w[l] = w[l] || [];
    w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
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
      if (obj[propName] === null || obj[propName] === undefined || obj[propName].length === 0 || obj[propName] === '') {
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
      }
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
      price: "{{price.value}}" ? parseFloat('{{price.value}}') : parseFloat('{{price.without_tax.value}}'),
      brand: htmlDecode('{{brand.name}}'),
      // item_url: htmlDecode('{{url}}'),
      // item_image_url: htmlDecode('{{image.data}}'),
      // item_list_name: htmlDecode('{{../category.name}}'),
      // item_list_id: '{{../category.id}}',
      quantity: '{{quantity}}' ? parseInt('{{quantity}}') : undefined
    });

    //{{#each category}}
    var index = parseInt('{{@index}}');
    item[index == 0 ? 'category' : `category${index}`] = htmlDecode('{{this}}');
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
      name: htmlDecode('{{product.title}}'), // Name or ID is required.
      price: parseFloat('{{product.price.without_tax.value}}'),
      id: '{{product.sku}}',
      brand: htmlDecode('{{product.brand.name}}'),
      // item_url: htmlDecode('{{product.url}}'),
      // item_image_url: htmlDecode('{{product.main_image.data}}'),
    }

    //{{#each product.category}}
    var index = parseInt('{{@index}}');
    item[index == 0 ? 'category' : `item_category${index}`] = htmlDecode('{{this}}');
    //{{/each}}

    return item;
  }

  window.eecPushAddToCart = function() {
    gtmDataLayer.push({
      event: "addToCart",
      ecommerce: {
        currencyCode: "USD",
        add: {
          products: [
            {
              id: gtmDataLayer.eec['item'].id,
              name: htmlDecode(gtmDataLayer.eec['item'].name),
              brand: htmlDecode(gtmDataLayer.eec['item'].brand),
              price: gtmDataLayer.eec['item'].price,
              quantity: parseInt(document.getElementById('qty[]').value),
              category: htmlDecode(gtmDataLayer.eec['item'].category) || "",
            }
          ]
        }
      }
    });
  }

  const createProductFetchOpts = (sku) => {
    const query = `query GetProductDetails {
        site {
          product(sku: "${sku}") {
            name
            prices {
              price {
                value
              }
            }
            categories {
              edges {
                node {
                  name
                }
              }
            }
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
      body: JSON.stringify({query}),
    };
  };

  window.eecResetListener = function() {
    const promoMap = masterPromoMap["{{settings.store_hash}}"];
    fetch('/api/storefront/carts', {
      credentials: 'include',
    })
        .then(function (response) {
          return response.json();
        })
        .then(function (cartData) {
          var orderData = cartData[0];
          const orderItems = orderData?.lineItems.physicalItems.concat(orderData?.lineItems.digitalItems);
          return orderItems || [];
        })
        .then(function (orderItems) {
          orderItems.forEach((item) => {
            const removeBtnFunction = function (evt) {
              const itemBundles = item.discounts.reduce(
                  (result, discount) => {
                    if (promoMap[discount.id]) {
                      if (promoMap[discount.id] == "FPUV4CLASSBNDL") {
                        const fpuBundleQty = +item.quantity/10;
                        result.set(promoMap[discount.id], fpuBundleQty);
                      }
                      else {
                        result.set(promoMap[discount.id], item.quantity);
                      }
                    }
                    return result;
                  }, new Map
              );

              if (itemBundles.size <= 0) {
                gtmDataLayer.push({
                  event: "removeFromCart",
                  ecommerce: {
                    currencyCode: "USD",
                    remove: {
                      products: [{
                        'brand': item.brand,
                        'id': item.sku,
                        'name': item.name,
                        'price': item.salePrice,
                        'quantity': evt.target.className.includes("rds-Button--small") ? 1 : item.quantity
                      }]
                    }
                  }
                });
              } else {
                itemBundles.forEach((value, key) => {
                  fetch('/graphql', createProductFetchOpts(key))
                      .then((response) => response.json())
                      .then(({data}) => {
                        gtmDataLayer.push({
                          event: "removeFromCart",
                          ecommerce: {
                            currencyCode: "USD",
                            remove: {
                              products: [{
                                'brand': data.site.product.brand.name,
                                'id': key,
                                'name': data.site.product.name,
                                'price': data.site.product.prices.price.value,
                                'quantity': evt.target.className.includes("rds-Button--small") ? 1 : value
                              }]
                            }
                          }
                        });
                      });
                })
              }
            };

            var delButton = document.querySelector("[data-cart-itemid='" + item.id + "'][data-testid='cart-content-delete-button']");
            if (delButton)
              delButton.addEventListener("click", function () {
                var okButton = document.getElementById('alert-modal').querySelector('button.confirm');
                okButton.addEventListener('click', removeBtnFunction, {"once": true});
              });

            var decButton = document.querySelector("[data-cart-itemid='" + item.id + "'][data-testid='cart-content-decrease-button']");
            if (decButton)
              decButton.addEventListener("click", removeBtnFunction);

            var incButton = document.querySelector("[data-cart-itemid='" + item.id + "'][data-testid='cart-content-increase-button']");
            if (incButton)
              incButton.addEventListener("click", function () {
                gtmDataLayer.push({
                  event: "addToCart",
                  ecommerce: {
                    currencyCode: "USD",
                    add: {
                      products: [{
                        'brand': item.brand,
                        'id': item.sku,
                        'name': item.name,
                        'price': item.salePrice,
                        'quantity': 1
                      }]
                    }
                  }
                });

              });
          });
        })
  }

  if (pageType === 'product') {
    gtmDataLayer.push({
      event: "detailPage",
      ecommerce: {
        currencyCode: "USD",
        detail: {
          products: [getItem()]
        }
      }
    });
    window.addEventListener("load", function() {
      document.getElementById("addToCartTriggerBtn")?.addEventListener('click', function(){
        window.eecPushAddToCart()
      });
    });
    document.addEventListener('submit', function (e) {
      for (let { target } = e; target && target !== this; target = target.parentNode) {
        if (target.matches('[data-cart-item-add]')) {
          window.eecPushAddToCart();
          break;
        }
      }
    }, false);
  } else if (pageType === 'orderconfirmation') {
    fetch('/api/storefront/orders/{{checkout.order.id}}', {
      credentials: 'include',
    })
        .then(function (response) {
          return response.json();
        })
        .then(function (orderData) {
          const promoMap = masterPromoMap["{{settings.store_hash}}"];
          var bundleSkuMap = new Map;
          const orderPhysicalItems = orderData.lineItems.physicalItems.reduce(
              (itemList, item) => {
                const itemBundles = Object.entries(item.discounts).reduce(
                    (result, discount) => {
                      if (promoMap[discount[0]]) {
                        if (promoMap[discount[0]] == "FPUV4CLASSBNDL") {
                          const fpuBundleQty = +item.quantity/10;
                          result.set(promoMap[discount[0]], fpuBundleQty);
                        }
                        else {
                          result.set(promoMap[discount[0]], item.quantity);
                        }
                      }
                      return result;
                    }, new Map
                );
                bundleSkuMap = new Map([...bundleSkuMap, ...itemBundles]);
                if (itemBundles.size <= 0) {
                  const container = {};
                  container['id'] = Boolean(item.sku) ? item.sku : item.id;
                  container['name'] = item.name;
                  container['price'] = item.salePrice;
                  container['quantity'] = item.quantity;
                  // container['brand']  TODO
                  container['category'] =
                      item.categories.length > 0 ? item.categories[0] : '';
                  itemList.push(container);
                }
                return itemList;
              }, []
          );
          const orderDigitalItems = orderData.lineItems.digitalItems.reduce(
              (itemList, item) => {
                const itemBundles = item.discounts.reduce(
                    (result, discount) => {
                      if (promoMap[discount.id]) {
                        if (promoMap[discount.id] == "FPUV4CLASSBNDL") {
                          const fpuBundleQty = +item.quantity/10;
                          result.set(promoMap[discount.id], fpuBundleQty);
                        }
                        else {
                          result.set(promoMap[discount.id], item.quantity);
                        }
                      }
                      return result;
                    }, new Map
                );
                bundleSkuMap = new Map([...bundleSkuMap, ...itemBundles]);
                if (itemBundles.size <= 0) {
                  const container = {};
                  container['id'] = Boolean(item.sku) ? item.sku : item.id;
                  container['name'] = item.name;
                  container['price'] = item.salePrice;
                  container['quantity'] = item.quantity;
                  // container['brand']  TODO
                  container['category'] =
                      item.categories.length > 0 ? item.categories[0] : '';
                  itemList.push(container);
                }
                return itemList;
              }, []
          );

          const orderItems = orderPhysicalItems.concat(orderDigitalItems);
          bundleSkuMap.forEach(
              (quantity, sku) => {
                const container = {};
                container['id'] = sku;
                container['quantity'] = quantity;
                orderItems.push(container);
              }
          );

          const productFetches = orderItems.map((item) =>
              fetch('/graphql', createProductFetchOpts(item.id))
                  .then((response) => response.json())
                  .then(({data}) => {
                    if (data.site.product){
                      const brand = data.site.product.brand.name;
                      item.brand = brand;
                      if (!item.name){
                        item.name = data.site.product.name;
                        item.price = data.site.product.prices.price.value.toFixed(2);
                        data.site.product.categories.edges.forEach(
                            (category, index) => {
                              item[index === 0 ? 'category' : `category${index}`] = category.node.name;
                            }
                        );
                      }
                    }
                  })
          );

          return Promise.all(productFetches).then(() => ({
            orderData,
            orderItems,
          }));
        })
        .then(function ({orderData, orderItems}) {
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
    window.addEventListener("load", function() {
      var cartContainer = document.querySelector('[data-cart]');
      var cartContainerConfig = {attributes: false, childList: true};
      var cartContainerObserver = new MutationObserver(function (mutationList/*, observer*/) {
        var bob = mutationList.find(function(record) {
          var rob = Array.from(record.addedNodes).find(function(node){
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
    window.addEventListener("load", function() {
      var is_reload = performance.getEntriesByType("navigation").type === "reload";
      if (!is_reload && !window.item_added) {
        gtmDataLayer.push({
          event: "addToCart",
          ecommerce: {
            currencyCode: "USD",
            add: {
              products: [
                {
                  id: "{{cart.added_item.sku}}",
                  name: "{{cart.added_item.name}}",
                  brand: "{{cart.added_item.brand.name}}",
                  price: parseFloat("{{cart.added_item.price.value}}"),
                  quantity: parseInt("{{cart.added_item.quantity}}"),
                  //{{#each cart.added_item.category_names}}
                  //{{#if @first}}
                  category: '{{this}}',
                  //{{/if}}
                  //{{/each}}
                }
              ]
            }
          }
        });
      }
      window.item_added = true;

    });
    //{{/if}}
    window.addEventListener("load", window.eecResetListener);
  }

  window.eecGetShopper = getShopper;
  window.eecGetItems = getItems;
  window.eecGetItem = getItem;
  window.eecHtmlDecode = htmlDecode;
  window.eecClean = clean;

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

})
();
