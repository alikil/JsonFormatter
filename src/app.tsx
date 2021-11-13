import { Button, Input } from "antd";
import * as React from "react";
import * as ReactDOM from "react-dom";
import ReactJson from "react-json-view";

const { TextArea } = Input;
export class FirstComponent extends React.Component<{}> {
  public declare state: {
    textbox1: string;
    textbox2: string;
  };

  constructor(props: any) {
    super(props);
    this.state = { textbox1: "", textbox2: "{}" };

    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
  }

  handleChange1(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ textbox1: event.target.value });
  }
  handleChange2(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ textbox2: event.target.value });
  }

  handleGenClick(event: any) {
    try {
      const box = this.state.textbox1;
      const sl1 = box[0] == `"` ? box.substring(1) : box;
      const sl2 =
        sl1[sl1.length - 1] == `"` ? sl1.substring(0, sl1.length - 1) : sl1;
      const sl21 = sl2.replaceAll(`\\"`, `"`);
      const sl22 = sl21.replaceAll(`\\\"`, `"`);
      const sl3 = JSON.parse(sl22);
      const sl4 = JSON.stringify(sl3);
      this.setState({ textbox2: sl4 });
    } catch (error) {
      this.setState({
        textbox2: JSON.stringify({ error: error.toString() }),
      });
    }
  }

  handleCleanClick(event: any) {
    this.setState({ textbox1: "", textbox2: "{}" });
    // <JSONPretty id="json-pretty" data={this.state.textbox2}></JSONPretty>
  }

  render() {
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
          <TextArea
            value={this.state.textbox1}
            rows={20}
            onChange={(e) => this.handleChange1(e)}
          />
        </div>
        <div style={{ flex: 0.3, marginTop: "150px" }}>
          <div style={{ marginBottom: "5px" }}>
            <Button
              onClick={(e) => this.handleGenClick(e)}
              type="primary"
              size="middle"
            >
              Generate
            </Button>
          </div>
          <div>
            <Button
              onClick={(e) => this.handleCleanClick(e)}
              type="primary"
              size="middle"
            >
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
          <ReactJson src={JSON.parse(this.state.textbox2)} />;
        </div>
      </div>
    );
  }
}

function render() {
  ReactDOM.render(<FirstComponent />, document.body);
}

render();
