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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dispatch, FormEventHandler, SetStateAction } from "react";

interface DialogAddTodoProps {
  dialogCreate: boolean;
  setDialogCreate: Dispatch<SetStateAction<boolean>>;
  handleAddTodo: FormEventHandler<HTMLFormElement>;
}

const DialogAddTodo = ({
  dialogCreate,
  setDialogCreate,
  handleAddTodo,
}: DialogAddTodoProps) => {
  return (
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
            <Checkbox id="completed" name="completed" />
            <label htmlFor="completed" className="cursor-pointer select-none">
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
  );
};

export default DialogAddTodo;
