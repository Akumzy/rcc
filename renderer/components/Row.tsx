import { ChangeEvent, useMemo, useState } from "react";
import { X } from "react-feather";
import { ChangeProps, IRow } from "../interfaces";

type IProps = {
  onRemove: Function;
  onChange: (v: ChangeProps) => void;
  data: IRow;
  names: string[];
};
export default function Row(props: IProps) {
  const { onRemove, onChange, data, names } = props;
  const [name, setName] = useState("");
  function _onChange(ev: ChangeEvent<HTMLInputElement>) {
    ev.persist();
    let { name, value } = ev.target;
    if (name === "name") {
      setName(value);
    }
    onChange({ name, value, id: data.id });
  }
  const hasConflictName = useMemo(
    () => names.filter((n) => n === name).length > 1,
    [names, name],
  );
  return (
    <div className="flex">
      <div className="grid grid-cols-12 gap-x-1 flex-1">
        <div className="col-span-4">
          <input
            name="description"
            placeholder="Description"
            onChange={_onChange}
            value={data.description}
            className="w-full px-2 rounded-sm"
          />
        </div>
        <div className="col-span-1">
          <input
            title="Name must be unique"
            name="name"
            onChange={_onChange}
            value={data.name}
            className={`w-full px-2 rounded-sm ${
              hasConflictName ? "bg-red-300 border border-red-600" : ""
            }`}
            placeholder="Name"
          />
        </div>
        <div className="col-span-1 flex justify-center">=</div>
        <div className="col-span-3">
          <input
            name="expression"
            onChange={_onChange}
            value={data.expression}
            className="w-full px-2 rounded-sm"
            placeholder="Expression"
          />
        </div>
        <div className="col-span-2">
          <input
            name="value"
            onChange={_onChange}
            value={data.value}
            className="w-full px-2 rounded-sm"
            placeholder="Value"
          />
        </div>
        <div className="col-span-1">
          <input
            name="unit"
            onChange={_onChange}
            value={data.unit}
            className="w-full px-2 rounded-sm"
            placeholder="Unit"
          />
        </div>
      </div>
      <button onClick={() => onRemove(data.id)} className="w-8 flex justify-center">
        <X />
      </button>
    </div>
  );
}
