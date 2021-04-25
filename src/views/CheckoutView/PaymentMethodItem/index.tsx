import React from 'react';
import Checkbox from '~/components/Form/Checkbox';
import { DescriptionProduct, SelectionButton } from './styles';
import { PaymentMethodItemProps } from './types';

const PaymentMethodItem = (props: PaymentMethodItemProps) => {
  return (
    <SelectionButton onPress={() => props.setCheckCard(!props.checkCard)}>
      <DescriptionProduct>{props.title}</DescriptionProduct>
      <Checkbox
        value={props.checkCard}
        handleChange={() => props.setCheckCard(!props.checkCard)}
      />
    </SelectionButton>
  );
};

export default PaymentMethodItem;
