import styled from "styled-components";

const SelectStyles = styled.div`
  color: #40b29b;
  width: 100%;
  text-align: left;
  z-index: 1;
  .select-box {
    position: relative;
    display: block;
    width: 100%;
    margin: 0 auto;
    height: 40px;
    /* font-size: 18px;
    color: #60666d; */
  }
`;

const SelectContainer = styled.div`
  .current-selected:focus + .select-item-list {
    opacity: 1;
    animation-name: none;
  }
`;

const SelectedItem = styled.div`
  position: relative;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  height: 20px;
  padding: 5px 15px;
  p {
    margin: 0;
  }

  /* rotate arrow icon when in focus */
  &:focus .select-icon {
    transform: translateY(-50%) rotate(180deg);
  }

  .select-icon {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    width: 20px;
    opacity: 0.3;
    transition: 0.2s ease;
  }

  &:focus,
  &:focus,
  &[type]:focus {
    border-color: ${({ error }) => (error ? "#F5435F" : "#40b29b")};
    box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075) inset,
      0 0 8px ${({ error }) => (error ? "#F5435F" : "#40b29b")};
  }
`;

const SelectList = styled.ul`
  position: absolute;
  margin-top: 5px;
  width: 100%;
  padding: 0;
  list-style: none;
  opacity: 0;
  animation-name: HideList;
  animation-duration: 0.5s;
  animation-delay: 0.5s;
  animation-fill-mode: forwards;
  animation-timing-function: step-start;
  border: 1px solid "#d1d1d1";
  border-radius: 4px;

  @keyframes HideList {
    from {
      transform: scaleY(1);
    }
    to {
      transform: scaleY(0);
    }
  }
`;

const ListItem = styled.li`
  > label {
    cursor: pointer;
  }
  .option-item-label {
    display: block;
    padding: 8px 13px;
    background-color: #fff;
  }
  .option-item-label:hover,
  .option-item-label:focus {
    color: #546c84;
    background-color: #fbfbfb;
  }
`;

export { SelectStyles, SelectedItem, SelectList, ListItem, SelectContainer };
