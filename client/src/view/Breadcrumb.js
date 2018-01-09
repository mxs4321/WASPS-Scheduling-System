import styled from 'styled-components';

const getBackgroundColor = ({ done, active }) => {
  if (done) return '#4BCA81';
  if (active) return '#0070D2';
  return '#e0e5ee';
};

const getFontColor = ({ done, active }) => {
  if (done || active) return 'white';
  return 'black';
};

const BreadCrumb = styled.div`
  list-style: none;
  display: flex;
  overflow: hidden;
  font: 12px Sans-Serif;
  border-radius: 18px;
`;

export const Crumb = styled.li`
  flex: 1;
  font-weight: bold;
  float: left;
  color: ${getFontColor};
  text-decoration: none;
  padding: 10px 0 10px 30px;
  background: ${getBackgroundColor};
  position: relative;
  display: block;
  text-align: center;

  ::after {
    content: ' ';
    display: block;
    width: 0;
    height: 0;
    border-top: 50px solid transparent; /* Go big on the size, and let overflow hide */
    border-bottom: 50px solid transparent;
    border-left: 30px solid ${getBackgroundColor};
    position: absolute;
    top: 50%;
    margin-top: -50px;
    left: 100%;
    z-index: 2;
  }
  ::before {
    content: ' ';
    display: block;
    width: 0;
    height: 0;
    border-top: 50px solid transparent;
    border-bottom: 50px solid transparent;
    border-left: 30px solid white;
    position: absolute;
    top: 50%;
    margin-top: -50px;
    margin-left: 1px;
    left: 100%;
    z-index: 1;
  }

  :last-child ::after {
    border: 0;
  }
`;

BreadCrumb.Crumb = Crumb;
export default BreadCrumb;
