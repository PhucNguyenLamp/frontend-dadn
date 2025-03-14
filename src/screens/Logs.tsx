import { useState } from "react";
import { Pagination, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const rows = [
  {
    date: "10:11, 14/03/2025",
    device: "Light",
    id: "1",
    message: "Turn on light",
  },
  {
    date: "10:12, 14/03/2025",
    device: "Temperature",
    id: "2",
    message: "Temperature is 25°C",
  },
  {
    date: "10:13, 14/03/2025",
    device: "Humidity",
    id: "3",
    message: "Humidity is 50%",
  },
  {
    date: "10:14, 14/03/2025",
    device: "Light",
    id: "4",
    message: "Light is 1000 lux",
  },
  { date: "10:15, 14/03/2025", device: "LED", id: "5", message: "Turn on LED" },
  {
    date: "10:16, 14/03/2025",
    device: "Fan",
    id: "6",
    message: "Fan speed is 50%",
  },
  {
    date: "10:17, 14/03/2025",
    device: "LED Color",
    id: "7",
    message: "LED color is #ffffff",
  },
  {
    date: "10:18, 14/03/2025",
    device: "Light",
    id: "8",
    message: "Turn off light",
  },
  {
    date: "10:19, 14/03/2025",
    device: "Temperature",
    id: "9",
    message: "Temperature is 26°C",
  },
  {
    date: "10:20, 14/03/2025",
    device: "Humidity",
    id: "10",
    message: "Humidity is 70%",
  },
  {
    date: "10:21, 14/03/2025",
    device: "Light",
    id: "11",
    message: "Light is 100 lux",
  },
];
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "date", headerName: "Date", width: 200 },
  { field: "device", headerName: "Device", width: 200 },
  { field: "message", headerName: "Message", width: 300 },
];

export default function Logs() {
  const [logs, setLogs] = useState(rows);
  return (
    <Paper sx={{padding: 2}}>
      <DataGrid
        rows={logs}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
        sortModel={[{ field: "date", sort: "desc" }]}
      />
    </Paper>
  );
}
