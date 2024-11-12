import styled from 'styled-components'

export const ContainerButton = styled.button`
  width: 100%;
  height: 52px;
  background: #9758a6;
  font-size: 30px;
  font-weight: 500;
  line-height: 19px;
  text-align: center;
  border: 0;
  color: #ffff ;
  border-radius: 5px;
  background-color: #9758a6;
  font-family: 'Road Rage', sans-serif;

  &:hover {
  background-color: #9758a6;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='white' stroke-width='3' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 5px;
  border-color: #ffffff;
  }

  &:active {
    opacity: 0.6;
  }
`