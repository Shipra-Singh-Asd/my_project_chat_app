import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("allows user to enter name and join chat", async () => {
  render(<App />);  
  global.setImmediate = (fn, ...args) => setTimeout(fn, 0, ...args);


  const nameInput = screen.getByPlaceholderText(/Name/i);
  const roomInput = screen.getByPlaceholderText(/Room ID/i);
  const joinButton = screen.getByRole("button", { name: /Join the Room/i });

  fireEvent.change(nameInput, { target: { value: "John" } });  
  fireEvent.change(roomInput, { target: { value: "123" } });
  fireEvent.click(joinButton);

  expect(screen.queryByText(/Join A chat/i)).not.toBeInTheDocument();
});
