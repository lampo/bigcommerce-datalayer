// import utils from '@bigcommerce/stencil-utils';
(function () {

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
                  item_name: htmlDecode('{{name}}'),
                  item_id: '{{product_id}}' ? '{{product_id}}' : '{{id}}',
                  sku: '{{sku}}',
                  price: "{{price.value}}" ? parseFloat('{{price.value}}') : parseFloat('{{price.without_tax.value}}'),
                  item_brand: htmlDecode('{{brand.name}}'),
                  item_url: htmlDecode('{{url}}'),
                  item_image_url: htmlDecode('{{image.data}}'),
                  item_list_name: htmlDecode('{{../category.name}}'),
                  item_list_id: '{{../category.id}}',
                  quantity: '{{quantity}}' ? parseInt('{{quantity}}') : undefined
                });



                //{{#each category}}
                var index = parseInt('{{@index}}');
                item[index == 0 ? 'item_category' : `item_category${index}`] = htmlDecode('{{this}}');
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
      item_name: htmlDecode('{{product.title}}'), // Name or ID is required.
      item_id: '{{product.id}}',
      price: parseFloat('{{product.price.without_tax.value}}'),
      sku: '{{product.sku}}',
      item_brand: htmlDecode('{{product.brand}}'),
      item_url: htmlDecode('{{product.url}}'),
      item_image_url: htmlDecode('{{product.main_image.data}}'),
    }

    //{{#each product.category}}
      var index = parseInt('{{@index}}');
      item[index == 0 ? 'item_category' : `item_category${index}`] = htmlDecode('{{this}}');
    //{{/each}}

    return item;
  }

  function pushDataLayerEcommerce(event, items) {
    gtmDataLayer.push({
        event: event,
        ecommerce: {
            items: items
        }
    });
  }

  if (pageType === 'category') {
    pushDataLayerEcommerce('view_item_list', getItems());
  }
  else if (pageType === 'product') {
    pushDataLayerEcommerce('view_item', [getItem()]);
  } else if (pageType === 'search') {
        gtmDataLayer.push({
        event: 'search',
        search_term: '{{forms.search.query}}'
    });
  }

  window.eecGetShopper = getShopper;
  window.eecGetItems = getItems;
  window.eecGetItem = getItem;
  window.eecHtmlDecode = htmlDecode;
  window.eecClean = clean;

  document.addEventListener('submit', function (e) {
    for (let { target } = e; target && target !== this; target = target.parentNode) {
      if (target.matches('[data-cart-item-add]')) {
          gtmDataLayer.push({
            event: "addToCart",
            ecommerce: {
              currency: "USD",
              value: gtmDataLayer.eec['item'].price * parseInt(document.getElementById('qty[]').value),
              items: [
                {
                  item_id: gtmDataLayer.eec['item'].sku,
                  item_name: htmlDecode(gtmDataLayer.eec['item'].item_name),
                  item_brand: htmlDecode(gtmDataLayer.eec['item'].item_brand),
                  price: gtmDataLayer.eec['item'].price,
                  quantity: parseInt(document.getElementById('qty[]').value),
                  item_category: htmlDecode(gtmDataLayer.eec['item'].item_category),
                  item_category2: htmlDecode(gtmDataLayer.eec['item'].item_category2),
                  item_category3: htmlDecode(gtmDataLayer.eec['item'].item_category3),
                  item_category4: htmlDecode(gtmDataLayer.eec['item'].item_category4),
                  item_category5: htmlDecode(gtmDataLayer.eec['item'].item_category5),
                }
              ]
            }
          });
        break;
      }
    }
  }, false);

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

  //{{#if category.id}}
  gtmDataLayer['eec']['item_list_id'] = '{{category.id}}';
  //{{/if}}

  //{{#if category.name}}
  gtmDataLayer['eec']['item_list_name'] = htmlDecode('{{category.name}}');
  //{{/if}}

  //{{#if forms.search.query}}
  gtmDataLayer['eec']['search_query'] = htmlDecode('{{forms.search.query}}');
  //{{/if}}

})
();
