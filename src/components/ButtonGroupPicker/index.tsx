import React from "react";
import ButtonGroupPick from 'react-rainbow-components/components/ButtonGroupPicker';
import ButtonOption from 'react-rainbow-components/components/ButtonOption';

type PropsButtonGroupPicker = {
  title: string;
  disabled: boolean;
  itemPicked: string;
  pickList: { show: string, value: string }[];
  onPick: (pickItem: string) => void;
};

export default function ButtonGroupPicker({ title = "", disabled = false, itemPicked = "no_one", onPick, pickList = [] }: PropsButtonGroupPicker) {

  return <ButtonGroupPick
    label={<h1>{title}</h1>}
    value={itemPicked}
    onChange={(value) => {
      return onPick(value as string)
    }}
    name="filter"
    size="medium"
    bottomHelpText="Selecciona una opción"
  >
    {
      pickList.map((item, key) => (
        < ButtonOption disabled={disabled} key={key} label={item.show} name={item.value} />
      ))
    }
    {
      itemPicked === "no_one" && <ButtonOption disabled={disabled} label="Ninguno" name="no_one" />
    }
  </ButtonGroupPick>
}