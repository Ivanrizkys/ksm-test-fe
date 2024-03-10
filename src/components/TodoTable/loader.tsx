import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TodoTableLoaderProps {
  page: number;
}

const TodoTableLoader = ({ page }: TodoTableLoaderProps) => {
  return (
    <>
      <div className="rounded-md border mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>User Id</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Completed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
              <TableRow key={val}>
                <TableCell>
                  <div className="w-full max-w-3 h-5 rounded bg-muted-foreground animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="w-full max-w-3 h-5 rounded bg-muted-foreground animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="w-full md:w-96 max-w-96 h-5 rounded bg-muted-foreground animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="w-full max-w-24 h-5 rounded bg-muted-foreground animate-pulse"></div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex gap-1 items-center justify-end mt-2 text-muted-foreground ">
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Prev
        </button>
        <span className="font-medium">{page}</span>
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
          Next
          <ChevronRight className="mr-2 h-4 w-4" />
        </button>
      </div>
    </>
  );
};

export default TodoTableLoader;
