import { toast } from "sonner";
import { Todo } from "@/types/todo";
import { AxiosResponse } from "axios";
import { Inter } from "next/font/google";
import axiosInstance from "@/config/axios";
import TodoTable from "@/components/TodoTable";
import { getCurrentDateTime } from "@/lib/utils";
import DialogAddTodo from "@/components/DialogAddTodo";
import TodoTableLoader from "@/components/TodoTable/loader";
import { useAddTodoMutation, useGetTodoQuery } from "@/service/todo";
import { FormEventHandler, useCallback, useEffect, useState } from "react";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

interface HomeProps {
  data: Todo[];
}

export default function Home({ data }: HomeProps) {
  const [page, setPage] = useState<number>(1);
  const [skip, setSkip] = useState<boolean>(true);
  const [todos, setTodos] = useState<Todo[]>(data);
  const [dialogCreate, setDialogCreate] = useState<boolean>(false);

  const [addTodo] = useAddTodoMutation();
  const { data: dataFromClient, isFetching } = useGetTodoQuery(
    String(page - 1),
    {
      skip,
    },
  );

  // * update the todos when client todos when pagination page change
  useEffect(() => {
    if (dataFromClient) {
      setTodos(dataFromClient);
    }
  }, [dataFromClient]);

  // * handler function for add new todo
  const handleAddTodo = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const userIdValue = formData.get("userid");
      const titleValue = formData.get("title");
      const completedValue = formData.get("completed");
      try {
        addTodo({
          title: titleValue as string,
          userId: Number(userIdValue),
          completed: !!completedValue,
        });
        setDialogCreate(false);
        toast("Succesfully add new todo", {
          description: getCurrentDateTime(),
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
      } catch (err) {
        toast(
          <p className="text-destructive">
            Error when add new todo, please try again
          </p>,
          {
            description: getCurrentDateTime(),
            action: {
              label: "Close",
              onClick: () => {},
            },
          },
        );
      }
    },
    [addTodo],
  );

  return (
    <>
      <Head>
        <title>Todo List</title>
        <meta name="description" content="List todos from json typcode" />
      </Head>
      <main className={`min-h-screen px-6 md:px-12 py-8 ${inter.className}`}>
        <h1 className="text-foreground text-2xl font-bold">Welcome Admin!</h1>
        <p className="text-muted-foreground text-sm">
          This is your todo list that you can find and modified!
        </p>
        <section className="mt-8">
          <DialogAddTodo
            dialogCreate={dialogCreate}
            setDialogCreate={setDialogCreate}
            handleAddTodo={handleAddTodo}
          />
          {!isFetching ? (
            <TodoTable
              todos={todos}
              page={page}
              skip={skip}
              setPage={setPage}
              setSkip={setSkip}
            />
          ) : (
            <TodoTableLoader page={page} />
          )}
        </section>
      </main>
    </>
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
