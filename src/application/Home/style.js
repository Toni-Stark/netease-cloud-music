import styled from'styled-components';
import style from '../../assets/global-style';

export const Top = styled.div`
  display: flex;
  padding: 5px 10px;
  flex-direction: row;
  justify-content: space-between;
  background: ${style["theme-color"]};
  &>span {
    color: #f1f1f1;
    font-size: 20px;
    line-height: 40px;
    &.iconfont {
      font-size: 25px;
    }
  }
`
export const Tab = styled.div`
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: ${style["theme-color"]};
  a {
    flex: 1;
    padding: 2px 0;
    color: #e4e4e4;
    font-size: 14px;
    &.selected {
      span {
        padding: 3px 0;
        color: #f1f1f1;
        font-weight: 700;
        border-bottom: 2px solid #f1f1f1;
      }
    }
  }
`
export const TabItem = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

`