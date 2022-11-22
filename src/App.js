import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Accordion, Badge, Button, Container, Form } from "react-bootstrap";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import { Handle, Position } from "reactflow";

import "reactflow/dist/style.css";
import drawTree from "./helper";

const demo1 = {
  value: 1,
  id: 0,
  nickName: "Main Greeting",
  lines: [
    {
      value: 1,
      num: 1,
      id: 1,
      nickName: "Sales",
      lines: [
        {
          value: 2,
          num: 1,
          id: 2,
          nickName: "Level 1",
          user: "Jeremy",
          phone: "(215) 212-8543",
          lines: [],
        },
        {
          value: 2,
          num: 2,
          nickName: "Level 2",
          user: "Lauren",
          phone: "(205) 712-8241",
          lines: [],
          id: 3,
        },
      ],
    },
    {
      value: 1,
      num: 2,
      nickName: "Engineering",
      id: 4,
      lines: [
        {
          value: 1,
          num: 1,
          nickName: "Frontend",
          id: 5,
          lines: [
            {
              value: 2,
              num: 1,
              nickName: "React Native",
              user: "Tejinder",
              phone: "(215) 712-8503",
              lines: [],
              id: 6,
            },
            {
              value: 2,
              num: 2,
              nickName: "Tester",
              user: "Yevgen",
              phone: "(295) 775-8139",
              lines: [],
              id: 7,
            },
          ],
        },
        {
          value: 1,
          num: 2,
          nickName: "Backend",
          id: 8,
          lines: [
            {
              value: 2,
              num: 1,
              nickName: "Lead",
              user: "Manuk",
              phone: "(296) 775-8139",
              lines: [],
              id: 9,
            },
          ],
        },
      ],
    },
    {
      value: 1,
      num: 3,
      id: 10,
      nickName: "Customer Support",
      lines: [
        {
          value: 2,
          num: 1,
          nickName: "Lauren",
          user: "Lauren",
          phone: "(215) 711-8193",
          lines: [],
          id: 11,
        },
        {
          value: 2,
          num: 2,
          nickName: "Fatima",
          user: "Fatima",
          phone: "(215) 712-8013",
          lines: [],
          id: 12,
        },
      ],
    },
    {
      value: 3,
      num: 4,
      id: 13,
      nickName: "Other Teams Members",
      text: "Noviar, Miguel, Nik",
      lines: [],
    },
  ],
};

