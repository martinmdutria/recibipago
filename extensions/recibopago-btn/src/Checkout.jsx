import {
  reactExtension,
  InlineStack,
  Button,
  useApi,
} from '@shopify/ui-extensions-react/checkout';
import React from 'react';
export default reactExtension(
  'purchase.thank-you.block.render',
  () => <Extension />,
);

function PostRequest(param) {
  fetch('https://6673b1d675872d0e0a9349af.mockapi.io/api/shopify', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(param)
  }).then(() => {
    console.log('data sent');
  })
}



function Extension() {
  const api = useApi()
  var data = {"amount": api.cost.totalAmount.current.amount,
    "currency": api.cost.totalAmount.current.currencyCode,
    "email": api.buyerIdentity.email.current,
    "order-id": api.orderConfirmation.current.order.id
  }


  return (
    <InlineStack>
      <Button
        onPress={() => {
          PostRequest(data)
        }}
      >
        Pagar con ReciboPagos
      </Button>
    </InlineStack>
  );
}