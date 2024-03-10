import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Todo } from "@/types/todo";
import { Dispatch, SetStateAction } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TodoTableProps {
  todos: Todo[];
  page: number;
  skip: boolean;
  setPage: Dispatch<SetStateAction<number>>;
  setSkip: Dispatch<SetStateAction<boolean>>;
}

const TodoTable = ({ todos, page, skip, setSkip, setPage }: TodoTableProps) => {
  const handlePaginationPrev = () => {
    if (page > 1) {
      if (skip) setSkip(false);
      setPage(page - 1);
    }
  };

  const handlePaginationNext = () => {
    if (page < 200) {
      if (skip) setSkip(false);
      setPage(page + 1);
    }
  };

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
            {todos.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell>{todo.id}</TableCell>
                <TableCell>{todo.userId}</TableCell>
                <TableCell>{todo.title}</TableCell>
                <TableCell>
                  {todo.completed ? (
                    <p className="text-green-500">Completed</p>
                  ) : (
                    <p className="text-red-500">Not Completed</p>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex gap-1 items-center justify-end mt-2 text-muted-foreground ">
        <button
          onClick={handlePaginationPrev}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Prev
        </button>
        <span className="font-medium">{page}</span>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          onClick={handlePaginationNext}
        >
          Next
          <ChevronRight className="mr-2 h-4 w-4" />
        </button>
      </div>
    </>
  );
};

export default TodoTable;
