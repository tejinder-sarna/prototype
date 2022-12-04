import { Handle, Position } from "reactflow";

export default function NewNode() {
  return (
    <div
      style={{
        minHeight: 50,
        maxHeight: 200,
        minWidth: 200,
        maxWidth: 200,
        border: "2px dashed #9FA6B2",
        padding: 5,
        borderRadius: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
        fontSize: 24,
      }}
      className="btn btn-light text-muted"
      onClick={() => {}}
    >
      <Handle type="target" position={Position.Top} />+
    </div>
  );
}
