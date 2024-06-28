import { useState } from 'react';
import { InlineStack, useApi, reactExtension, Button } from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.thank-you.block.render',
  () => <Extension />,
);

function Extension() {
  const { query, orderConfirmation, buyerIdentity, cost } = useApi();
  const [data, setData] = useState();
  //separar solo parte numerica del id de la orden
  let regex = /\D/g;
  let orderId = orderConfirmation.current.order.id;
  let orderId2 = orderId.replace(regex, '');


  /*
  //Datos para la request a rp usando solo useApi sin query y graphql
  const OrderRP = {
    merchant_order_id: orderConfirmation.current.order.id,
    order_description: "Pago de orden Shopify",
    client_email: buyerIdentity.email.current,
    notification_url: "",
    return_url: "",
    currencies: {
      [cost.totalAmount.current.currencyCode]: cost.totalAmount.current.amount,
    },
    category: 'Shopify',
    created_by: 'hopify',
  };

  //ejemplo de post request a rp
  const PostRequest = (api, param) => {
    fetch('https://6673b1d675872d0e0a9349af.mockapi.io/api/Shop-rp', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(param),
    })
    .then(response => response.json())
    .then(data => {
      // Redirect to Recibopagos payment URL
    })
    .catch(error => {
      console.error('Error making payment request:', error);
    });
  }
    */
  /*
  //usando query y graphql para obtener productos de la tienda
  const getProducts = () => {
    query(
      `query getProducts($first: Int) {
        products(first: $first) {
          edges {
            cursor
            node {
              title
            }
          }
        }
      }`,
      {
        variables: { first: 3 },
      },
    )
    .then(({ data, errors }) => setData(data))
    .catch(console.error);
  };
  */

 //obetener datos de la orden usando query y graphql
  const getOrder = () => {
    query(
      `query ($orderId: ID!) {
        node(id: $orderId) {
          ... on Order {
            id
            name
            financialStatus
          }
        }
      }`,
      {
        //variable con formato de id necesario para acceder a la orden
        variables: { orderId: "gid://shopify/Order/" + orderId2 },
      },
    )
    .then(({ data, errors }) => setData(data))
    .catch(console.error);
  };

  return (
    <InlineStack>
      <Button
        onPress={() => {
          getOrder();
        }}
      >
        Datos de Orden
      </Button>
    </InlineStack>
  );
}