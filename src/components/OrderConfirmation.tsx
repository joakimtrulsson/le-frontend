import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Order from '../types/Order';

import { useSearchParams } from 'react-router-dom';
import { GET_ORDERDETAILS } from '../graphql/queries';

import { useQuery } from '@apollo/client';

export default function OrderConfirmation() {
  const [open, setOpen] = React.useState(true);
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order');
  const { data } = useQuery(GET_ORDERDETAILS, {
    variables: {
      where: {
        paymentId: orderId,
      },
    },
  });
  const [order, setOrder] = React.useState<Order>();

  React.useEffect(() => {
    if (data) {
      setOrder(data.order);
    }
  }, [data]);

  const handleClose = () => {
    window.history.replaceState({}, document.title, window.location.origin);

    setOpen(false);
  };

  return (
    <>
      {order && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Tack för din beställning, {order.customerName}!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`En orderbekräftelse har skickats till din epost: 
             ${order.customerEmail}`}
            </DialogContentText>
          </DialogContent>

          <DialogActions onClick={handleClose} sx={{ px: 2 }}>
            <Button variant='outlined' size='small' onClick={handleClose}>
              Stäng
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