function CustomNode({ data }) {
  return (
    <div
      style={{
        minHeight: 50,
        maxHeight: 200,
        minWidth: 200,
        maxWidth: 200,
        border: "1px solid #eee",
        padding: 5,
        borderRadius: 5,
        background: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {data.num && (
        <>
          <Handle type="target" position={Position.Top} />
          <label
            htmlFor="text"
            className=" btn btn-primary"
            style={{
              position: "absolute",
              top: -16,
              fontSize: 12,
              padding: "4px 8px",
            }}
          >
            Press {data.num}
          </label>
        </>
      )}
      <div>
        <span style={{ fontSize: 12 }}>{data.label}</span>
      </div>
      {!data.last && <Handle type="source" position={Position.Bottom} id="a" />}
    </div>
  );
}

const types = [
  {
    text: "Option",
    value: 1,
  },
  {
    text: "Assign to Team Member",
    value: 2,
  },
  {
    text: "Bot Message",
    value: 3,
  },
];

const teamMembers = [
  {
    name: "Tejinder",
    phone: "(215) 712-8543",
  },
  {
    name: "Manuk",
    phone: "(295) 775-8198",
  },
  {
    name: "Michael",
    phone: "(295) 775-8137",
  },
  {
    name: "Yevgen",
    phone: "(295) 775-7139",
  },
];

const demo2 = {
  value: 1,
  num: 1,
  id: 0,
  nickName: "Main Greeting",
  lines: [
    {
      value: 1,
      id: 1,
      nickName: "Language 1",
      lines: [
        {
          value: 1,
          nickName: "Office 1",
          id: 2,

          lines: [
            {
              value: 2,
              id: 3,
              user: "Sales",
              nickName: "Sales",
              phone: "(295) 775-8039",
              num: 1,
              lines: [],
            },
            {
              value: 2,
              user: "Customer Support",
              nickName: "Support",
              phone: "(295) 885-8139",
              num: 2,
              lines: [],
              id: 4,
            },
            {
              value: 3,
              nickName: "Office Hours",
              text: "9:00 AM to 5:00 PM",
              num: 3,
              lines: [],
              id: 5,
            },
          ],
          num: 1,
        },
        {
          value: 1,
          nickName: "Office 2",
          id: 6,
          lines: [
            {
              value: 2,
              user: "Sales",
              nickName: "Sales",
              phone: "(295) 795-8139",
              num: 1,
              id: 7,
              lines: [],
            },
            {
              value: 2,
              user: "Customer Support",
              nickName: "Support",
              phone: "(295) 885-8139",
              num: 2,
              lines: [],
              id: 8,
            },
          ],
          num: 2,
        },
      ],
      num: 1,
    },
    {
      value: 1,
      nickName: "Language 2",
      id: 9,
      lines: [
        {
          value: 1,
          nickName: "Office 1",
          id: 10,
          lines: [
            {
              value: 2,
              user: "Sales",
              nickName: "Sales",
              phone: "(215) 775-8139",
              num: 1,
              id: 12,
              lines: [],
            },
            {
              value: 2,
              user: "Customer Support",
              nickName: "Support",
              phone: "(295) 885-8139",
              num: 2,
              id: 13,
              lines: [],
            },
            {
              value: 3,
              nickName: "Office Hours",
              text: "9:00 AM to 5:00 PM",
              num: 3,
              id: 14,
              lines: [],
            },
          ],
          num: 1,
        },
        {
          value: 1,
          nickName: "Office 2",
          id: 15,
          lines: [
            {
              value: 2,
              user: "Sales",
              nickName: "Sales",
              phone: "(295) 775-8138",
              num: 1,
              id: 16,
              lines: [],
            },
            {
              value: 2,
              user: "Customer Support",
              nickName: "Support",
              phone: "(295) 885-8139",
              num: 2,
              lines: [],
              id: 17,
            },
          ],
          num: 2,
        },
      ],
      num: 2,
    },
  ],
};

const demo3 = {
  value: 1,
  num: 1,
  id: 0,
  nickName: "Main Greeting",
  lines: [
    {
      value: 1,
      num: 1,
      id: 1,
      nickName: "Sales",
      lines: [
        {
          value: 2,
          num: 1,
          id: 2,
          nickName: "Level 1",
          user: "Jeremy",
          phone: "(215) 212-8543",
          lines: [],
        },
        {
          value: 2,
          num: 2,
          nickName: "Level 2",
          user: "Lauren",
          phone: "(205) 712-8241",
          lines: [],
          id: 3,
        },
      ],
    },
    {
      value: 1,
      num: 2,
      nickName: "Engineering",
      id: 4,
      lines: [
        {
          value: 1,
          num: 1,
          nickName: "Frontend",
          id: 5,
          lines: [
            {
              value: 2,
              num: 1,
              nickName: "React Native",
              user: "Tejinder",
              phone: "(215) 712-8503",
              lines: [],
              id: 6,
            },
            {
              value: 2,
              num: 2,
              nickName: "Tester",
              user: "Yevgen",
              phone: "(295) 775-8139",
              lines: [],
              id: 7,
            },
          ],
        },
        {
          value: 1,
          num: 2,
          nickName: "Backend",
          id: 8,
          lines: [
            {
              value: 2,
              num: 1,
              nickName: "Lead",
              user: "Manuk",
              phone: "(296) 775-8139",
              lines: [],
              id: 9,
            },
          ],
        },
      ],
    },
    {
      value: 1,
      num: 3,
      id: 10,
      nickName: "Customer Support",
      lines: [
        {
          value: 2,
          num: 1,
          nickName: "Lauren",
          user: "Lauren",
          phone: "(215) 711-8193",
          lines: [],
          id: 11,
        },
        {
          value: 2,
          num: 2,
          nickName: "Fatima",
          user: "Fatima",
          phone: "(215) 712-8013",
          lines: [],
          id: 12,
        },
      ],
    },
    {
      value: 3,
      num: 4,
      id: 13,
      nickName: "Other Teams Members",
      text: "Noviar, Miguel, Nik",
      lines: [],
    },
  ],
};

const demos = [demo1, demo2, demo3];

function Flow({ setActive, root }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [random, setRandom] = useState();
  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

  useEffect(() => {
    const data = drawTree(root);
    setNodes(data.nodes);
    console.log(data.edges);
    setEdges(data.edges);
  }, [setEdges, setNodes]);

  const onConnect = useCallback((params) => {}, []);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 500,
      }}
    >
      <div
        style={{
          width: 200,
          height: 50,
          position: "absolute",
          backgroundColor: "white",
          zIndex: 1000,
          right: 0,
          borderBottomLeftRadius: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="light"
          onClick={() => {
            setDarkMode((mode) => !mode);
          }}
          className="mx-2"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            setActive(false);
          }}
        >
          Close
        </Button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        // nodesDraggable={false}
        // nodesConnectable={false}
        // nodesFocusable={false}
        fitView
        style={{ background: darkMode ? "rgb(26,26,43)" : "#EAEAEA" }}
      >
        <Controls showInteractive={false} />
        <Background />
      </ReactFlow>
    </div>
  );
}

