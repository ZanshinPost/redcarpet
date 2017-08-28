import styled, { keyframes } from 'styled-components'

const ellipsis = keyframes`
	to {
		width: 1.25em;
	}
`;

export default styled.div`
  font-size: 30px;

  &:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    animation: ${ellipsis} steps(4,end) 500ms infinite;
    content: '...';
    width: 0px;
  }
`
