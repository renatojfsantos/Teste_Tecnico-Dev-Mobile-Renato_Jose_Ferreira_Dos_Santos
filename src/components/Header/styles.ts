import styled from 'styled-components/native';
import palette from '~/theme/palette';

export const Container = styled.View`
  height: 60px;
  background-color: ${palette.primary};
  flex-direction: row;
  padding: 0 16px;
`;

export const LeftBox = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const TitleBox = styled.View`
  flex: 1;
  padding-left: 16px;
`;

export const TitleHeader = styled.Text.attrs(
  (props: { whiteSubtitle: boolean }) => ({
    size: props.whiteSubtitle ? 18 : 28,
    color: palette.white,
  }),
)<{ whiteSubtitle: boolean }>`
  font-size: 28px;
  font-weight: 700;
  color: ${palette.white};
`;

export const SubTitleHeader = styled.Text.attrs({
  size: 18,
  color: palette.white,
})``;
