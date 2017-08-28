import styled, { css } from 'styled-components'
import { isFullHeight } from '../../utils'

export default styled.div`
  position: ${props => props.position !== 'inline' ? 'fixed' : 'relative'};
  height: ${props => isFullHeight(props.position) ? '100vh' : '500px'};
  width: ${props => isFullHeight(props.position) ? '360px' : '350px'};
  border-radius: ${props => isFullHeight(props.position) ? '0' : '8px'};
  box-shadow: 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07);
  box-sizing: border-box;

  ${props => props.position === 'right' && css`
		top: 0;
    bottom: 0;
    right: 0;
	`}

  ${props => props.position === 'left' && css`
		top: 0;
    bottom: 0;
    left: 0;
	`}

  ${props => props.position === 'bottomRight' && css`
    bottom: 1rem;
    right: 1rem;
	`}

  ${props => props.position === 'bottomLeft' && css`
    bottom: 1rem;
    left: 1rem;
	`}
`
