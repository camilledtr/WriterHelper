import styled from "@emotion/styled"
import { Colors } from "../../colors"

export const TextArea = styled.textarea`
  width: 80vw;
  resize: none;
  overflow-x: hidden;
  height: calc(70vh - 5rem);
  padding: 1rem;
  font-size: 1.2rem;
  font-family: 'Inter', 'system-ui', sans-serif;
  outline: none;
  border: none;
  border-radius: .8rem;
  background-color: ${Colors.MEDIUM};
  color: ${Colors.MEDIUM};
`

export const TextContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  gap: .6rem;
  line-height: 1;
  padding: 1rem;
  font-size: 1.2rem;
  width: 80vw;
  max-height: calc(70vh - 5rem);
  overflow-y: auto;
`

export const SuggestionsContainer = styled.div<{ x: number; y: number }>`
  position: absolute;
  top: 5rem;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  width: fit-content;
  padding: 1rem;
  background-color: ${Colors.LIGHT};
  border-radius: .8rem;
  box-shadow: 0 0 1rem ${Colors.MEDIUM};
  z-index: 1;
  max-height: 30vh;
  overflow-y: auto;
`

export const Suggestion = styled.div`
  padding: .5rem;
  cursor: pointer;
  transition: color .1s ease-in-out;
  &:hover {
    color: ${Colors.DARK};
  }
`