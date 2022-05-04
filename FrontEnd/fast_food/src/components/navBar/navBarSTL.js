import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
  
export const Nav = styled.nav`
  background: #125C13;;
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem calc((100vw - 1200px) / 2);
  z-index: 12;
`;
  
export const NavLink = styled(Link)`
  color: #FFF;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  font-weight: bold;

  &.active {
    background-color: #00000061;
    border-radius: 10px;
    height: 38px;
    color: #FFF;
  }

`;
  
export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;