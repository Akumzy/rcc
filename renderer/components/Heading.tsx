import { ChangeEvent } from "react";
import { X } from "react-feather";
import { ChangeProps, IHeading } from "../interfaces";

type IProps = {
  onRemove: Function;
  onChange: (v: ChangeProps) => void;
  data: IHeading;
};
export default function Heading(props: IProps) {
  const { onRemove, onChange, data } = props;
  function _onChange(ev: ChangeEvent<HTMLInputElement>) {
    ev.persist();
    let { name, value } = ev.target;

    onChange({ name, value, id: data.id });
  }

  return (
    <div className="flex">
      <div className="mt-6 mb-4 w-full">
        <input
          name="description"
          placeholder="Description"
          onChange={_onChange}
          value={data.description}
          className="w-full px-2 rounded-sm text-lg"
        />
      </div>
      <button onClick={() => onRemove(data.id)} className="w-8 flex justify-center">
        <X />
      </button>
    </div>
  );
}
