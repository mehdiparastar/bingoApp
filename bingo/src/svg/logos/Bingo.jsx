import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';

const Bingo = ({ width = 45, height = 70 }) => {
  const theme = useTheme();
  const colorPrimaryMain = theme.palette.primary.main;
  const colorPrimaryDark = theme.palette.primary.main;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 95 71"
    >
      <rect
        width="16.811"
        height="60.926"
        x="0"
        y="0"
        fill={colorPrimaryMain}
        stroke={colorPrimaryDark}
        rx="8.406"
        transform="rotate(0 .664 7.77)"
      />
      <rect
        width="16.811"
        height="68.926"
        x="10"
        y="0"
        fill={colorPrimaryMain}
        stroke={colorPrimaryDark}
        rx="8.406"
        transform="rotate(-25 .664 7.77)"
      />
      <rect
        width="16.811"
        height="68.926"
        x="26"
        y="-22"
        fill={colorPrimaryMain}
        stroke={colorPrimaryDark}
        rx="8.406"
        transform="rotate(25 .664 70.77)"
      />
      <rect
        width="16.811"
        height="68.926"
        x="70"
        y="0"
        fill={colorPrimaryMain}
        stroke={colorPrimaryDark}
        rx="8.406"
        transform="rotate(0 .664 7.77)"
      />
    </svg>
  );
};

Bingo.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Bingo;
