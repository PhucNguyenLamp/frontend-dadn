import { useEffect, useState } from "react";
import { Paper, Skeleton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const types = {
  fan_device: "Fan",
  light_device_status: "Light Status",
  light_device_led: "Light LED",
};

const columns = [
  {
    field: "timestamp",
    headerName: "Time",
    width: 200,
    type: "dateTime",
  },
  { field: "device", headerName: "Device", width: 200 },
  { field: "message", headerName: "Message", width: 300 },
];

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getLogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/logs");
      const logs = response.data.map((log: any) => ({
        id: log._id,
        timestamp: new Date(log.timestamp),
        device: log.fanSpeed !== undefined ? types.fan_device : "Light",
        message:
          log.fanSpeed !== undefined
            ? `Fan Speed: ${log.fanSpeed}%`
            : `LEDColor: ${log.LEDColor ?? "Unknown"}`,
      }));
      setLogs(logs);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLogs();
  }, []);

  return (
    <Paper sx={{ padding: 2 }}>
      {loading ? (
        <Skeleton variant="rectangular" width="100%" height={400} />
      ) : (
        <DataGrid
          rows={logs}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 } },
            sorting: { sortModel: [{ field: "timestamp", sort: "desc" }] },
          }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      )}
    </Paper>
  );
}
