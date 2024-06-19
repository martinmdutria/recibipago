import {
  reactExtension,
  InlineStack,
  Button,
  useApi,
} from '@shopify/ui-extensions-react/checkout';
export default reactExtension(
  'purchase.thank-you.block.render',
  () => <Extension />,
);


function Extension() {
  const api = useApi()
  var data = {"amount": api.cost.totalAmount.current.amount,
    "customer": api.buyerIdentity.customer.current,
    "email": api.buyerIdentity.email.current,
    "order-id": api.orderConfirmation.current.order.id

  }
  return (
    <InlineStack>
      <Button
        onPress={() => {
          console.log(data)
        }}
      >
        Pagar con ReciboPagos
      </Button>
    </InlineStack>
  );
}