import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Divider,
} from '@mui/material';

import mockedOrders from './mockedOrders.json';

export type Item = { id: string; name: string; price: number };

export type Order = { id: string; items: Item[]; totalPrice: number; timestamp: string };

export const App = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const formattedPrice = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' });

  useEffect(() => {
    setTimeout(() => {
      setOrders(mockedOrders);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Container maxWidth='md' sx={{ mt: 4 }}>
      <Typography textAlign='center' variant='h4' gutterBottom>
        Submitted Orders
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        orders.map(order => (
          <Card key={order.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant='h6'>Order ID: {order.id}</Typography>

              <List>
                {order.items.map(item => (
                  <ListItem key={item.id} disablePadding>
                    <ListItemText primary={`${item.name} - ${formattedPrice.format(item.price)}`} />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 1 }} />

              <Typography variant='subtitle1'>Total: {formattedPrice.format(order.totalPrice)}</Typography>

              <Typography variant='caption' color='text.secondary'>
                Submitted at: {new Date(order.timestamp).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};
