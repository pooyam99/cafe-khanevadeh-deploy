import { styled, Select, MenuItem } from "@mui/material";
import { COLORS, FONTS } from '../styles/Theme';

const Input = styled('input')`
all: unset;
padding: 5px 10px;
text-align: right;
background-color: ${COLORS.darkGray};
border: 1px solid transparent;
border-radius: 10px;
font-family: ${FONTS.VZR};
color: ${COLORS.tertiary};
transition: all 100ms ease;

-moz-appearance: textfield;
::-webkit-outer-spin-button,
::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

:hover {
  border-color: ${COLORS.secondary};
}
:focus {
  box-shadow: 0 0 0 2px ${COLORS.secondary};
  background-color: ${COLORS.bg};
  color: white;
}
`;

const TextArea = styled('textarea')`
all: unset;
padding: 5px 10px;
height: 100%;
text-align: right;
background-color: ${COLORS.darkGray};
border: 1px solid transparent;
border-radius: 10px;
font-family: ${FONTS.VZR};
color: ${COLORS.tertiary};
white-space: break-spaces;
transition: all 100ms ease;

:hover {
  border-color: ${COLORS.secondary};
}
:focus {
  box-shadow: 0 0 0 2px ${COLORS.secondary};
  background-color: ${COLORS.bg};
  color: white;
}
`;

const ReserveSelect = styled(Select)`
direction: rtl;
display: flex;
height: 50px;
color: ${COLORS.secondary};
border-radius: 20px;
font-family: ${FONTS.VZM};

.MuiOutlinedInput-notchedOutline {
  border-color: ${COLORS.gray} !important;
}
.MuiSelect-icon {
  color: ${COLORS.secondary};
}
`
const SelectItem = styled(MenuItem)`
direction: rtl;
font-family: ${FONTS.VZR};
`

const ReserveInput = styled('input')`
all: unset;
direction: rtl;
display: flex;
height: 47px;
padding: 0 15px;
color: ${COLORS.secondary};
background-color: transparent;
border: 1px solid ${COLORS.gray};
border-radius: 20px;
font-family: ${FONTS.VZM};
-moz-appearance: textfield;
::-webkit-outer-spin-button,
::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
`

export { Input, TextArea, ReserveSelect, SelectItem, ReserveInput }