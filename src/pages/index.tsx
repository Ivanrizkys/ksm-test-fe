import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { FormEventHandler, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import axiosInstance from "@/config/axios";
import { AxiosResponse } from "axios";
import { Todo } from "@/types/todo";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { getCurrentDateTime } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

interface HomeProps {
  data: Todo[];
}

export default function Home({ data }: HomeProps) {
  const [page, setPage] = useState<number>(1);
  const [todos, setTodos] = useState<Todo[]>(data);
  const [dialogCreate, setDialogCreate] = useState<boolean>(false);

  console.log("datanya adalah", data);

  const handleAddTodo: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(e);
    setDialogCreate(false);
    toast("Succesfully add new todo", {
      description: getCurrentDateTime(),
      action: {
        label: "Close",
        onClick: () => {},
      },
    });
  };

  return (
    <main className={`min-h-screen px-6 md:px-12 py-8 ${inter.className}`}>
      <h1 className="text-foreground text-2xl font-bold">Welcome Admin!</h1>
      <p className="text-muted-foreground text-sm">
        This is your list todo that you can find and modified!
      </p>
      <section className="mt-8">
        <Dialog open={dialogCreate} onOpenChange={setDialogCreate}>
          <DialogTrigger asChild>
            <Button className="" variant="outline">
              Add Todo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Todo</DialogTitle>
              <DialogDescription>
                Insert a User Id, Title and competed todo for add new todo.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddTodo} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="userid">User Id</label>
                <Input id="userid" name="userid" type="number" required />
              </div>
              <div className="grid gap-2">
                <label htmlFor="title">Title</label>
                <Input id="title" name="title" required />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="completed" />
                <label
                  htmlFor="completed"
                  className="cursor-pointer select-none"
                >
                  This todo already completed
                </label>
              </div>
              <DialogFooter className="sm:justify-between mt-4">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Create</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* table here */}
        <div className="rounded-md border mt-4">
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead className="">Id</TableHead>
                <TableHead>User Id</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="">Completed</TableHead>
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

        {/* pagination here */}
        <div className="flex gap-1 items-center justify-end mt-2 text-muted-foreground ">
          <button
            // onClick={() => page > 1 && setPage(page - 1)}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Prev
          </button>
          <span className="font-medium">{page}</span>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            // onClick={() => totalPage && page < totalPage && setPage(page + 1)}
          >
            Next
            <ChevronRight className="mr-2 h-4 w-4" />
          </button>
        </div>
      </section>
    </main>
  );
}

export const getStaticProps = async () => {
  const res: AxiosResponse<Todo[]> = await axiosInstance.get(
    "/todos?_start=0&_limit=10",
  );

  return {
    props: {
      data: res.data,
    },
    revalidate: 10,
  };
};
