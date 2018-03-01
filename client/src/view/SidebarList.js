import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  width: 100px;
`;

List.Item = styled.li`
  width: 120px;
  line-height: 24px;
  display: flex;
  user-select: none;
  padding: 4px;
  border-radius: 4px;
  background-color: ${props => (props.active ? '#E6E6E6' : 'none')};
`;

export default List;