function App() {
  const [phoneTreeEnabled, setPhoneTreeEnabled] = useState(true);
  const [active, setActive] = useState(true);

  const [random, setRandom] = useState();
  const [phoneTreeLines, setPhoneTreeLines] = useState(demo1);
  const [activeDemo, setActiveDemo] = useState(0);
  const setDemo = (num) => {
    setActiveDemo(num);
    setPhoneTreeLines(demos[num]);
    setRandom(Math.random() * 10000);
  };

  const saveDemo = () => {
    navigator.clipboard.writeText(JSON.stringify(phoneTreeLines));
  };

  const reset = () => {
    setActiveDemo(null);
    setPhoneTreeLines([]);
  };

  useEffect(() => {}, []);

  const addLine = useCallback(
    async (props) => {
      let newLine = {
        value: JSON.parse(props.value),
        num: props.num,
        nickName: props.nickname,
      };
      switch (newLine.value) {
        case 2:
          newLine = {
            ...newLine,
            user: teamMembers[props.memberSelected].name,
            phone: teamMembers[props.memberSelected].phone,
          };
          break;
        case 3:
          newLine = {
            ...newLine,
            text: props.botMessage,
          };
          break;
        default:
          break;
      }

      if (props.parent === null)
        setPhoneTreeLines((lines) => [...lines, newLine]);
      else {
        let lines = phoneTreeLines;
        if (typeof props.parent === "number") {
          if (lines[props.parent].lines)
            lines[props.parent].lines.push(newLine);
          else lines[props.parent].lines = [{ ...newLine }];
          setPhoneTreeLines(lines);
        } else if (typeof props.parent === "object") {
          let addTo = lines[props.parent[0]].lines[props.parent[1]];
          if (addTo.lines) addTo.lines.push(newLine);
          else addTo.lines = [{ ...newLine }];
          lines[props.parent[0]].lines[props.parent[1]] = addTo;
          setPhoneTreeLines(lines);
        }
        setRandom(Math.random() * 10000);
      }
    },
    [phoneTreeLines]
  );

  return (
    <div className="App">
      {active && <Flow setActive={setActive} root={demos[activeDemo]} />}
      <Container className="span-2 p-3">
        <span className="h3">+12155932785</span>
        <hr />
        <span className="h4">Phone Tree</span>
        <span className="text-muted d-block my-2">
          Option - Announced in voice and implies that this contains more sub
          paths.
          <br /> Team member - assigned to team member (for users) Announced as
          the nickName of the path (like "Support")
          <br /> Bot Message - Used to give some information to the caller like
          Office Hours
        </span>
        <Container>
          {demos.map((x, i) => {
            return (
              <Button
                key={i}
                className="m-2"
                onClick={() => {
                  setDemo(i);
                }}
                variant={i === activeDemo ? "primary" : "light"}
              >
                Demo {i + 1}
              </Button>
            );
          })}
          <Button className="m-2" onClick={reset} variant="danger">
            Reset
          </Button>
          <Button
            className="mx-2"
            style={{ float: "right" }}
            onClick={() => {
              setActive(true);
            }}
            variant="info"
          >
            Visualize Phone Tree
          </Button>
          <Button
            className="mx-2"
            style={{ float: "right" }}
            onClick={saveDemo}
            variant="success"
          >
            Copy Demo details
          </Button>
        </Container>
        {false ? (
          renderPhoneTreeLines(phoneTreeLines, addLine)()
        ) : (
          <Button onClick={() => setPhoneTreeEnabled(true)}>
            Enable Phone Tree
          </Button>
        )}
      </Container>
    </div>
  );
}

