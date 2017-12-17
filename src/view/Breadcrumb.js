import styled from 'styled-components';

export default styled.div`
  list-style: none;
  display: flex;
  overflow: hidden;
  font: 18px Sans-Serif;
  border-radius: 18px;
  height: 41px;
  > li {
    flex: 1;
    height: 100%;
    float: left;
    color: white;
    text-decoration: none;
    padding: 10px 0 10px 65px;
    background: #e0e5ee;
    position: relative;
    display: block;
  }
  > li a {
  }
  > li::after {
    content: ' ';
    display: block;
    width: 0;
    height: 0;
    border-top: 40px solid transparent; /* Go big on the size, and let overflow hide */
    border-bottom: 40px solid transparent;
    border-left: 30px solid #e0e5ee;
    position: absolute;
    top: 50%;
    margin-top: -50px;
    left: 100%;
    z-index: 2;
  }
  > li::before {
    content: ' ';
    display: block;
    width: 0;
    height: 0;
    border-top: 40px solid transparent;
    border-bottom: 40px solid transparent;
    border-left: 30px solid white;
    position: absolute;
    top: 50%;
    margin-top: -50px;
    margin-left: 1px;
    left: 100%;
    z-index: 1;
  }

  > li:nth-child(2) {
    background: #e0e5ee;
  }
  > li:nth-child(2):after {
    border-left-color: #e0e5ee;
  }
  > li:nth-child(3) {
    background: #e0e5ee;
  }
  > li:nth-child(3):after {
    border-left-color: #e0e5ee;
  }
  > li:nth-child(4) {
    background: #e0e5ee;
  }
  > li:nth-child(4) :after {
    border-left-color: #e0e5ee;
  }
  > li:nth-child(5) {
    background: #e0e5ee;
  }
  > li:nth-child(5) :after {
    border-left-color: #e0e5ee;
  }
  > li:last-child {
    background: #e0e5ee;
    color: black;
    pointer-events: none;
    cursor: default;
  }
  > li:last-child ::after {
    border: 0;
  }

  > li :hover {
    background: hsla(34, 85%, 25%, 1);
  }
  > li :hover:after {
    border-left-color: hsla(34, 85%, 25%, 1) !important;
  }
`;
