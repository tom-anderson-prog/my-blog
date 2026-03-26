import TableTooltip from "./table-tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export interface Columns<T> {
  header: string;
  render: (item: T) => React.ReactNode;
  width?: string; // column min width, px or %
}

interface CommonTableProps<T> {
  columns: Columns<T>[];
  data: T[];
  minWidth?: string; // table min width, px or %
}

export default function CommonTable<T extends { id: string | number }>({
  columns,
  data,
  minWidth = "800px",
}: CommonTableProps<T>) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="table-fixed" style={{ minWidth: minWidth }}>
          <TableHeader>
            <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
              {columns.map((col, i) => (
                <TableHead
                  key={i}
                  className="font-semibold text-slate-900 px-6 py-4"
                  style={{ width: col.width || "auto" }}>
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length > 0 ? (
              data.map((item) => (
                <TableRow key={item.id} className="group transition-colors">
                  {columns.map((col, colIndex) => (
                    <TableCell key={colIndex} className="px-6 py-4 truncate">
                      <TableTooltip>{col.render(item)}</TableTooltip>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-slate-400">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
