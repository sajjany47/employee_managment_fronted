import EditNoteIcon from "@mui/icons-material/EditNote";
import TableData from "../../../components/TableData";

// interface Column {
//   id: "name" | "code" | "population" | "size" | "action";
//   label: string;
//   minWidth?: number;
//   align?: "right";
//   format?: (value: number) => string;
// }

export default function ActivationKey() {
  const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
    {
      id: "population",
      label: "Population",
      minWidth: 170,
      align: "right",
    },
    {
      id: "size",
      label: "Size\u00a0(km\u00b2)",
      minWidth: 170,
      align: "right",
    },
    { id: "action", label: "Action", minWidth: 170, align: "right" },
  ];

  const rows = [
    { name: "India", code: "IN", population: "1324171354", size: "3287263" },
    { name: "Aus", code: "IN", population: "1324171354", size: "3287263" },
    { name: "India", code: "IN", population: "1324171354", size: "3287263" },
    { name: "India", code: "IN", population: "1324171354", size: "3287263" },
    { name: "India", code: "IN", population: "1324171354", size: "3287263" },
    { name: "India", code: "IN", population: "1324171354", size: "3287263" },
    { name: "India", code: "IN", population: "1324171354", size: "3287263" },
    { name: "India", code: "IN", population: "1324171354", size: "3287263" },
    { name: "India", code: "IN", population: "1324171354", size: "3287263" },
    { name: "India", code: "IN", population: "1324171354", size: "3287263" },
    { name: "India", code: "IN", population: "1324171354", size: "3287263" },
    { name: "India", code: "IN", population: "1324171354", size: "3287263" },
  ];
  const a = rows.map((item) => ({
    ...item,
    action: <EditNoteIcon onClick={() => handleCheck(item)} />,
  }));
  const handleCheck = (item: object) => {
    console.log(item);
  };

  return (
    <>
      <TableData columns={columns} rows={a} />
    </>
  );
}
