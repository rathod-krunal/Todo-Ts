import "./style.css";

let TodoListContainer = document.getElementById("TodoList") as HTMLDivElement;
let inputBox = document.getElementById("inputBox") as HTMLInputElement;
let addBtn = document.getElementById("AddBtn") as HTMLButtonElement;

const storedTodos = localStorage.getItem("todos");
let Todos: Todo[] = storedTodos ? JSON.parse(storedTodos) : [];

function saveTodosToLocalStorage(): void {
  localStorage.setItem("todos", JSON.stringify(Todos));
}

type Todo = {
  id: number;
  title: string | number;
  isComplated: boolean;
};

function appendTodo(): void {
  if (inputBox.value !== "") {
    let TodosData: Todo = {
      id: Date.now(),
      title: inputBox.value,
      isComplated: false,
    };

    Todos.push(TodosData);
    inputBox.value = "";
    saveTodosToLocalStorage();
  } else {
    alert("Plsease add the field");
  }
}
addBtn.addEventListener("click", () => {
  appendTodo();
  showTodo();
});

function showTodo(): void {
  TodoListContainer.innerHTML = "";

  Todos.map((item) => {
    let TodosDiv = document.createElement("div") as HTMLDivElement;
    TodosDiv.className = "TodosDiv";

    let chkBox = document.createElement("input") as HTMLInputElement;
    chkBox.className = "chkBox";
    chkBox.type = "checkbox";
    chkBox.checked = item.isComplated;
    chkBox.addEventListener("change", () => {
      item.isComplated = chkBox.checked; 
      saveTodosToLocalStorage();
    });
   

    let span = document.createElement("span") as HTMLSpanElement;
    span.className = "span";
    span.innerText = item.title.toString();

    let removeBtn = document.createElement("button") as HTMLButtonElement;
    removeBtn.className = "dltButton";
    removeBtn.innerText = "Delete";
    removeBtn.addEventListener("click", () => {
      deleteTodo(item.id);
    });

    TodosDiv.append(chkBox, span, removeBtn);

    TodoListContainer.append(TodosDiv);
  });
}
showTodo();

function deleteTodo(id: number): void {
  Todos = Todos.filter((todo) => todo.id !== id);
  saveTodosToLocalStorage();
  showTodo();
}