const renderPhoneTreeLines =
  (lines, onCreate, parent = null, level = 1) =>
  () => {
    const lastNum = lines?.length > 0 ? lines[lines.length - 1].num + 1 : 1;

    return (
      <Container>
        <Accordion style={{ marginBottom: 10 }} alwaysOpen>
          {lastNum !== 0 &&
            lines?.map((line, index) => {
              return (
                <PhoneTreeLine
                  line={line}
                  key={index}
                  onCreate={onCreate}
                  index={index}
                  level={level + 1}
                  parent={parent}
                />
              );
            })}
        </Accordion>
        <Accordion
          style={{ marginBottom: 10 }}
          defaultActiveKey={lastNum}
          alwaysOpen
        >
          {level < 4 && lastNum < 10 ? (
            <NewPhoneTreeLine
              num={lastNum}
              onCreate={onCreate}
              parent={parent}
              level={level}
            />
          ) : (
            <span>You can't put more lines here</span>
          )}
        </Accordion>
      </Container>
    );
  };

const TypeSelector = ({
  value,
  onChange,
  editing = false,
  onCreate,
  level,
}) => {
  const optionRef = useRef();
  const filteredTypes = level < 3 ? types : types.slice(1);
  return (
    <div
      style={{
        marginLeft: 10,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Form.Select
        ref={optionRef}
        onInput={() => onChange(optionRef.current.value)()}
        value={value}
      >
        {filteredTypes.map((type, i) => (
          <option value={type.value} key={type.value}>
            {type.text}
          </option>
        ))}
      </Form.Select>
      <Button style={{ marginLeft: 10 }} onClick={onCreate}>
        {editing ? "Save" : "Create"}
      </Button>
    </div>
  );
};

const PhoneTreeLine = ({ line, onCreate, index, level, parent }) => {
  return (
    <Accordion.Item eventKey={`${line.num}`}>
      <Accordion.Header>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <span style={{ display: "flex", flex: 1, flexDirection: "row" }}>
            <Badge
              bg="dark"
              pill
              style={{
                width: 34,
                height: 34,
                fontSize: 20,
                padding: 0,
                paddingTop: 6,
              }}
            >
              <span>{line.num}</span>
            </Badge>
            {line.value === 1 && (
              <span
                className="mx-3 d-flex"
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Container style={{ width: 130, padding: 0 }}>
                  <Badge
                    bg="primary"
                    style={{
                      padding: " 10px",
                      fontSize: 16,
                      width: "90%",
                    }}
                  >
                    <span>OPTION</span>
                  </Badge>
                </Container>
                <span className="h5" style={{ margin: 0 }}>
                  {line.nickName}
                </span>
              </span>
            )}
            {line.value === 2 && (
              <span
                className="mx-3 d-flex"
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Container style={{ width: 130, padding: 0 }}>
                  <Badge
                    bg="primary"
                    style={{ padding: "10px ", fontSize: 16, width: "90%" }}
                  >
                    <span>{line.nickName}</span>
                  </Badge>
                </Container>
                <span className=" h5" style={{ margin: 0 }}>
                  {line.user}
                </span>
              </span>
            )}
            {line.value === 3 && (
              <span
                className="mx-3 d-flex"
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Container style={{ width: 130, padding: 0 }}>
                  <Badge bg="info" style={{ padding: "10px", fontSize: 16 }}>
                    <span>Bot Message</span>
                  </Badge>
                </Container>
                <span className="h5" style={{ margin: 0 }}>
                  {line.nickName}
                </span>
              </span>
            )}
          </span>
        </div>
      </Accordion.Header>
      <Accordion.Body>
        {line.value === 1 &&
          renderPhoneTreeLines(
            line.lines,
            onCreate,
            level < 3 ? index : [parent, index],
            level
          )()}
        {line.value === 2 && <span>{line.phone}</span>}
        {line.value === 3 && <span>{line.text}</span>}
      </Accordion.Body>
    </Accordion.Item>
  );
};

const NewPhoneTreeLine = ({ num, onCreate, parent = null, level }) => {
  const [optionSelected, setOptionSelected] = useState("1");
  const [memberSelected, setMemberSelected] = useState(0);
  const [botMessage, setBotMessage] = useState("");
  const [nickname, setNickname] = useState("");

  const reset = () => {
    setOptionSelected("1");
    setMemberSelected(0);
    setBotMessage("");
    setNickname("");
  };

  useEffect(() => {
    reset();
  }, [num, parent, level]);

  const fixedValue = useMemo(() => {
    return level === 3 ? JSON.parse(optionSelected) + 1 : optionSelected;
  }, [level, optionSelected]);

  return (
    <Accordion.Item eventKey={`${num}`}>
      <Accordion.Header className="new-accordian">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Badge
            bg="light"
            text="muted"
            style={{
              fontSize: 20,
            }}
          >
            <span>{num}</span>
            <span style={{ marginLeft: 10 }} className="h5 mx-3">
              Add New Tree Line
            </span>
          </Badge>
        </div>
      </Accordion.Header>
      <Accordion.Body>
        <div style={{ display: "flex", marginBottom: 10 }}>
          <TypeSelector
            value={optionSelected}
            onChange={(props) => () => setOptionSelected(props)}
            level={level}
            onCreate={() => {
              onCreate({
                value: fixedValue,
                memberSelected: fixedValue ? memberSelected : null,
                botMessage: fixedValue ? botMessage : null,
                nickname,
                parent,
                num,
              });
            }}
          />
          <Button
            variant="light"
            text="muted"
            style={{ marginLeft: 10 }}
            onClick={reset}
          >
            Cancel
          </Button>
        </div>
        <Container className="d-flex">
          {optionSelected === "1" && level < 3 && (
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nick Name</Form.Label>
                <Form.Control
                  type="nickname"
                  placeholder="Enter nickname"
                  value={nickname}
                  onInput={(e) => setNickname(e.target.value)}
                />
                <Form.Text className="text-muted">
                  This will help you identify what this tree route points to.
                </Form.Text>
              </Form.Group>
            </Form>
          )}
          {((level < 3 && optionSelected === "2") ||
            (level === 3 && optionSelected === "1")) && (
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nick Name</Form.Label>
                <Form.Control
                  type="nickname"
                  placeholder="Enter nickname"
                  value={nickname}
                  onInput={(e) => setNickname(e.target.value)}
                />

                <Form.Label>Assign To</Form.Label>
                <Form.Select
                  value={memberSelected}
                  onInput={(e) => {
                    setMemberSelected(e.target.value);
                  }}
                >
                  {teamMembers.map((member, i) => (
                    <option value={i} key={member.phone}>
                      {member.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          )}
          {optionSelected === "3" && (
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nick Name</Form.Label>
                <Form.Control
                  type="nickname"
                  placeholder="Enter nickname"
                  value={nickname}
                  onInput={(e) => setNickname(e.target.value)}
                />
                <Form.Label>Bot Message</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter text"
                  value={botMessage}
                  onInput={(e) => setBotMessage(e.target.value)}
                />
              </Form.Group>
            </Form>
          )}
        </Container>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default App;
