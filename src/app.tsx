import { Button, Input } from "antd";
import * as React from "react";
import { useState } from "react";
import * as ReactDOM from "react-dom";
import JsonViewer from "searchable-react-json-view";

const { TextArea } = Input;
export const MainPage: React.FC = () => {
  const [inputField, setDataInput] = useState("");
  const [outputField, setDataOutput] = useState({});
  const [search, setSearch] = useState("");
  const [searchRun, setSearchRun] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDataInput(e.target.value);

  const handleGenTree = () => {
    try {
      const box = inputField;
      const sl1 = box[0] == `"` ? box.substring(1) : box;
      const sl2 =
        sl1[sl1.length - 1] == `"` ? sl1.substring(0, sl1.length - 1) : sl1;
      const sl21 = sl2.replaceAll(`\\"`, `"`);
      const sl22 = sl21.replaceAll(`\\"`, `"`);
      const sl3 = JSON.parse(sl22);
      setDataOutput(sl3);
    } catch (error) {
      setDataOutput({ error: error.toString() } || {});
    }
  };

  const handleCleanClick = () => {
    setDataInput("");
    setDataOutput({});
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "top",
        alignItems: "top",
        backgroundColor: "#F5FCFF",
      }}
    >
      <div style={{ flex: 2, margin: "5px", width: "100%" }}>
        <div>
          {" "}
          <h1 style={{ backgroundColor: "red", fontSize: "18px" }}>
            Stringified JSON
          </h1>{" "}
        </div>
        <TextArea value={inputField} rows={20} onChange={handleInput} />
      </div>
      <div style={{ flex: 0.3, marginTop: "150px" }}>
        <div style={{ marginBottom: "5px" }}>
          <Button onClick={handleGenTree} type="primary" size="middle">
            Generate
          </Button>
        </div>
        <div>
          <Button onClick={handleCleanClick} type="primary" size="middle">
            Clear
          </Button>
        </div>
      </div>
      <div style={{ flex: 5, margin: "5px" }}>
        <div>
          {" "}
          <h1 style={{ backgroundColor: "green", fontSize: "18px" }}>
            Fixed JSON
          </h1>{" "}
        </div>
        <label style={{ marginBottom: "5px" }}>Search: </label>
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button onClick={() => setSearchRun(search)}>Search</Button>
        <JsonViewer
          highlightSearch={(searchRun.length > 4 && searchRun) || ""}
          src={outputField}
          theme="google"
          iconStyle="square"
          indentWidth={4}
          collapsed={true}
          displayObjectSize={false}
          displayDataTypes={false}
        />
        ;
      </div>
    </div>
  );
};

function render() {
  ReactDOM.render(<MainPage />, document.body);
}

render();
