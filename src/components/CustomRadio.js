// this custom small box for questions's option when use selects a option 
import React from 'react';
import { Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'transparent',
  },
  '& .MuiSvgIcon-root': {
    borderRadius: 0,
    width: 16,
    height: 16,
    border: '1px solid rgba(0, 0, 0, 0.54)',
    'input:hover ~ &': {
      borderColor: 'black',
    },
  },
  '&.Mui-checked .MuiSvgIcon-root': {
    borderRadius: 0,
    width: 16,
    height: 16,
    border: '1px solid rgba(0, 0, 0, 0.54)',
    backgroundColor: '#000',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'%3E%3Cpath fill=\'none\' d=\'M0 0h24v24H0z\'/%3E%3Cpath fill=\'white\' d=\'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 14H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2z\'/%3E%3C/svg%3E")',
      content: '""',
    },
  },
}));

const CustomRadio = (props) => {
  return (
    <CustomCheckbox
      checkedIcon={<CheckBoxIcon />}
      icon={<CheckBoxOutlineBlankIcon />}
      {...props}
    />
  );
};

export default CustomRadio;
