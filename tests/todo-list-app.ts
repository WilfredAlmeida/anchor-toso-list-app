import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { TodoListApp } from "../target/types/todo_list_app";
import { assert } from "chai";

describe("todo-list-app", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.TodoListApp as Program<TodoListApp>;

  const author = program.provider as anchor.Provider;

  it("can create a task", async () => {

    const task = anchor.web3.Keypair.generate();
    const tx = await program.methods
      .addingTask("First Task")
      .accounts({
        task: task.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([task])
      .rpc();

    console.log("Your transaction signature", tx);


    const taskAccount = await program.account.task.fetch(task.publicKey);
    console.log("Your Task", taskAccount);

    assert.equal(
      taskAccount.author.toBase58(),
      author.publicKey.toBase58()
    )


  })

});
