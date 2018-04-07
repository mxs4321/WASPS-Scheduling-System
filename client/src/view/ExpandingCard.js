import React, { Component } from 'react';
import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;
const Flex5 = styled.span`
  flex: 5;
`;
const Flex2 = styled.b`
  flex: 2;
`;
const Row = styled.div`
  height: 46px;
  line-height: 46px;
  color: ${props => (props.isOpen ? 'white' : 'black')};
  border-bottom: ${props => (props.isOpen ? 'none' : '1px solid #dddddd')};
`;
const Icon = styled.span`
  padding: 0 8px;
`;
const Wrapper = styled.div`
  background: ${props =>
    props.isOpen
      ? `linear-gradient(${props.accentColor} 20%, #DDDDDD 30% )`
      : 'white'};
  transition: all 0.3s;
  margin: ${props => (props.isOpen ? '10px' : '0')} 0;
`;
const AlignRight = styled.span`
  text-align: right;
  margin-right: 20px;
  flex: 1;
`;
const CardWrapper = styled.div`
  max-height: 500px;
  transition: all 0s, transform 0.3s, margin 0.3s, height 0.3s;
  background-color: white;
  transform-origin: right;
  overflow: hidden;
  display: flex;
  opacity: ${props => (props.isOpen ? '100%' : '0')};
  border-bottom: ${props => (props.isOpen ? 'none' : '1px solid #e0e0e0')};
  width: ${props => (props.isOpen ? 'calc(100% - 20px)' : '100%')};
  margin: ${props => (props.isOpen ? '10px' : '0')};
  height: ${props => (props.isOpen ? 'auto' : '0px')};
  transform: ${props =>
    props.isOpen
      ? 'translateY(-10px) scale(1, 1)'
      : 'translateY(0) scale(.97, .97)'};
  box-shadow: ${props =>
    props.isOpen
      ? '0 -1px 0 #e5e5e5, 0 0 2px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'
      : 'none'};
`;

export default class ExpandingCard extends Component {
  state = { isOpen: false };

  render() {
    const { title, icon, description, detailText, accentColor } = this.props;
    const { isOpen } = this.state;
    return (
      <Wrapper accentColor={accentColor} isOpen={isOpen}>
        <Row isOpen={isOpen} onClick={() => this.setState({ isOpen: !isOpen })}>
          <Flex>
            <Icon>{icon}</Icon>
            {title && <Flex2>{title}</Flex2>}
            <Flex5>{description}</Flex5>
            <AlignRight>{detailText}</AlignRight>
          </Flex>
        </Row>

        <CardWrapper isOpen={isOpen}>{this.props.children}</CardWrapper>
      </Wrapper>
    );
  }
}
