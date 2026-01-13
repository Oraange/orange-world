import type { Todo } from "../types/todo";
import { supabase } from "../lib/supabaseClient";

export async function fetchTodos(): Promise<Todo[]> {
  try {
    const { data, error } = await supabase
      .from("todo")
      .select("*")
      .order("id", { ascending: false });
    if (error) {
      console.error("Supabase fetch error:", error);
      throw error;
    }
    return data as Todo[];
  } catch (error) {
    throw new Error("Failed to fetch todos");
  }
}

export async function createTodo(text: string): Promise<Todo> {
  try {
    const { data, error } = await supabase
      .from("todo")
      .insert([{ text, completed: false }])
      .select()
      .single();
    if (error) {
      throw error;
    }
    return data as Todo;
  } catch (error) {
    throw new Error("Failed to save todo");
  }
}

export async function clearTodos(id: number): Promise<void> {
  try {
    const { error } = await supabase.from("todo").delete().eq("id", id);
    if (error) {
      throw error;
    }
  } catch (error) {
    throw new Error("Failed to clear todo");
  }
}

export async function updateTodo(
  id: number,
  data: Partial<Pick<Todo, "text" | "completed">>
): Promise<void> {
  try {
    const { error } = await supabase.from("todo").update(data).eq("id", id);
    if (error) {
      throw error;
    }
  } catch (error) {
    throw new Error("Failed to update todo");
  }
}
