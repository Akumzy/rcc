import { useEffect, useMemo, useState } from "react";
import Row from "../components/Row";
import { v4 } from "uuid";
import { ChangeProps, IHeading, IRow } from "../interfaces";
import { Parser } from "expr-eval";
import Layout from "../components/Layout";
import Heading from "../components/Heading";
import { Info } from "react-feather";
import Link from "next/link";

function newRow() {
  return {
    id: v4(),
    description: "",
    name: "",
    expression: "",
    value: "",
    unit: "",
    type: "row",
  };
}
function newHeading() {
  return {
    id: v4(),
    description: "",
    type: "heading",
  };
}

const IndexPage = () => {
  const [rows, setRows] = useState<(IRow | IHeading)[]>([newRow()]);
  const names = useMemo(() => {
    let v = rows.filter((v) => "name" in v) as IRow[];
    return v.map((v) => v.name);
  }, [rows]);

  function addRow() {
    setRows((r) => [...r, newRow()]);
  }
  function addHeading() {
    setRows((r) => [...r, newHeading()]);
  }
  function onChange(v: ChangeProps) {
    setRows((rows) =>
      rows.map((row) =>
        row.id === v.id ? { ...row, [v.name]: v.value } : row,
      ),
    );
  }
  function run() {
    let items = rows.filter((v) => "name" in v) as IRow[];
    let values = items.reduce((c, n) => ({ ...c, [n.name]: n.value }), {});
    for (const row of items) {
      if (row.expression) {
        let value = String(Parser.evaluate(row.expression, values));
        setRows((rows) =>
          rows.map((v) => (v.id === row.id ? { ...v, value } : v)),
        );
      }
    }
  }
  function onRemove(id: string) {
    setRows((r) => r.filter((ro) => ro.id !== id));
  }
  async function onSave() {
    // @ts-ignore
    window.ipcRenderer.send("save", JSON.stringify(rows));
  }
  async function onImport() {
    // @ts-ignore
    window.ipcRenderer.send("import", "import");
  }
  useEffect(() => {
    let data = localStorage.getItem("rows");
    if (data) {
      setRows(JSON.parse(data));
    }
    // @ts-ignore
    window.ipcRenderer.on("import", (_, d: string) => {
      setRows(JSON.parse(d));
    });
  }, []);
  useEffect(() => {
    localStorage.setItem("rows", JSON.stringify(rows));
  }, [rows]);
  return (
    <Layout>
      <div
        className="bg-gray-100 flex-1 flex flex-col"
        style={{ height: "calc(100% - 4rem)" }}
      >
        <div className="h-10 bg-blue-700 text-white px-4">
          <div className="grid grid-cols-12 col-gap-1 h-10 items-center">
            <div className="col-span-4">Description</div>
            <div className="col-span-1">Name</div>
            <div className="col-span-1 flex justify-center">=</div>
            <div className="col-span-3">Expression</div>
            <div className="col-span-2">Value</div>
            <div className="col-span-1">Unit</div>
          </div>
        </div>
        <div className="overflow-y-auto">
          <div className="overflow-y-auto py-4">
            <div className="space-y-2" id="main"></div>
          </div>
          <div className="px-4 space-y-2">
            {rows.map((row) =>
              "name" in row ? (
                <Row
                  names={names}
                  key={String(row.id)}
                  data={row}
                  onChange={onChange}
                  onRemove={onRemove}
                />
              ) : (
                <Heading
                  data={row}
                  key={String(row.id)}
                  onChange={onChange}
                  onRemove={onRemove}
                />
              ),
            )}
          </div>
          <div className="p-4 space-x-4">
            <button
              onClick={addRow}
              className="py-1 outline-none bg-white px-4 rounded-md shadow"
            >
              New Row
            </button>
            <button
              onClick={addHeading}
              className="py-1 outline-none bg-white px-4 rounded-md shadow"
            >
              New Heading
            </button>
          </div>
        </div>
      </div>
      <footer className="h-16 bg-gray-300 flex justify-between items-center px-4">
        <div className="space-x-4 flex items-center">
          <button
            onClick={onImport}
            className="py-1 outline-none bg-white px-4 rounded-md shadow"
          >
            Import
          </button>
          <button
            onClick={onSave}
            className="py-1 outline-none bg-white px-4 rounded-md shadow"
          >
            Save
          </button>
          <Link href="/help">
            <a className="py-1 outline-none bg-white px-4 rounded-md shadow inline-flex items-center">
              <Info size={18} className="mr-2" /> Info
            </a>
          </Link>
        </div>
        <button
          onClick={run}
          className="py-1 outline-none text-white bg-blue-700 px-4 rounded-md shadow"
        >
          Run
        </button>
      </footer>
    </Layout>
  );
};

export default IndexPage;
