import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { BackHandler, ToastAndroid, View } from 'react-native';

import ButtonFooter from '~/components/ButtonFooter';
import Divider from '~/components/Divider';
import Header from '~/components/Header';

import PaymentMethodItem from './PaymentMethodItem';
import {
  BuySummary,
  CardDemonstrativeBuy,
  Container,
  ContainerText,
  SubTitleDescription,
  TextProduct,
  TitleDescription,
} from './styles';

const CheckoutView: React.FC = () => {
  const navigation = useNavigation();
  const [checkBillet, setCheckBillet] = useState(false);
  const [checkCard, setCheckCard] = useState(false);
  const [listProducts, setListProducts] = useState<CheckoutResumoPedidoDTO[]>(
    [],
  );
  const [totalOrder, setTotalOrder] = useState(0);

  useEffect(() => {
    loadCheckout();

    BackHandler.addEventListener('hardwareBackPress', () => false);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', () => false);
  }, []);

  async function loadCheckout() {
    try {
      const register = await ctr.getSelectedRegister();
      const summary = await checkoutCtr.getCheckoutRecoverSummarySale(
        register.id,
      );

      if (summary.Success) {
        const { Produtos, TotalPedido } = summary.Data;
        setListProducts(Produtos);
        setTotalOrder(TotalPedido);

        await JSON.stringify(summary.Data);
      } else {
        ToastAndroid.show(summary.Message, ToastAndroid.LONG);
      }
    } catch (error) {
      ToastAndroid.show('Erro ao carregar Checkout', ToastAndroid.LONG);
    }
  }

  async function handleCheckout() {
    const screenNameList = [];

    if (checkCard) {
      screenNameList.push('CardPaymentView');
    }

    if (checkBillet) {
      screenNameList.push('BankPaymentView');
    }

    if (screenNameList.length === 0) return;

    try {
      await navigation.navigate('PaymentView');
    } catch (error) {}
  }

  function countSelected() {
    let count = 0;

    count += checkBillet ? 1 : 0;
    count += checkCard ? 1 : 0;

    return count;
  }

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <Header title="Checkout" />
      <Container>
        <BuySummary>Resumo da compra:</BuySummary>

        <CardDemonstrativeBuy>
          {listProducts.map(item => (
            <>
              <ContainerText>
                <View style={{ flex: 1 }}>
                  <TitleDescription>{item.Nome}</TitleDescription>
                  <TextProduct>
                    <SubTitleDescription>
                      Quantidade: {item.Quantidade}
                    </SubTitleDescription>
                    <SubTitleDescription>
                      {item.ValorUnitario}
                    </SubTitleDescription>
                  </TextProduct>
                </View>
              </ContainerText>
            </>
          ))}

          <Divider style={{ backgroundColor: '#999' }} />

          <ContainerText style={{ alignItems: 'center' }}>
            <TitleDescription>Valor total</TitleDescription>
            <TitleDescription style={{ fontWeight: 'bold' }}>
              {totalOrder}
            </TitleDescription>
          </ContainerText>
        </CardDemonstrativeBuy>

        <SubTitleDescription style={{ marginLeft: 16 }}>
          Forma(s) de pagamento desejada(s):
        </SubTitleDescription>

        <PaymentMethodItem
          checkCard={checkCard}
          icon="IconSwitchMachine"
          title="Cartão de Crédito/Débito"
          setCheckCard={setCheckCard}
        />

        <PaymentMethodItem
          checkCard={checkBillet}
          icon="IconReceipt"
          title="Boleto Bancário"
          setCheckCard={setCheckBillet}
        />
      </Container>
      <ButtonFooter
        title="Continuar"
        handleClick={() => {
          handleCheckout();
        }}
        disabled={!countSelected()}
      />
    </View>
  );
};

export default CheckoutView;
