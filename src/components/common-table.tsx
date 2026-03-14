import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface Columns<T> {
  header: string;
  render: (item: T) => React.ReactNode;
}

interface CommonTableProps<T> {
  columns: Columns<T>[];
  data: T[];
}

export default function CommonTable<T>({ columns, data }: CommonTableProps<T>) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
            {columns.map((col, i) => (
              <TableHead
                key={i}
                className="font-semibold text-slate-900 px-6 py-4">
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map((item, rowIndex) => (
              <TableRow key={rowIndex} className="group transition-colors">
                {columns.map((col, colIndex) => (
                  <TableCell key={colIndex} className="px-6 py-4">
                    {col.render(item)}
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
  );
}
