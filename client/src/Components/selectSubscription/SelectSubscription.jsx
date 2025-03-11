import React, { useEffect } from 'react';
import { Box, TextField, MenuItem } from "@mui/material";
import { useSubscriptionsStore } from '../../store/useSubscriptionsStore';

const SelectSubscription = ({ selectedSubscription, setSelectedSubscription, tenantId, activityId }) => {
  const { getAllSubscriptions, subscriptions } = useSubscriptionsStore();

  // Cargar las suscripciones solo cuando se cambia el tenantId
  useEffect(() => {
    if (tenantId) {
      getAllSubscriptions(tenantId);
    }
  }, [tenantId, getAllSubscriptions]);

  const handleSubscriptionChange = (event) => {
    const { value } = event.target;
    // Actualizamos la subscripción seleccionada para la actividad específica
    setSelectedSubscription((prevState) => ({
      ...prevState,
      [activityId]: value,
    }));
   // setSelectedSubscription(value)
  };

  return (
    <Box>
      <TextField
        select
        label="Select Subscription"
        value={selectedSubscription[activityId] || ""}
        onChange={handleSubscriptionChange}
        helperText="Please select your subscription"
        fullWidth
      >
        {subscriptions.length > 0 ? (
          subscriptions.map((subscription) => (
            <MenuItem key={subscription.id} value={subscription}>
              {subscription.duration} months
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No subscriptions available</MenuItem>
        )}
      </TextField>
    </Box>
  );
};

export default SelectSubscription;
